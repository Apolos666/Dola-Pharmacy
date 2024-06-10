using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Statuses")]
public class Status
{
    public Status()
    {
        Products = new HashSet<Product>();
    }

    [Key] public Guid StatusId { get; set; }
    [Required] [StringLength(25)] public string StatusName { get; set; }

    public virtual ICollection<Product> Products { get; set; }
    
    public static Status Create(string statusName)
    {
        if (string.IsNullOrEmpty(statusName) || statusName.Length > 25)
        {
            throw new ArgumentException("StatusName is required and must be less than or equal to 25 characters.", nameof(statusName));
        }

        return new Status
        {
            StatusId = Guid.NewGuid(),
            StatusName = statusName,
            Products = new HashSet<Product>()
        };
    }
}