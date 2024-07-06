using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.CartItem
{
    public class CartItemRepository(DbFactory dbFactory) : Repository<Models.CartItem>(dbFactory), ICartItemRepository
    {
        public async Task<Models.CartItem?> GetCartItemAsync(Guid cartId, Guid productId)
        {
            return await DbSet.SingleOrDefaultAsync(ci => ci.CartId == cartId && ci.ProductId == productId);
        }

        public async Task<Models.CartItem> AddCartItem(Guid cartId, Guid productId, int quantity)
        {
            var cartItem = await DbSet.SingleOrDefaultAsync(ci => ci.CartId == cartId && ci.ProductId == productId);

            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
            }
            else
            {
                cartItem = new Models.CartItem
                {
                    CartId = cartId,
                    ProductId = productId,
                    Quantity = quantity
                };

                await DbSet.AddAsync(cartItem);
            }

            return cartItem;
        }

        public void UpdateCartItemQuantity(Models.CartItem cartItem, int quantity)
        {
            cartItem.Quantity = quantity;
            Update(cartItem);
        }

        public void RemoveCartItem(Models.CartItem cartItem)
        {
            Delete(cartItem);
        }
    }
}