using backend.Data;
using backend.Models;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.ProductStatus;

public class ProductStatusRepository(DbFactory dbFactory) : Repository<Status>(dbFactory), IProductStatusRepository
{
    public async Task<Status> AddStatusAsync(string statusName)
    {
        try
        {
            var exist = await DbSet.SingleOrDefaultAsync(b => b.StatusName == statusName);
            
            if (exist is not null)
                throw new Exception($"Status Name {statusName} already exists");
            
            var status = Models.Status.Create(statusName);
            Add(status);
            return status;
        }
        catch (Exception exception)
        {
            throw new Exception($"Exception: {exception.Message}");
        }
    }
}