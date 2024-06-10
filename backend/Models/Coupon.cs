using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Coupons")]
public class Coupon
{
    public Coupon()
    {
        Orders = new HashSet<Order>();
    }
    
    [Key] public Guid CouponId { get; set; }
    [Required] [StringLength(100)] public string Code { get; set; }
    [Required] public decimal Discount { get; set; }
    [Required] public DateTime ValidFrom { get; set; }
    [Required] public DateTime ValidTo { get; set; }
    [Required] public decimal MinPurchase { get; set; }
    [Required] public decimal MaxDiscount { get; set; }
    
    public virtual ICollection<Order> Orders { get; set; }
    
    public static Coupon Create(string code, decimal discount, DateTime validFrom, DateTime validTo, decimal minPurchase, decimal maxDiscount)
    {
        if (string.IsNullOrEmpty(code) || code.Length > 100)
        {
            throw new ArgumentException("Code is required and must be less than or equal to 100 characters.", nameof(code));
        }

        if (discount is < 0 or > 1)
        {
            throw new ArgumentException("Discount must be a decimal between 0 and 1.", nameof(discount));
        }

        if (validFrom > validTo)
        {
            throw new ArgumentException("ValidFrom must be earlier than ValidTo.", nameof(validFrom));
        }

        if (minPurchase < 0)
        {
            throw new ArgumentException("MinPurchase must be a positive decimal.", nameof(minPurchase));
        }

        if (maxDiscount < 0)
        {
            throw new ArgumentException("MaxDiscount must be a positive decimal.", nameof(maxDiscount));
        }

        return new Coupon
        {
            CouponId = Guid.NewGuid(),
            Code = code,
            Discount = discount,
            ValidFrom = validFrom,
            ValidTo = validTo,
            MinPurchase = minPurchase,
            MaxDiscount = maxDiscount,
            Orders = new HashSet<Order>()
        };
    }
}