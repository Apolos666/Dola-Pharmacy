namespace backend.DTOs.ProductType;

public record ResponseProductTypeDto(string TypeName, string TypeNameNormalized,string ImagePath, Guid? ParentId, Guid TypeId);

public record ResponseProductTypeWithChildrenDto(string TypeName, string TypeNameNormalized, string ImagePath, Guid TypeId, IEnumerable<ResponseProductTypeDto> Children);