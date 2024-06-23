namespace backend.DTOs.ProductType;

public record AddProductTypeDto(string TypeName, IFormFile? Image ,Guid? ParentId);