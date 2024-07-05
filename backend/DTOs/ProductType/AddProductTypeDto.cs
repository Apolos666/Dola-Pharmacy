namespace backend.DTOs.ProductType;

public record AddProductTypeDto(string TypeName, string TypeNameNormalized, IFormFile? Image ,Guid? ParentId);