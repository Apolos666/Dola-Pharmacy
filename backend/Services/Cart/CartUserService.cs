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
    
    public async Task UpdateProductQuantityInCartUser(string userId, Guid productId, int quantity)
    {
        try
        {
            var cart = await _cartRepository.GetCartByUserId(userId);
        
            if (cart is null)
                throw new Exception($"Cart with {userId} not found");
        
            var cartItem = await _cartItemRepository.GetCartItemAsync(cart.CartId, productId);

            if (cartItem is not null) _cartItemRepository.UpdateCartItemQuantity(cartItem, quantity);
        
            await _unitOfWork.CommitAsync();
        }
        catch (Exception exception)
        {
            throw new Exception("Update product quantity in cart user failed", exception);
        }
    }
    
    public async Task RemoveProductFromCartUser(string userId, Guid productId)
    {
        try
        {
            var cart = await _cartRepository.GetCartByUserId(userId);
        
            if (cart is null)
                throw new Exception($"Cart with {userId} not found");
        
            var cartItem = await _cartItemRepository.GetCartItemAsync(cart.CartId, productId);

            if (cartItem is not null) _cartItemRepository.RemoveCartItem(cartItem);
        
            await _unitOfWork.CommitAsync();
        }
        catch (Exception exception)
        {
            throw new Exception("Remove product from cart user failed", exception);
        }
    }
    
    public async Task UpdateCartUser(string userId, UpdateCartDto updateCartDto)
    {
        try
        {
            var cart = await _cartRepository.GetCartByUserId(userId);
        
            if (cart is null)
                throw new Exception($"Cart with {userId} not found");
        
            _cartRepository.UpdateCart(cart, updateCartDto);
        
            await _unitOfWork.CommitAsync();
        }
        catch (Exception exception)
        {
            throw new Exception("Update cart user failed", exception);
        }
    }
}