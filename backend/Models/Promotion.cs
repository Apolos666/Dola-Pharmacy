using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Promotions")]
public class Promotion
{
    public Promotion()
    {
        PromotionProducts = new HashSet<PromotionProduct>();
    }

    [Key] public Guid PromotionId { get; set; }
    [Required] [StringLength(100)] public string PromotionName { get; set; }
    [Required] public DateTime StartTime { get; set; }
    [Required] public DateTime EndTime { get; set; }

    public virtual ICollection<PromotionProduct> PromotionProducts { get; set; }
    
    public static Promotion Create(string promotionName, DateTime startTime, DateTime endTime)
    {
        if (string.IsNullOrEmpty(promotionName) || promotionName.Length > 100)
        {
            throw new ArgumentException("PromotionName is required and must be less than or equal to 100 characters.", nameof(promotionName));
        }

        if (startTime > endTime)
        {
            throw new ArgumentException("StartTime must be less than EndTime.", nameof(startTime));
        }

        return new Promotion
        {
            PromotionId = Guid.NewGuid(),
            PromotionName = promotionName,
            StartTime = startTime,
            EndTime = endTime,
            PromotionProducts = new HashSet<PromotionProduct>()
        };
    }
}