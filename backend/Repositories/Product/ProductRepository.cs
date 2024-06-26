using System.Linq.Expressions;
using backend.Data;
using backend.DTOs.Product;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Product;

public class ProductRepository(DbFactory dbFactory) : Repository<Models.Product>(dbFactory), IProductRepository
{
    public IQueryable<Models.Product> GetIQueryableProduct()
    {
        return DbSet.AsQueryable();
    }

    public Models.Product AddProduct(AddProductDto productDto)
    {
        var product = new ProductBuilder()
            .WithProductName(productDto.ProductName)
            .WithBrandId(productDto.BrandId)
            .WithStatusId(productDto.StatusId)
            .WithPrice(productDto.Price)
            .WithDescription(productDto.Description)
            .WithBuyingGuide(productDto.BuyingGuide)
            .WithWeight(productDto.Weight)
            .Build();
        Add(product);
        return product;
    }

    public async Task<Models.Product?> GetProductWithRelations(Guid productId)
    {
        return await DbSet
            .AsNoTracking()
            .Include(p => p.ProductTargetGroups)
            .Include(p => p.ProductTypeAssociations)
            .Include(p => p.ProductImages)
            .AsSplitQuery()
            .FirstOrDefaultAsync(p => p.ProductId == productId);
    }

    public IQueryable<Models.Product> SortProducts(IQueryable<Models.Product> iQueryable,string? sortColumn, string? sortOrder)
    {
        Expression<Func<Models.Product, object>> keySelector = sortColumn?.ToLower() switch
        {
            "productname" => product => product.ProductName,
            "price" => product => product.Price,
            _ => product => product.ProductName,
        }; // Default sort by ProductName

        // Default sort by ascending order
        return sortOrder?.ToLower() == "desc" ? iQueryable.OrderByDescending(keySelector) : iQueryable.OrderBy(keySelector);
    }

    public async Task<bool> CheckIfProductExists(Guid productId)
    {
        return await DbSet.AnyAsync(p => p.ProductId == productId);
    }
}