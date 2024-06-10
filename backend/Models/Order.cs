using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

[Table("Orders")]
public class Order
{
    public Order()
    {
        OrderItems = new HashSet<OrderItem>();
    }
    
    [Key] public Guid OrderId { get; set; }
    [Required] public string UserId { get; set; } = null!;
    [Required] [StringLength(50)] [EmailAddress] public string Email { get; set; } = null!;
    [Required] [StringLength(50)] public string FullName { get; set; } = null!;
    [Required] [StringLength(50)] [Phone] public string PhoneNumber { get; set; } = null!;
    [Required] public Guid CartId { get; set; }
    [Required] public Guid AddressId { get; set; }
    [Required] [StringLength(150)] public string Note { get; set; } = null!;
    [Required] public Guid ShippingMethodId { get; set; }
    [Required] public Guid PaymentMethodId { get; set; }
    [Required] public Guid? CouponId { get; set; }
    [Required] public DateTime OrderDate { get; set; }
    
    [ForeignKey(nameof(UserId))] public virtual IdentityUser User { get; set; } = null!;
    [ForeignKey(nameof(AddressId))] public virtual Address Address { get; set; } = null!;
    [ForeignKey(nameof(ShippingMethodId))] public virtual ShippingMethod ShippingMethod { get; set; } = null!;
    [ForeignKey(nameof(PaymentMethodId))] public virtual PaymentMethod PaymentMethod { get; set; } = null!;
    [ForeignKey(nameof(CouponId))] public virtual Coupon Coupon { get; set; } = null!;
    [ForeignKey(nameof(CartId))] public virtual Cart Cart { get; set; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; set; }
    
    public static Order Create(string userId, string email, string fullName, string phoneNumber, Guid cartId, Guid addressId, string note, Guid shippingMethodId, Guid paymentMethodId, Guid? couponId, DateTime orderDate)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }

        if (string.IsNullOrEmpty(email) || !new EmailAddressAttribute().IsValid(email))
        {
            throw new ArgumentException("Valid Email is required.", nameof(email));
        }

        if (string.IsNullOrEmpty(fullName) || fullName.Length > 50)
        {
            throw new ArgumentException("FullName is required and must be less than or equal to 50 characters.", nameof(fullName));
        }

        if (string.IsNullOrEmpty(phoneNumber) || !new PhoneAttribute().IsValid(phoneNumber))
        {
            throw new ArgumentException("Valid PhoneNumber is required.", nameof(phoneNumber));
        }

        if (string.IsNullOrEmpty(note) || note.Length > 150)
        {
            throw new ArgumentException("Note is required and must be less than or equal to 150 characters.", nameof(note));
        }

        return new Order
        {
            OrderId = Guid.NewGuid(),
            UserId = userId,
            Email = email,
            FullName = fullName,
            PhoneNumber = phoneNumber,
            CartId = cartId,
            AddressId = addressId,
            Note = note,
            ShippingMethodId = shippingMethodId,
            PaymentMethodId = paymentMethodId,
            CouponId = couponId,
            OrderDate = orderDate,
            OrderItems = new HashSet<OrderItem>()
        };
    }
}