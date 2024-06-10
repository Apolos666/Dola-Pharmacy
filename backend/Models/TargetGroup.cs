using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("TargetGroups")]
public class TargetGroup
{
    public TargetGroup()
    {
        ProductTargetGroups = new HashSet<ProductTargetGroup>();
    }

    [Key] public Guid GroupId { get; set; }
    [Required] [StringLength(100)] public string GroupName { get; set; }

    public virtual ICollection<ProductTargetGroup> ProductTargetGroups { get; set; }
    
    public static TargetGroup Create(string groupName)
    {
        if (string.IsNullOrEmpty(groupName) || groupName.Length > 100)
        {
            throw new ArgumentException("GroupName is required and must be less than or equal to 100 characters.", nameof(groupName));
        }

        return new TargetGroup
        {
            GroupId = Guid.NewGuid(),
            GroupName = groupName,
            ProductTargetGroups = new HashSet<ProductTargetGroup>()
        };
    }
}