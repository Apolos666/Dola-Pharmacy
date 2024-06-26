using backend.Repositories.Generic;

namespace backend.Repositories.ProductType;

public interface IProductTypeRepository : IRepository<Models.ProductType>
{
    Task<Models.ProductType> AddProductTypeAsync(Guid? id, string typeName, string? imageUrl ,Guid? parentId);
    Task<bool> IsProductTypeExistAsync(Guid id);
}