using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.ProductImage;

public class ProductImageRepository : Repository<Models.ProductImage>, IProductImageRepository
{
    public ProductImageRepository(DbFactory dbFactory) : base(dbFactory)
    {
    }

    public Models.ProductImage AddProductImage(Guid? imageId, Guid productId, string imageUrl, bool isPrimary)
    {
        var productImage = Models.ProductImage.Create(imageId, productId, imageUrl, isPrimary);
        Add(productImage);
        return productImage;
    }
}