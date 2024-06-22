using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.TargetGroup;

public class TargetGroupRepository(DbFactory dbFactory)
    : Repository<Models.TargetGroup>(dbFactory), ITargetGroupRepository
{
    public async Task<Models.TargetGroup> AddTargetGroupAsync(string groupName)
    {
        try
        {
            var exist = await DbSet.SingleOrDefaultAsync(tg => tg.GroupName == groupName);

            if (exist is not null)
                throw new Exception($"Group {groupName} already exists");
            
            var targetGroup = Models.TargetGroup.Create(groupName);
            Add(targetGroup);
            return targetGroup;
        }
        catch (Exception exception)
        {
            throw new Exception($"Error ocurred when trying to save TargetGroup : {exception.Message}");
        }
    }
}