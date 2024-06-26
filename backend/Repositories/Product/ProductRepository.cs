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

    public IQueryable<Models.Product> FilterProducts(IQueryable<Models.Product> iQueryable, string? filterColumn,
        string? filterValue)
    {
        return filterColumn?.ToLower() switch
        {
            "price" => GetProductsByPrice(iQueryable, filterValue),
            "brand" => filterValue is not null ? GetProductsByBrand(iQueryable, filterValue) : iQueryable,
            "targetgroup" => GetProductsByTargetGroup(iQueryable, filterValue),
            "weight" => decimal.TryParse(filterValue, out var weight) ? iQueryable.Where(p => p.Weight == weight) : iQueryable,
                _ => iQueryable
        };
    }
    
    private IQueryable<Models.Product> GetProductsByBrand(IQueryable<Models.Product> iQueryable, string filterValue)
    {
        var query = from p in iQueryable
                                    join b in dbFactory.DbContext.Set<Models.Brand>() on p.BrandId equals b.BrandId
                                    where b.BrandName.ToLower() == filterValue.ToLower()
                                    select p;
        return query;
    }
    
    private IQueryable<Models.Product> GetProductsByTargetGroup(IQueryable<Models.Product> iQueryable, string? filterValue)
    {
        var targetGroup = filterValue?.ToLower() switch
        {
            "treem" => "Trẻ em",
            "nguoicaotuoi" => "Người cao tuổi",
            "nguoilon" => "Người lớn",
            "phunuchoconbu" => "Phụ nữ cho con bú",
            "phunucothai" => "Phụ nữ có thai",
            "nguoibitieuduong" => "Người bị tiểu đường",
            _ => "Người lớn"
        };

        var query = from p in iQueryable
                                    join ptg in dbFactory.DbContext.Set<Models.ProductTargetGroup>() on p.ProductId equals ptg.ProductId
                                    join tg in dbFactory.DbContext.Set<Models.TargetGroup>() on ptg.GroupId equals tg.GroupId
                                    where tg.GroupName == targetGroup
                                    select p;

        return query;
    }

    private IQueryable<Models.Product> GetProductsByPrice(IQueryable<Models.Product> iQueryable, string? filterValue)
    {
        return filterValue?.ToLower() switch
        {
            "tren50trieu" => iQueryable.Where(p => p.Price > 50000000),
            "tu20den50trieu" => iQueryable.Where(p => p.Price <= 50000000 && p.Price >= 20000000),
            "tu10den20trieu" => iQueryable.Where(p => p.Price <= 20000000 && p.Price >= 10000000),
            "tu5den10trieu" => iQueryable.Where(p => p.Price <= 10000000 && p.Price >= 5000000),
            "tu3den5trieu" => iQueryable.Where(p => p.Price <= 5000000 && p.Price >= 3000000),
            "tu2den3trieu" => iQueryable.Where(p => p.Price <= 3000000 && p.Price >= 2000000),
            "tu1den2trieu" => iQueryable.Where(p => p.Price <= 2000000 && p.Price >= 1000000),
            "duoi1trieu" => iQueryable.Where(p => p.Price <= 1000000),
            _ => iQueryable.Where(p => p.Price < 1000000)
        };
    }

    public IQueryable<Models.Product> SortProducts(IQueryable<Models.Product> iQueryable, string? sortColumn,
        string? sortOrder)
    {
        Expression<Func<Models.Product, object>> keySelector = sortColumn?.ToLower() switch
        {
            "productname" => product => product.ProductName,
            "price" => product => product.Price,
            _ => product => product.ProductName,
        }; // Default sort by ProductName

        // Default sort by ascending order
        return sortOrder?.ToLower() == "desc"
            ? iQueryable.OrderByDescending(keySelector)
            : iQueryable.OrderBy(keySelector);
    }

    public async Task<bool> CheckIfProductExists(Guid productId)
    {
        return await DbSet.AnyAsync(p => p.ProductId == productId);
    }
}