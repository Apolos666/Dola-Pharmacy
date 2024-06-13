using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

[Table("Addresses")]
public class Address
{
    public Address()
    {
        Orders = new HashSet<Order>();
    }

    [Key] public Guid AddressId { get; set; }
    [Required] public string UserId { get; set; } = null!;
    [Required] [StringLength(50)] public string AddressText { get; set; } = null!;
    [Required] [StringLength(50)] public string City { get; set; } = null!;
    [Required] [StringLength(50)] public string District { get; set; } = null!;
    [Required] [StringLength(50)] public string Ward { get; set; } = null!;

    [ForeignKey(nameof(UserId))] public virtual ApplicationIdentityUser User { get; set; } = null!;
    public virtual ICollection<Order> Orders { get; set; }
    
    public static Address Create(string userId, string addressText, string city, string district, string ward)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }

        if (string.IsNullOrEmpty(addressText) || addressText.Length > 50)
        {
            throw new ArgumentException("AddressText is required and must be less than or equal to 50 characters.", nameof(addressText));
        }

        if (string.IsNullOrEmpty(city) || city.Length > 50)
        {
            throw new ArgumentException("City is required and must be less than or equal to 50 characters.", nameof(city));
        }

        if (string.IsNullOrEmpty(district) || district.Length > 50)
        {
            throw new ArgumentException("District is required and must be less than or equal to 50 characters.", nameof(district));
        }

        if (string.IsNullOrEmpty(ward) || ward.Length > 50)
        {
            throw new ArgumentException("Ward is required and must be less than or equal to 50 characters.", nameof(ward));
        }

        return new Address
        {
            AddressId = Guid.NewGuid(),
            UserId = userId,
            AddressText = addressText,
            City = city,
            District = district,
            Ward = ward,
            Orders = new HashSet<Order>()
        };
    }
}