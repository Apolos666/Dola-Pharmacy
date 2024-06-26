using backend.Repositories.Generic;

namespace backend.Repositories.ProductTargetGroup;

public interface IProductTargetGroupRepository : IRepository<Models.ProductTargetGroup>
{
    Task<Models.ProductTargetGroup?> GetProductTargetGroupAsync(Guid productId, Guid groupId);
    Models.ProductTargetGroup AddProductTargetGroup(Guid productId, Guid groupId);
    Task<bool> IsProductTargetGroupExistAsync(Guid productId, Guid groupId);
}