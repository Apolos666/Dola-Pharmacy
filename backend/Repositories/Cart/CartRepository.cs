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
                    .ThenInclude(p => p.ProductImages)
            .AsSplitQuery()
            .SingleOrDefaultAsync(c => c.UserId == userId);
    }

    public Models.Cart AddCartUser(string userId)
    {
        var cart = Models.Cart.Create(userId);
        Add(cart);
        return cart;
    }

    public Models.Cart UpdateCart(Models.Cart cart, UpdateCartDto updateCartDto)
    {
        cart.DeliveryDate = DateTime.SpecifyKind(updateCartDto.DeliveryDate, DateTimeKind.Utc).ToUniversalTime(); 
        if (updateCartDto.DeliveryTime.HasValue) 
            cart.DeliveryTime = updateCartDto.DeliveryTime.Value; 
        Update(cart);
        return cart;
    }
}