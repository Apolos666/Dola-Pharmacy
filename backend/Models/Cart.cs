using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

[Table("Carts")]
public class Cart
{
    public Cart()
    {
        CartItems = new HashSet<CartItem>();
        Orders = new HashSet<Order>();
    }
    
    [Key] public Guid CartId { get; set; }
    [Required] public string UserId { get; set; }
    [Required] public DateTime DeliveryDate { get; set; }
    [Required] public TimeSpan DeliveryTime { get; set; }

    [ForeignKey(nameof(UserId))] public virtual IdentityUser User { get; set; } = null!;
    public virtual ICollection<CartItem> CartItems { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
    
    public static Cart Create(string userId, DateTime deliveryDate, TimeSpan deliveryTime)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }

        if (deliveryDate < DateTime.Now)
        {
            throw new ArgumentException("DeliveryDate must be in the future.", nameof(deliveryDate));
        }

        return new Cart
        {
            CartId = Guid.NewGuid(),
            UserId = userId,
            DeliveryDate = deliveryDate,
            DeliveryTime = deliveryTime,
            CartItems = new HashSet<CartItem>(),
            Orders = new HashSet<Order>()
        };
    }
}