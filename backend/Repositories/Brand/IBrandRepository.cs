using backend.DTOs.Brand;
using backend.Repositories.Generic;

namespace backend.Repositories.Brand;

public interface IBrandRepository : IRepository<Models.Brand>
{
    Task<Models.Brand> AddBrandAsync(string branchName);
}