using backend.DTOs.Cart;
using backend.Repositories.Cart;
using backend.Repositories.CartItem;
using backend.UnitOfWork;

namespace backend.Services.Cart;

public class CartUserService(
    ICartRepository cartRepository,
    ICartItemRepository cartItemRepository,
    IUnitOfWork unitOfWork)
{
    private readonly ICartRepository _cartRepository = cartRepository;
    private readonly ICartItemRepository _cartItemRepository = cartItemRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    // Todo: Thêm Dto để trả về dữ liệu thích hợp
    public async Task<Models.Cart?> GetCartByUserId(string userId)
    {
        return await _cartRepository.GetCartByUserId(userId);
    }

    // Todo: Thêm Dto để trả về dữ liệu thích hợp
    public async Task<Models.Cart?> AddProductToCartUser(string userId, Guid productId, int quantity)
    {
        await _unitOfWork.BeginTransactionAsync();
        try
        {
            var isCartExist = await _cartRepository.GetCartByUserId(userId);

            if (isCartExist is not null)
            {
                await _cartItemRepository.AddCartItem(isCartExist.CartId, productId, quantity);
            }
            else
            {
                var cart = _cartRepository.AddCartUser(userId);
                await _unitOfWork.CommitAsync();

                await _cartItemRepository.AddCartItem(cart.CartId, productId, quantity);
            }

            await _unitOfWork.CommitAsync();
            await _unitOfWork.CommitTransactionAsync();

            return isCartExist ?? await _cartRepository.GetCartByUserId(userId);
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }
}