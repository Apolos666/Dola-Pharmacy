using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("OrderItems")]
public class OrderItem
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    [Required] public int Quantity { get; set; }

    [ForeignKey(nameof(OrderId))] public virtual Order Order { get; set; } = null!;
    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
}