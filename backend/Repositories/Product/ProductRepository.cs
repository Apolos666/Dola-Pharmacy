using backend.Data;
using backend.DTOs.Product;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Product;
 
public class ProductRepository(DbFactory dbFactory) : Repository<Models.Product>(dbFactory), IProductRepository
{
    public Models.Product AddProduct(AddProductDto productDto)
    {
        try
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
        catch (Exception exception)
        {
            throw new Exception($"Error ocurred when trying to save ProductType : {exception.Message}");
        }
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
}