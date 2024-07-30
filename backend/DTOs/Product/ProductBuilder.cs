using backend.Models;

namespace backend.DTOs.Product;

public class ProductBuilder
{
    private string _productName = null!;
    private Guid _brandId;
    private Guid _statusId;
    private decimal _price;
    private string _description = null!;
    private string _buyingGuide = null!;
    private decimal _weight;

    public ProductBuilder WithProductName(string productName)
    {
        if (string.IsNullOrEmpty(productName) || productName.Length > 100)
        {
            throw new ArgumentException("ProductName is required and must be less than or equal to 100 characters.", nameof(productName));
        }

        _productName = productName;
        return this;
    }

    public ProductBuilder WithBrandId(Guid brandId)
    {
        _brandId = brandId;
        return this;
    }

    public ProductBuilder WithStatusId(Guid statusId)
    {
        _statusId = statusId;
        return this;
    }

    public ProductBuilder WithPrice(decimal price)
    {
        if (price < 0)
        {
            throw new ArgumentException("Price must be greater than or equal to 0.", nameof(price));
        }

        _price = price;
        return this;
    }

    public ProductBuilder WithDescription(string description)
    {
        if (string.IsNullOrEmpty(description) || description.Length > 1000)
        {
            throw new ArgumentException("Description is required and must be less than or equal to 1000 characters.", nameof(description));
        }

        _description = description;
        return this;
    }

    public ProductBuilder WithBuyingGuide(string buyingGuide)
    {
        if (string.IsNullOrEmpty(buyingGuide) || buyingGuide.Length > 1000)
        {
            throw new ArgumentException("BuyingGuide is required and must be less than or equal to 1000 characters.", nameof(buyingGuide));
        }

        _buyingGuide = buyingGuide;
        return this;
    }

    public ProductBuilder WithWeight(decimal weight)
    {
        _weight = weight;
        return this;
    }

    public Models.Product Build()
    {
        return new Models.Product
        {
            ProductId = Guid.NewGuid(),
            ProductName = _productName,
            BrandId = _brandId,
            StatusId = _statusId,
            Price = _price,
            Description = _description,
            BuyingGuide = _buyingGuide,
            Weight = _weight,
            ProductTargetGroups = new HashSet<ProductTargetGroup>(),
            ProductImages = new HashSet<Models.ProductImage>(),
            PromotionProducts = new HashSet<PromotionProduct>(),
            CartItems = new HashSet<Models.CartItem>(),
            OrderItems = new HashSet<OrderItem>(),
            ProductTypeAssociations = new HashSet<ProductTypeAssociation>()
        };
    }
}