using backend.DTOs.Product;
using backend.Repositories.Generic;

namespace backend.Repositories.Product;

public interface IProductRepository : IRepository<Models.Product>
{
    Models.Product AddProduct(AddProductDto productDto);
    Task<Models.Product?> GetProductWithRelations(Guid productId);
    Task<bool> CheckIfProductExists(Guid productId);
}