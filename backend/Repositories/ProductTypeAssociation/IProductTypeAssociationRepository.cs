using backend.Repositories.Generic;

namespace backend.Repositories.ProductTypeAssociation;

public interface IProductTypeAssociationRepository : IRepository<Models.ProductTypeAssociation>
{
    Task<Models.ProductTypeAssociation?> GetProductTypeAssociationAsync(Guid productId, Guid typeId); 
    Models.ProductTypeAssociation AddProductTypeAssociation(Guid productId, Guid typeId);
    Task<bool> IsProductTypeAssociationExistAsync(Guid productId, Guid typeId);
}