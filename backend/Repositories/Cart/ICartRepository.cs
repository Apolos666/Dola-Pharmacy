using backend.DTOs.Cart;
using backend.Repositories.Generic;

namespace backend.Repositories.Cart;

public interface ICartRepository : IRepository<Models.Cart>
{
    Task<Models.Cart?> GetCartByUserId(string userId);
    Models.Cart AddCartUser(string userId);
}