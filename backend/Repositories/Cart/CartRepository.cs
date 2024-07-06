using backend.Data;
using backend.DTOs.Cart;
using backend.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Cart;

public class CartRepository(DbFactory dbFactory) : Repository<Models.Cart>(dbFactory), ICartRepository
{
    public async Task<Models.Cart?> GetCartByUserId(string userId)
    {
        return await DbSet
            .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
            .SingleOrDefaultAsync(c => c.UserId == userId);
    }

    public Models.Cart AddCartUser(string userId)
    {
        var cart = Models.Cart.Create(userId);
        Add(cart);
        return cart;
    }
}