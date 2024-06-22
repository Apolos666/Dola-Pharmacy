using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductType;

public class ProductTypeRepository(DbFactory dbFactory)
    : Repository<Models.ProductType>(dbFactory), IProductTypeRepository
{
    public async Task<Models.ProductType> AddProductTypeAsync(Guid? id, string typeName, string imageUrl, Guid? parentId)
    {
        try
        {
            var exist = await DbSet.SingleOrDefaultAsync(pt => pt.TypeName == typeName);
            
            if (exist is not null)
                throw new Exception($"Product Type {typeName} already exists");
            
            var productType = Models.ProductType.Create(id, typeName, imageUrl, parentId);
            Add(productType);
            return productType;
        }
        catch (Exception exception)
        {
            throw new Exception($"Error ocurred when trying to save ProductType : {exception.Message}");
        }
    }
}