using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("PaymentMethods")]
public class PaymentMethod
{
    public PaymentMethod()
    {
        Orders = new HashSet<Order>();
    }
    
    [Key] public Guid MethodId { get; set; }
    [Required] [StringLength(50)] public string MethodName { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; }
    
    public static PaymentMethod Create(string methodName)
    {
        if (string.IsNullOrEmpty(methodName) || methodName.Length > 50)
        {
            throw new ArgumentException("MethodName is required and must be less than or equal to 50 characters.", nameof(methodName));
        }

        return new PaymentMethod
        {
            MethodId = Guid.NewGuid(),
            MethodName = methodName,
            Orders = new HashSet<Order>()
        };
    }
}