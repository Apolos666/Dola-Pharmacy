using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ProductTargetGroups")]
public class ProductTargetGroup
{
    public Guid ProductId { get; set; }
    public Guid GroupId { get; set; }

    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
    [ForeignKey(nameof(GroupId))] public virtual TargetGroup TargetGroup { get; set; } = null!;
}