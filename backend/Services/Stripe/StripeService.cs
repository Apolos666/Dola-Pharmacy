using System.Globalization;
using backend.DTOs.Order;
using backend.DTOs.Stripe;
using backend.Models;
using backend.Repositories.Order;
using backend.Repositories.OrderItem;
using backend.Repositories.Product;
using backend.Services.Cart;
using backend.Services.ShippingMethod;
using backend.UnitOfWork;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;

namespace backend.Services.Stripe;

public class StripeService(
    IProductRepository productRepository,
    ShippingMethodService shippingMethodService,
    CartUserService cartUserService,
    IOrderRepository orderRepository,
    IUnitOfWork unitOfWork,
    IOrderItemRepository orderItemRepository) : IStripeService
{
    private readonly IProductRepository _productRepository = productRepository;
    private readonly ShippingMethodService _shippingMethodService = shippingMethodService;
    private readonly CartUserService _cartUserService = cartUserService;
    private readonly IOrderRepository _orderRepository = orderRepository;
    private readonly IOrderItemRepository _orderItemRepository = orderItemRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private const string SuccessUrl = "http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}";
    private const string CancelUrl = "http://localhost:5173/checkout/cancel";
    
    private const string MetaDataUserId = "UserId";
    private const string MetaDataEmail = "Email";
    private const string MetaDataFullName = "FullName";
    private const string MetaDataPhoneNumber = "PhoneNumber";
    private const string MetaDataAddress = "Address";
    private const string MetaDataProvince = "Province";
    private const string MetaDataDistrict = "District";
    private const string MetaDataWard = "Ward";
    private const string MetaDataNote = "Note";
    private const string MetaDataShippingMethodId = "ShippingMethodId";
    private const string MetaDataPaymentMethodId = "PaymentMethodId";
    private const string MetaDataCouponId = "CouponId";
    private const string MetaDataOrderDate = "OrderDate";
    private const string MetaDataDeliveryTime = "DeliveryTime";
    private const string OrderItems = "OrderItems";

    public async Task UploadProductsToStripe()
    {
        var products = await _productRepository.GetAllProductsWithImages();

        foreach (var product in products)
        {
            await CreateProductAsync(new CreateProductStripeDto
                (
                    ProductId: product.ProductId,
                    Name: product.ProductName,
                    Description: product.Description,
                    Images: product.ProductImages.Select(pi => pi.ImageUrl).ToList(),
                    Price: product.Price
                )
            );
        }
    }

    public async Task<global::Stripe.Product> CreateProductAsync(CreateProductStripeDto createProductStripeDto)
    {
        var options = new ProductCreateOptions
        {
            Name = createProductStripeDto.Name,
            Description = createProductStripeDto.Description,
            Images = createProductStripeDto.Images,
            DefaultPriceData = new ProductDefaultPriceDataOptions
            {
                UnitAmount = (long)createProductStripeDto.Price,
                Currency = "VND"
            },
            Metadata = new Dictionary<string, string>
            {
                { "ID", createProductStripeDto.ProductId.ToString() }
            },
            Expand = new()
            {
                "default_price"
            }
        };

        var service = new ProductService();
        return await service.CreateAsync(options);
    }

    public async Task<StripeSearchResult<global::Stripe.Product>> GetProductAsync(
        GetProductStripeDto getProductStripeDto)
    {
        var options = new ProductSearchOptions
        {
            Query = $"active:'{getProductStripeDto.Active}' AND metadata['ID']:'{getProductStripeDto.ProductId}'",
        };

        var service = new ProductService();
        var products = await service.SearchAsync(options);
        return products;
    }

    public async Task<string> CreateSessionAsync(AddOrderDto addOrderDto, string userId)
    {
        var shippingMethod = await _shippingMethodService.GetShippingMethodByIdAsync(addOrderDto.ShippingMethodId);

        if (shippingMethod is null)
            throw new Exception("Shipping method not found.");

        var userCart = await _cartUserService.GetCartByUserId(userId);

        if (userCart is null)
            throw new Exception("Cart not found.");

        var products = new List<StripeProduct>();

        foreach (var cartItemDto in addOrderDto.CartItemsDto)
        {
            var result = await GetProductAsync(new GetProductStripeDto(cartItemDto.ProductId));
            products.Add(new StripeProduct(result.Data[0].DefaultPriceId, cartItemDto.Quantity));
        }

        var options = new SessionCreateOptions
        {
            SuccessUrl = SuccessUrl,
            CancelUrl = CancelUrl,
            LineItems = products.Select(product => new SessionLineItemOptions
            {
                Price = product.PriceId,
                Quantity = product.Quantity
            }).ToList(),
            Metadata = new Dictionary<string, string>
            {
                { MetaDataUserId, userId },
                { MetaDataEmail, addOrderDto.Email },
                { MetaDataFullName, addOrderDto.FullName },
                { MetaDataPhoneNumber, addOrderDto.PhoneNumber },
                { MetaDataAddress, addOrderDto.Address },
                { MetaDataProvince, addOrderDto.Province },
                { MetaDataDistrict, addOrderDto.District },
                { MetaDataWard, addOrderDto.Ward },
                { MetaDataNote, addOrderDto.Note ?? "" },
                { MetaDataShippingMethodId, addOrderDto.ShippingMethodId.ToString() },
                { MetaDataPaymentMethodId, addOrderDto.PaymentMethodId.ToString() },
                { MetaDataCouponId, addOrderDto.CouponId.ToString() ?? "" },
                { MetaDataOrderDate, userCart.DeliveryDate.ToUniversalTime().ToString(CultureInfo.InvariantCulture)},
                { MetaDataDeliveryTime, userCart.DeliveryTime.ToString() },
                { OrderItems, JsonConvert.SerializeObject(addOrderDto.CartItemsDto)}
            },
            Mode = "payment"
        };

        options.LineItems.Add(new SessionLineItemOptions
        {
            PriceData = new SessionLineItemPriceDataOptions
            {
                Currency = "VND",
                UnitAmount = (long?)shippingMethod?.ShippingCost,
                ProductData = new()
                {
                    Name = "Shipping Fee",
                    Description = "Shipping Fee",
                }
            },
            Quantity = 1
        });

        var service = new SessionService();
        var session = await service.CreateAsync(options);
        return session.Id;
    }

    public async Task FullfilCheckout(Dictionary<string, string> metaData)
    {
        await _unitOfWork.BeginTransactionAsync();

        try
        {
            // First we create the order
            var order = new OrderBuilder()
                .SetUserId(metaData[MetaDataUserId])
                .SetEmail(metaData[MetaDataEmail])
                .SetFullName(metaData[MetaDataFullName])
                .SetPhoneNumber(metaData[MetaDataPhoneNumber])
                .SetAddress(metaData[MetaDataAddress])
                .SetProvince(metaData[MetaDataProvince])
                .SetDistrict(metaData[MetaDataDistrict])
                .SetWard(metaData[MetaDataWard])
                .SetNote(metaData[MetaDataNote])
                .SetShippingMethodId(metaData[MetaDataShippingMethodId])
                .SetPaymentMethodId(metaData[MetaDataPaymentMethodId])
                .SetCouponId(metaData[MetaDataCouponId])
                .SetOrderDate(metaData[MetaDataOrderDate])
                .SetDeliveryTime(metaData[MetaDataDeliveryTime])
                .Build();
            
            _orderRepository.Add(order);
            await _unitOfWork.CommitAsync();
            
            // Second we create the order items for the order
            var orderItems = JsonConvert.DeserializeObject<List<CartItemDto>>(metaData[OrderItems])?.Select(ci => new OrderItem
            {
                OrderId = order.OrderId,
                ProductId = ci.ProductId,
                Quantity = ci.Quantity
            }).ToList();
            
            if (orderItems is null)
                throw new Exception("Order items not found.");
            
            _orderItemRepository.AddRange(orderItems);
            await _unitOfWork.CommitAsync();
            
            // Third we remove the cart of the user
            await _cartUserService.RemoveCartUser(metaData[MetaDataUserId]);
            
            await _unitOfWork.CommitTransactionAsync();
        } catch (Exception exception)
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw new Exception("Fullfil checkout failed" + exception.Message, exception);
        }
    }
}