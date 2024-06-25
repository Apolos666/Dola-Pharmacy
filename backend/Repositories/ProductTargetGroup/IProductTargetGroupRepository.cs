using backend.Repositories.Generic;

namespace backend.Repositories.ProductTargetGroup;

public interface IProductTargetGroupRepository : IRepository<Models.ProductTargetGroup>
{
    Models.ProductTargetGroup AddProductTargetGroup(Guid productId, Guid groupId);
    Task<bool> IsProductTargetGroupExistAsync(Guid productId, Guid groupId);
}