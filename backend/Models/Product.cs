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
    }

    [Key] public Guid ProductId { get; set; }
    [Required] [StringLength(100)] public string ProductName { get; set; } = null!;
    [Required] public Guid BrandId { get; set; }
    [Required] public Guid StatusId { get; set; }
    [Required] public Guid TypeId { get; set; }
    [Required] [StringLength(1000)] public string Description { get; set; } = null!;
    [Required] [StringLength(1000)] public string BuyingGuide { get; set; } = null!;
    [Required] public decimal Weight { get; set; }

    [ForeignKey(nameof(BrandId))] public virtual Brand Brand { get; set; } = null!;
    [ForeignKey(nameof(StatusId))] public virtual Status Status { get; set; } = null!;
    [ForeignKey(nameof(TypeId))] public virtual ProductType ProductType { get; set; } = null!;
    public virtual ICollection<ProductTargetGroup> ProductTargetGroups { get; set; }
    public virtual ICollection<ProductImage> ProductImages { get; set; }
    public virtual ICollection<PromotionProduct> PromotionProducts { get; set; }
    public virtual ICollection<CartItem> CartItems { get; set; }
    public virtual ICollection<OrderItem> OrderItems { get; set; }
    
    public static Product Create(string productName, Guid brandId, Guid statusId, Guid typeId, string description, string buyingGuide, decimal weight)
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

        return new Product
        {
            ProductId = Guid.NewGuid(),
            ProductName = productName,
            BrandId = brandId,
            StatusId = statusId,
            TypeId = typeId,
            Description = description,
            BuyingGuide = buyingGuide,
            Weight = weight,
            ProductTargetGroups = new HashSet<ProductTargetGroup>(),
            ProductImages = new HashSet<ProductImage>(),
            PromotionProducts = new HashSet<PromotionProduct>(),
            CartItems = new HashSet<CartItem>(),
            OrderItems = new HashSet<OrderItem>()
        };
    }
}