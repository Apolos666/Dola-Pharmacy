using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ProductTypes")]
public class ProductType
{
    public ProductType()
    {
        Children = new HashSet<ProductType>();
        ProductTypeAssociations = new HashSet<ProductTypeAssociation>();
    }

    [Key] public Guid TypeId { get; set; }
    [Required] [StringLength(50)] public string TypeName { get; set; } = null!;
    [Required] [StringLength(50)] public string TypeNameNormalized { get; set; }
    [StringLength(300)] public string? ImagePath { get; set; }
    public Guid? ParentId { get; set; }

    [ForeignKey(nameof(ParentId))] public virtual ProductType Parent { get; set; }
    public virtual ICollection<ProductType> Children { get; set; }
    public virtual ICollection<ProductTypeAssociation> ProductTypeAssociations { get; set; }
    
    public static ProductType Create(Guid? id, string typeName, string typeNameNormalized,string? imagePath ,Guid? parentId)
    {
        if (string.IsNullOrEmpty(typeName) || typeName.Length > 50)
        {
            throw new ArgumentException("TypeName is required and must be less than or equal to 50 characters.", nameof(typeName));
        }
        
        if (string.IsNullOrEmpty(typeNameNormalized) || typeNameNormalized.Length > 50)
        {
            throw new ArgumentException("TypeNameNormalized is required and must be less than or equal to 50 characters.", nameof(typeNameNormalized));
        }
        
        if (imagePath?.Length > 300)
        {
            throw new ArgumentException("ImagePath must be less than or equal to 300 characters.", nameof(imagePath));
        }

        return new ProductType
        {
            TypeId = id ?? Guid.NewGuid(),
            TypeName = typeName,
            TypeNameNormalized = typeNameNormalized,
            ImagePath = imagePath,
            ParentId = parentId,
            Children = new HashSet<ProductType>(),
            ProductTypeAssociations = new HashSet<ProductTypeAssociation>()
        };
    }
}