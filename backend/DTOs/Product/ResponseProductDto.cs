using backend.Models;

namespace backend.DTOs.Product;

public class ResponseProductDto
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public Guid BrandId { get; set; }
    public Guid StatusId { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; } = null!;
    public string BuyingGuide { get; set; } = null!;
    public decimal Weight { get; set; }
    public virtual ICollection<ProductTargetGroup> ProductTargetGroups { get; set; } = new List<ProductTargetGroup>();
    public virtual ICollection<Models.ProductImage> ProductImages { get; set; } = new List<Models.ProductImage>();
    public virtual ICollection<ProductTypeAssociation> ProductTypeAssociations { get; set; } =
        new List<ProductTypeAssociation>();
}