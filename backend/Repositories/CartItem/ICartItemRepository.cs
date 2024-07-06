using backend.Repositories.Generic;

namespace backend.Repositories.CartItem;

public interface ICartItemRepository : IRepository<Models.CartItem>
{
    Task<Models.CartItem> AddCartItem(Guid cartId, Guid productId, int quantity);
}