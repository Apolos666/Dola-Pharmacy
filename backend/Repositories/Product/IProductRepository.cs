﻿using backend.DTOs.Product;
using backend.Repositories.Generic;

namespace backend.Repositories.Product;

public interface IProductRepository : IRepository<Models.Product>
{
    IQueryable<Models.Product> GetIQueryableProduct();
    Models.Product AddProduct(AddProductDto productDto);
    Task<Models.Product?> GetProductWithRelations(Guid productId);
    IQueryable<Models.Product> SortProducts(IQueryable<Models.Product> iQueryable, string? sortColumn, string? sortOrder);
    Task<bool> CheckIfProductExists(Guid productId);
}