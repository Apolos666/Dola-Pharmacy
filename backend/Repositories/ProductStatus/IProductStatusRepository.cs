using backend.Models;
using backend.Repositories.Generic;

namespace backend.Repositories.ProductStatus;

public interface IProductStatusRepository : IRepository<Status>
{
    Task<Status> AddStatusAsync(string statusName);
}