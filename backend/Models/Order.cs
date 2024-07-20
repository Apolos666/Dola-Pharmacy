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
    
    [Key] public Guid OrderId { get; init; }
    [Required] public string UserId { get; init; } = null!;
    [Required] [StringLength(50)] [EmailAddress] public string Email { get; init; } = null!;
    [Required] [StringLength(50)] public string FullName { get; init; } = null!;
    [Required] [StringLength(50)] [Phone] public string PhoneNumber { get; init; } = null!;
    [Required] [StringLength(150)] public string Address { get; set; } = null!;
    [Required] [StringLength(50)] public string Province { get; set; } = null!;
    [Required] [StringLength(50)] public string District { get; set; } = null!;
    [Required] [StringLength(50)] public string Ward { get; set; } = null!;
    [StringLength(150)] public string? Note { get; init; }
    [Required] public Guid ShippingMethodId { get; init; }
    [Required] public Guid PaymentMethodId { get; init; }
    [Required] public Guid? CouponId { get; init; }
    [Required] public DateTime OrderDate { get; init; }
    [Required] public TimeSpan DeliveryTime { get; set; }
    
    [ForeignKey(nameof(UserId))] public virtual ApplicationIdentityUser User { get; init; } = null!;
    [ForeignKey(nameof(ShippingMethodId))] public virtual ShippingMethod ShippingMethod { get; init; } = null!;
    [ForeignKey(nameof(PaymentMethodId))] public virtual PaymentMethod PaymentMethod { get; init; } = null!;
    [ForeignKey(nameof(CouponId))] public virtual Coupon Coupon { get; init; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; init; }
    
    public static Order Create(string userId, string email, string fullName, string phoneNumber, string address, string province, string district, string ward, string note, Guid shippingMethodId, Guid paymentMethodId, Guid? couponId, DateTime orderDate, TimeSpan deliveryTime)
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

        if (string.IsNullOrEmpty(address) || address.Length > 150)
        {
            throw new ArgumentException("Address is required and must be less than or equal to 150 characters.", nameof(address));
        }

        if (string.IsNullOrEmpty(province) || province.Length > 50)
        {
            throw new ArgumentException("Province is required and must be less than or equal to 50 characters.", nameof(province));
        }

        if (string.IsNullOrEmpty(district) || district.Length > 50)
        {
            throw new ArgumentException("District is required and must be less than or equal to 50 characters.", nameof(district));
        }

        if (string.IsNullOrEmpty(ward) || ward.Length > 50)
        {
            throw new ArgumentException("Ward is required and must be less than or equal to 50 characters.", nameof(ward));
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
            Address = address,
            Province = province,
            District = district,
            Ward = ward,
            Note = note,
            ShippingMethodId = shippingMethodId,
            PaymentMethodId = paymentMethodId,
            CouponId = couponId,
            OrderDate = orderDate,
            DeliveryTime = deliveryTime,
            OrderItems = new HashSet<OrderItem>()
        };
    }
}