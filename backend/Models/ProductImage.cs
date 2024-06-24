using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ProductImages")]
public class ProductImage
{
    [Key]
    public Guid ImageId { get; set; }
    [Required] public Guid ProductId { get; set; }
    [Required] [StringLength(300)] public string ImageUrl { get; set; } = null!;
    public bool IsPrimary { get; set; } = false;

    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
    
    public static ProductImage Create(Guid? imageId , Guid productId, string imageUrl, bool isPrimary = false)
    {
        if (string.IsNullOrEmpty(imageUrl) || imageUrl.Length > 300)
        {
            throw new ArgumentException("ImageUrl is required and must be less than or equal to 300 characters.", nameof(imageUrl));
        }

        return new ProductImage
        {
            ImageId = imageId ?? Guid.NewGuid(),
            ProductId = productId,
            ImageUrl = imageUrl,
            IsPrimary = isPrimary
        };
    }
}