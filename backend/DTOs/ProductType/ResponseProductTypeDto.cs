namespace backend.DTOs.ProductType;

public record ResponseProductTypeDto(string TypeName, string ImagePath, Guid? ParentId, Guid TypeId);