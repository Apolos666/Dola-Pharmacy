using backend.Repositories.Generic;

namespace backend.Repositories.ProductImage;

public interface IProductImageRepository : IRepository<Models.ProductImage>
{
    Models.ProductImage AddProductImage(Guid? imageId, Guid productId, string imageUrl, bool isPrimary);
}