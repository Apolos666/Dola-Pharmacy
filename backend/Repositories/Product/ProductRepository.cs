using System.Linq.Expressions;
using backend.Data;
using backend.DTOs.Product;
using backend.Repositories.Generic;
using LinqKit;
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

    public IQueryable<Models.Product> FilterProductBasedOnType(IQueryable<Models.Product> iQueryable, Guid? typeId)
    {
        return typeId is null
            ? iQueryable
            : iQueryable.Where(p => p.ProductTypeAssociations.Any(pta =>
                dbFactory.DbContext.Set<Models.ProductType>()
                    .Any(pt => pt.TypeId == pta.TypeId && pt.TypeId == typeId)));
    }

    public IQueryable<Models.Product> FilterProducts(IQueryable<Models.Product> iQueryable, GetProductDto getProductDto)
    {
        var predicate = PredicateBuilder.New<Models.Product>(true);

        if (getProductDto.FilterPrice && !string.IsNullOrEmpty(getProductDto.FilterPriceValue))
        {
            var filterValues = ParseFilterValues(getProductDto.FilterPriceValue!);
            predicate = predicate.And(GetProductsByPrice(iQueryable, filterValues));
        }

        if (getProductDto.FilterBrand && !string.IsNullOrEmpty(getProductDto.FilterBrandValue))
        {
            var filterValues = ParseFilterValues(getProductDto.FilterBrandValue!);
            predicate = predicate.And(GetProductsByBrand(iQueryable, filterValues));
        }

        if (getProductDto.FilterTargetGroup && !string.IsNullOrEmpty(getProductDto.FilterTargetGroupValue))
        {
            var filterValues = ParseFilterValues(getProductDto.FilterTargetGroupValue!);
            predicate = predicate.And(GetProductsByTargetGroup(iQueryable, filterValues));
        }

        if (getProductDto.FilterWeight && !string.IsNullOrEmpty(getProductDto.FilterWeightValue))
        {
            var filterValues = ParseFilterValues(getProductDto.FilterWeightValue!);
            predicate = predicate.And(GetProductsByWeight(iQueryable, filterValues));
        }

        List<string> ParseFilterValues(string filterValue)
        {
            return filterValue
                .Split(["or", "Or", "oR", "OR"], StringSplitOptions.RemoveEmptyEntries)
                .Select(fv => fv.Trim())
                .ToList();
        }

        return iQueryable.Where(predicate);
    }

    private ExpressionStarter<Models.Product> GetProductsByWeight(IQueryable<Models.Product> iQueryable, List<string> filterValues)
    {
        var weights = filterValues.Select(fv => decimal.TryParse(fv, out var weight) ? weight : (decimal?)null)
            .Where(w => w.HasValue)
            .ToList();

        var predicate = PredicateBuilder.New<Models.Product>(false);

        foreach (var weight in weights)
        {
            predicate = predicate.Or(p => p.Weight == weight);
        }

        return predicate;
    }

    private ExpressionStarter<Models.Product> GetProductsByBrand(IQueryable<Models.Product> iQueryable, List<string> filterValues)
    {
        var predicate = PredicateBuilder.New<Models.Product>(false);

        foreach (var value in filterValues)
        {
            var lowerValue = value.ToLower();
            predicate = predicate.Or(p => dbFactory.DbContext.Set<Models.Brand>()
                .Any(b => b.BrandId == p.BrandId && b.BrandName.ToLower() == lowerValue));
        }

        return predicate;
    }

    private ExpressionStarter<Models.Product> GetProductsByTargetGroup(IQueryable<Models.Product> iQueryable,
        List<string> filterValues)
    {
        var targetGroups = filterValues.Select(fv => fv.ToLower() switch
        {
            "treem" => "Trẻ em",
            "nguoicaotuoi" => "Người cao tuổi",
            "nguoilon" => "Người lớn",
            "phunuchoconbu" => "Phụ nữ cho con bú",
            "phunucothai" => "Phụ nữ có thai",
            "nguoibitieuduong" => "Người bị tiểu đường",
            _ => "Người lớn"
        }).ToList();

        var predicate = PredicateBuilder.New<Models.Product>(false);

        foreach (var group in targetGroups)
        {
            predicate = predicate.Or(p =>
                dbFactory.DbContext.Set<Models.ProductTargetGroup>().Any(ptg =>
                    ptg.ProductId == p.ProductId &&
                    dbFactory.DbContext.Set<Models.TargetGroup>().Any(tg => tg.GroupId == ptg.GroupId && tg.GroupName == group)));
        }

        return predicate;
    }

    private ExpressionStarter<Models.Product> GetProductsByPrice(IQueryable<Models.Product> iQueryable,
        List<string> filterValues)
    {
        var predicate = PredicateBuilder.New<Models.Product>(false);

        foreach (var value in filterValues)
        {
            predicate = value.ToLower() switch
            {
                "tren50trieu" => predicate.Or(p => p.Price > 50000000),
                "tu20den50trieu" => predicate.Or(p => p.Price >= 20000000 && p.Price <= 50000000),
                "tu10den20trieu" => predicate.Or(p => p.Price >= 10000000 && p.Price <= 20000000),
                "tu5den10trieu" => predicate.Or(p => p.Price >= 5000000 && p.Price <= 10000000),
                "tu3den5trieu" => predicate.Or(p => p.Price >= 3000000 && p.Price <= 5000000),
                "tu2den3trieu" => predicate.Or(p => p.Price >= 2000000 && p.Price <= 3000000),
                "tu1den2trieu" => predicate.Or(p => p.Price >= 1000000 && p.Price <= 2000000),
                "duoi1trieu" => predicate.Or(p => p.Price <= 1000000),
                _ => predicate.Or(p => p.Price < 1000000)
            };
        }

        return predicate;
    }

    public IQueryable<Models.Product> SortProducts(IQueryable<Models.Product> iQueryable, string? sortColumn,
        string? sortOrder)
    {
        Expression<Func<Models.Product, object>> keySelector = sortColumn?.ToLower() switch
        {
            "productname" => product => product.ProductName,
            "price" => product => product.Price,
            _ => product => product.ProductName,
        };

        return sortOrder?.ToLower() == "desc"
            ? iQueryable.OrderByDescending(keySelector)
            : iQueryable.OrderBy(keySelector);
    }

    public async Task<bool> CheckIfProductExists(Guid productId)
    {
        return await DbSet.AnyAsync(p => p.ProductId == productId);
    }
}