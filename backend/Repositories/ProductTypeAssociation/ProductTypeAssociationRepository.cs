using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductTypeAssociation;

public class ProductTypeAssociationRepository(DbFactory dbFactory)
    : Repository<Models.ProductTypeAssociation>(dbFactory), IProductTypeAssociationRepository
{
    public async Task<Models.ProductTypeAssociation?> GetProductTypeAssociationAsync(Guid productId, Guid typeId)
    {
        return await DbSet.SingleOrDefaultAsync(pta => pta.ProductId == productId && pta.TypeId == typeId);
    }

    public Models.ProductTypeAssociation AddProductTypeAssociation(Guid productId, Guid typeId)
    {
        var productTypeAssociation = Models.ProductTypeAssociation.Create(productId, typeId);
        Add(productTypeAssociation);
        return productTypeAssociation;
    }
    
    public void DeleteProductTypeAssociation(Models.ProductTypeAssociation productTypeAssociation)
    {
        Delete(productTypeAssociation);
    }

    public async Task<bool> IsProductTypeAssociationExistAsync(Guid productId, Guid typeId)
    {
        return await DbSet.AnyAsync(pta => pta.ProductId == productId && pta.TypeId == typeId);
    }
}