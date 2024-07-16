using backend.DTOs.Stripe;
using backend.Repositories.Product;
using Stripe;

namespace backend.Services.Stripe;

public class StripeService(IProductRepository productRepository) : IStripeService
{
    private readonly IProductRepository _productRepository = productRepository;

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

    public async Task<StripeSearchResult<global::Stripe.Product>> GetProductAsync(GetProductStripeDto getProductStripeDto)
    {
        var options = new ProductSearchOptions
        {
            Query = $"active:'{getProductStripeDto.Active}' AND metadata['ID']:'{getProductStripeDto.ProductId}'",
        };
        
        var service = new ProductService();
        var products = await service.SearchAsync(options);
        return products;
    }
}