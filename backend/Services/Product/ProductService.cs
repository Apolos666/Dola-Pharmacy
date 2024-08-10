using AutoMapper;
using backend.DTOs.Product;
using backend.Repositories.Product;
using backend.UnitOfWork;
using backend.Utilities.Pagination;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Product;

public class ProductService(IUnitOfWork unitOfWork, IProductRepository productRepository, IMapper mapper)
{
    public async Task<ResponseProductDto> AddProductAsync(AddProductDto addProductDto)
    {
        var product = productRepository.AddProduct(addProductDto);
        var saved = await unitOfWork.CommitAsync();

        if (saved <= 0)
            throw new Exception($"Cannot save {product} to database");

        var productWithRelations = await productRepository.GetProductWithRelations(product.ProductId);

        if (productWithRelations is null)
            throw new Exception(
                $"Product with ID {product.ProductId} could not be found in the database with its relations.");

        var responseProductDto = mapper.Map<ResponseProductDto>(productWithRelations);
        return responseProductDto;
    }

    public async Task<PagedList<Models.Product>> GetProductAsync(GetProductDto getProductDto, CancellationToken cancellationToken)
    {
        var productQuery = productRepository.GetIQueryableProduct();
        
        productQuery = productRepository.FilterProductBasedOnType(productQuery, getProductDto.ProductTypeNameNormalized); 

        productQuery =
            productRepository.FilterProducts(productQuery, getProductDto);

        productQuery =
            productRepository.SortProducts(productQuery, getProductDto.SortColumn, getProductDto.SortOrder);

        productQuery = productQuery.Include(p => p.ProductImages);
        
        var products =
            await PagedList<Models.Product>.CreateAsync(productQuery, getProductDto.Page, getProductDto.PageSize, cancellationToken);

        return products;
    }
    
    public async Task<Models.Product?> GetProductByProductNameNormalized(string productNameNormalized)
    {
        return await productRepository.GetProductByProductNameNormalized(productNameNormalized);
    }

    public async Task<bool> IsProductExists(Guid productId)
    {
        return await productRepository.CheckIfProductExists(productId);
    }
}