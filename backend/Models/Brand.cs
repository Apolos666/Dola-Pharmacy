using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Brands")]
public class Brand
{
    public Brand()
    {
        Products = new HashSet<Product>();
    }

    [Key] public Guid BrandId { get; set; }
    [Required][StringLength(50)] public string BrandName { get; set; }
    public virtual ICollection<Product> Products { get; set; }

    public static Brand Create(string brandName)
    {
        if (string.IsNullOrEmpty(brandName) || brandName.Length > 50)
        {
            throw new ArgumentException("BrandName is required and must be less than or equal to 50 characters.", nameof(brandName));
        }

        return new Brand
        {
            BrandId = Guid.NewGuid(),
            BrandName = brandName,
            Products = new HashSet<Product>()
        };
    }
}