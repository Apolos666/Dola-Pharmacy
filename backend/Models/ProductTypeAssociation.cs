using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ProductTypeAssociations")]
public class ProductTypeAssociation
{
    [Required] public Guid ProductId { get; init; }
    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;

    [Required] public Guid TypeId { get; set; }
    [ForeignKey(nameof(TypeId))] public virtual ProductType ProductType { get; set; } = null!;
}