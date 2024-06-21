using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class ProductTypeAssociation
{   
    [ForeignKey("Product")]
    public Guid ProductId { get; init; }
    public virtual Product Product { get; set; } = null!;
    
    [ForeignKey("ProductType")]
    public Guid TypeId { get; set; }
    public virtual ProductType ProductType { get; set; } = null!;
}