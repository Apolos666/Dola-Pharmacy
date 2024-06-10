using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("PromotionProducts")]
public class PromotionProduct
{
    public Guid PromotionId { get; set; }
    public Guid ProductId { get; set; }
    [Required] public decimal DiscountPrice { get; set; }

    [ForeignKey(nameof(PromotionId))] public virtual Promotion Promotion { get; set; } = null!;
    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
}