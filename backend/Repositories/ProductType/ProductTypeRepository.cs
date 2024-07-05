using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductType;

public class ProductTypeRepository(DbFactory dbFactory)
    : Repository<Models.ProductType>(dbFactory), IProductTypeRepository
{
    public async Task<IEnumerable<Models.ProductType>> GetAllProductTypesWithChildrenAsync()
    {
        var productTypes = await DbSet
            .Include(pt => pt.Children)
            .Where(pt => pt.ParentId == null)
            .ToListAsync();

        return productTypes;
    }

    public async Task<Models.ProductType?> GetProductTypeByTypeNameNormalizedAsync(string typeNameNormalized)
    {
        return await DbSet.SingleOrDefaultAsync(pt => pt.TypeNameNormalized == typeNameNormalized);
    }

    public async Task<Models.ProductType> AddProductTypeAsync(Guid? id, string typeName, string typeNameNormalized,string? imageUrl, Guid? parentId)
    {
        try
        {
            var exist = await DbSet.SingleOrDefaultAsync(pt => pt.TypeName == typeName);
            
            if (exist is not null)
                throw new Exception($"Product Type {typeName} already exists");
            
            var productType = Models.ProductType.Create(id, typeName, typeNameNormalized, imageUrl, parentId);
            Add(productType);
            return productType;
        }
        catch (Exception exception)
        {
            throw new Exception($"Error ocurred when trying to save ProductType : {exception.Message}");
        }
    }

    public async Task<bool> IsProductTypeExistAsync(Guid id)
    {
        return await DbSet.AnyAsync(pt => pt.TypeId == id);
    }
}