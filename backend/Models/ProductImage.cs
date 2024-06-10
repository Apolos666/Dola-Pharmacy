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

    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
    
    public static ProductImage Create(Guid productId, string imageUrl)
    {
        if (string.IsNullOrEmpty(imageUrl) || imageUrl.Length > 300)
        {
            throw new ArgumentException("ImageUrl is required and must be less than or equal to 300 characters.", nameof(imageUrl));
        }

        return new ProductImage
        {
            ImageId = Guid.NewGuid(),
            ProductId = productId,
            ImageUrl = imageUrl
        };
    }
}