namespace backend.DTOs.ProductType;

public record ResponseProductTypeDto(string TypeName, string TypeNameNormalized,string ImagePath, Guid? ParentId, Guid TypeId);