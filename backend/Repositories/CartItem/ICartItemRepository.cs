using backend.Repositories.Generic;

namespace backend.Repositories.CartItem;

public interface ICartItemRepository : IRepository<Models.CartItem>
{
    Task<Models.CartItem?> GetCartItemAsync(Guid cartId, Guid productId);
    Task<Models.CartItem> AddCartItem(Guid cartId, Guid productId, int quantity);
    void UpdateCartItemQuantity(Models.CartItem cartItem, int quantity);
    void RemoveCartItem(Models.CartItem cartItem);
}