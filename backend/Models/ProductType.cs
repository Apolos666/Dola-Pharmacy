﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ProductTypes")]
public class ProductType
{
    public ProductType()
    {
        Children = new HashSet<ProductType>();
        Products = new HashSet<Product>();
    }

    [Key] public Guid TypeId { get; set; }
    [Required] [StringLength(50)] public string TypeName { get; set; } = null!;
    [Required] [StringLength(300)] public string ImagePath { get; set; } = null!;
    public Guid? ParentId { get; set; }

    [ForeignKey(nameof(ParentId))] public virtual ProductType Parent { get; set; }
    public virtual ICollection<ProductType> Children { get; set; }
    public virtual ICollection<Product> Products { get; set; }
    
    public static ProductType Create(string typeName, string imagePath, Guid? parentId)
    {
        if (string.IsNullOrEmpty(typeName) || typeName.Length > 50)
        {
            throw new ArgumentException("TypeName is required and must be less than or equal to 50 characters.", nameof(typeName));
        }

        if (string.IsNullOrEmpty(imagePath) || imagePath.Length > 300)
        {
            throw new ArgumentException("ImagePath is required and must be less than or equal to 300 characters.", nameof(imagePath));
        }

        return new ProductType
        {
            TypeId = Guid.NewGuid(),
            TypeName = typeName,
            ImagePath = imagePath,
            ParentId = parentId,
            Children = new HashSet<ProductType>(),
            Products = new HashSet<Product>()
        };
    }
}