using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Products")]
public class Product
{
    public Product()
    {
        ProductTargetGroups = new HashSet<ProductTargetGroup>();
        ProductImages = new HashSet<ProductImage>();
        PromotionProducts = new HashSet<PromotionProduct>();
        CartItems = new HashSet<CartItem>();
        OrderItems = new HashSet<OrderItem>();
        ProductTypeAssociations = new HashSet<ProductTypeAssociation>();
    }

    [Key] public Guid ProductId { get; set; }
    [Required] [StringLength(100)] public string ProductName { get; set; } = null!;
    [Required] public Guid BrandId { get; set; }
    [Required] public Guid StatusId { get; set; }
    [Required] public decimal Price { get; set; }
    [Required] [StringLength(1000)] public string Description { get; set; } = null!;
    [Required] [StringLength(1000)] public string BuyingGuide { get; set; } = null!;
    [Required] public decimal Weight { get; set; }

    [ForeignKey(nameof(BrandId))] public virtual Brand Brand { get; set; } = null!;
    [ForeignKey(nameof(StatusId))] public virtual Status Status { get; set; } = null!;
    public virtual ICollection<ProductTargetGroup> ProductTargetGroups { get; set; }
    public virtual ICollection<ProductImage> ProductImages { get; set; }
    public virtual ICollection<PromotionProduct> PromotionProducts { get; set; }
    public virtual ICollection<CartItem> CartItems { get; set; }
    public virtual ICollection<OrderItem> OrderItems { get; set; }
    public virtual ICollection<ProductTypeAssociation> ProductTypeAssociations { get; set; }
    
    public static Product Create(string productName, Guid brandId, Guid statusId, decimal price ,string description, string buyingGuide, decimal weight)
    {
        if (string.IsNullOrEmpty(productName) || productName.Length > 100)
        {
            throw new ArgumentException("ProductName is required and must be less than or equal to 100 characters.", nameof(productName));
        }

        if (string.IsNullOrEmpty(description) || description.Length > 1000)
        {
            throw new ArgumentException("Description is required and must be less than or equal to 1000 characters.", nameof(description));
        }

        if (string.IsNullOrEmpty(buyingGuide) || buyingGuide.Length > 1000)
        {
            throw new ArgumentException("BuyingGuide is required and must be less than or equal to 1000 characters.", nameof(buyingGuide));
        }
        
        if (price < 0)
        {
            throw new ArgumentException("Price must be greater than or equal to 0.", nameof(price));
        }

        return new Product
        {
            ProductId = Guid.NewGuid(),
            ProductName = productName,
            BrandId = brandId,
            StatusId = statusId,
            Price = price,
            Description = description,
            BuyingGuide = buyingGuide,
            Weight = weight,
            ProductTargetGroups = new HashSet<ProductTargetGroup>(),
            ProductImages = new HashSet<ProductImage>(),
            PromotionProducts = new HashSet<PromotionProduct>(),
            CartItems = new HashSet<CartItem>(),
            OrderItems = new HashSet<OrderItem>(),
            ProductTypeAssociations = new HashSet<ProductTypeAssociation>()
        };
    }
}