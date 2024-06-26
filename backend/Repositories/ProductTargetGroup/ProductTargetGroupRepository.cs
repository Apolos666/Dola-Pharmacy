using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductTargetGroup;

public class ProductTargetGroupRepository(DbFactory dbFactory)
    : Repository<Models.ProductTargetGroup>(dbFactory), IProductTargetGroupRepository
{
    public async Task<Models.ProductTargetGroup?> GetProductTargetGroupAsync(Guid productId, Guid groupId)
    {
        return await DbSet.SingleOrDefaultAsync(ptg => ptg.ProductId == productId && ptg.GroupId == groupId);
    }

    public Models.ProductTargetGroup AddProductTargetGroup(Guid productId, Guid groupId)
    {
        var productTargetGroup = Models.ProductTargetGroup.Create(productId, groupId);
        Add(productTargetGroup);
        return productTargetGroup;
    }

    public Task<bool> IsProductTargetGroupExistAsync(Guid productId, Guid groupId)
    {
        return DbSet.AnyAsync(ptg => ptg.ProductId == productId && ptg.GroupId == groupId);
    }
}