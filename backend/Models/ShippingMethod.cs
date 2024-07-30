using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ShippingMethods")]
public class ShippingMethod
{
    public ShippingMethod()
    {
        Orders = new HashSet<Order>();
    }

    [Key] public Guid MethodId { get; set; }

    [Required] [StringLength(50)] public string MethodName { get; set; } = null!;
    [Required] public decimal ShippingCost { get; set; }

    public virtual ICollection<Order> Orders { get; set; }
    
    public static ShippingMethod Create(string methodName, decimal shippingCost)
    {
        if (string.IsNullOrEmpty(methodName) || methodName.Length > 50)
        {
            throw new ArgumentException("MethodName is required and must be less than or equal to 50 characters.", nameof(methodName));
        }
        
        if (shippingCost < 0)
        {
            throw new ArgumentException("ShippingCost must be greater than or equal to 0.", nameof(shippingCost));
        }

        return new ShippingMethod
        {
            MethodId = Guid.NewGuid(),
            MethodName = methodName,
            ShippingCost = shippingCost,
            Orders = new HashSet<Order>()
        };
    }
}