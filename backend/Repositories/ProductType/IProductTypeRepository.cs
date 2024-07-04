using backend.Repositories.Generic;

namespace backend.Repositories.ProductType;

public interface IProductTypeRepository : IRepository<Models.ProductType>
{
    Task<IEnumerable<Models.ProductType>> GetAllProductTypesWithChildrenAsync();
    Task<Models.ProductType?> GetProductTypeByTypeNameNormalizedAsync(string typeNameNormalized);
    Task<Models.ProductType> AddProductTypeAsync(Guid? id, string typeName, string typeNameNormalized,string? imageUrl ,Guid? parentId);
    Task<bool> IsProductTypeExistAsync(Guid id);
}