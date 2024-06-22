using backend.Data;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Brand;

public class BrandRepository(DbFactory dbFactory) : Repository<Models.Brand>(dbFactory), IBrandRepository
{
    public async Task<Models.Brand> AddBrandAsync(string branchName)
    {
        try
        {
            var exist = await DbSet.SingleOrDefaultAsync(b => b.BrandName == branchName);
            
            if (exist is not null)
                throw new Exception($"Brand {branchName} already exists");
            
            var brand = Models.Brand.Create(branchName);
            Add(brand);
            return brand;
        }
        catch (Exception exception)
        {
            throw new Exception($"Exception: {exception.Message}");
        }
    }
}