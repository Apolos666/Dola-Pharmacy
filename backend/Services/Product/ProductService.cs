using AutoMapper;
using backend.DTOs.Product;
using backend.Repositories.Product;
using backend.UnitOfWork;
using backend.Utilities.Pagination;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Product;

public class ProductService(IUnitOfWork unitOfWork, IProductRepository productRepository, IMapper mapper)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<ResponseProductDto> AddProductAsync(AddProductDto addProductDto)
    {
        var product = _productRepository.AddProduct(addProductDto);
        var saved = await _unitOfWork.CommitAsync();

        if (saved <= 0)
            throw new Exception($"Cannot save {product} to database");

        var productWithRelations = await _productRepository.GetProductWithRelations(product.ProductId);

        if (productWithRelations is null)
            throw new Exception(
                $"Product with ID {product.ProductId} could not be found in the database with its relations.");

        var responseProductDto = _mapper.Map<ResponseProductDto>(productWithRelations);
        return responseProductDto;
    }

    public async Task<PagedList<Models.Product>> GetProductAsync(GetProductDto getProductDto)
    {
        var productQuery = _productRepository.GetIQueryableProduct();

        productQuery =
            _productRepository.FilterProducts(productQuery, getProductDto);

        productQuery =
            _productRepository.SortProducts(productQuery, getProductDto.SortColumn, getProductDto.SortOrder);

        var products =
            await PagedList<Models.Product>.CreateAsync(productQuery, getProductDto.Page, getProductDto.PageSize);

        return products;
    }

    public async Task<bool> IsProductExists(Guid productId)
    {
        return await _productRepository.CheckIfProductExists(productId);
    }
}