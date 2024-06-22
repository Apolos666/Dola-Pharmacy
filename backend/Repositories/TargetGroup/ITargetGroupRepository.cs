using backend.Repositories.Generic;

namespace backend.Repositories.TargetGroup;

public interface ITargetGroupRepository : IRepository<Models.TargetGroup>
{
    Task<Models.TargetGroup> AddTargetGroupAsync(string groupName);
}