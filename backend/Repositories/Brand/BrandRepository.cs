using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.Brand;

public class BrandRepository(DbFactory dbFactory) : Repository<Models.Brand>(dbFactory), IBrandRepository
{
    public Models.Brand AddBrand(string branchName)
    {
        try
        {
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