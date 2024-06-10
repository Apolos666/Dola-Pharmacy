using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("CartItems")]
public class CartItem
{
    public Guid CartId { get; set; }
    public Guid ProductId { get; set; }
    [Required] public int Quantity { get; set; }

    [ForeignKey(nameof(CartId))] public virtual Cart Cart { get; set; } = null!;
    [ForeignKey(nameof(ProductId))] public virtual Product Product { get; set; } = null!;
}