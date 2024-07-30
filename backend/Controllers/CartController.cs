using System.Security.Claims;
using backend.DTOs.Cart;
using backend.Services.Cart;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = Roles.User)]
public class CartController(CartUserService cartUserService, ILogger<CartController> logger) : ControllerBase
{
    private readonly CartUserService _cartUserService = cartUserService;
    private readonly ILogger<CartController> _logger = logger;
    
    [HttpGet("get-user-cart")]
    public async Task<IActionResult> GetUserCart()
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId is null)
        {
            _logger.LogError("Failed to get user id when get user cart.");
            return BadRequest("Failed to get user cart.");
        }
        
        _logger.LogInformation("Getting cart for user {@userId}.", userId);
        var cart = await _cartUserService.GetCartByUserId(userId);
        
        if (cart is null)
        {
            _logger.LogError("Failed to get user cart.");
            return BadRequest("Failed to get user cart.");
        }
        
        _logger.LogInformation("Successfully got user cart.");
        return Ok(cart);
    }
    
    [HttpPost("add-product")]
    public async Task<IActionResult> AddProductToCartUser([FromBody] AddCartDto addCartDto)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId is null)
        {
            _logger.LogError("Failed to get user id when add product to cart.");
            return BadRequest("Failed to add product to cart.");
        }
        
        // Todo: Add Validation
        _logger.LogInformation("Adding product {@productId} to cart user {@userId} with quantity {@quantity}.", addCartDto.ProductId, userId, addCartDto.Quantity);
        var cart = await _cartUserService.AddProductToCartUser(userId, addCartDto.ProductId, addCartDto.Quantity);
        
        if (cart is null)
        {
            _logger.LogError("Failed to add product to cart.");
            return BadRequest("Failed to add product to cart.");
        }
        
        _logger.LogInformation("Successfully added product to cart.");
        return Ok(cart);
    }

    [HttpPatch("update-product-quantity")]
    public async Task<IActionResult> UpdateProductQuantityInCartUser([FromBody] UpdateCartProductDto updateCartProductDto)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            _logger.LogError("Failed to get user id when update product quantity in cart.");
            return BadRequest("Failed to update product quantity in cart.");
        }
        
        _logger.LogInformation("Updating product {@productId} quantity in cart user {@userId} with quantity {@quantity}.", updateCartProductDto.ProductId, userId, updateCartProductDto.Quantity);
        await _cartUserService.UpdateProductQuantityInCartUser(userId, updateCartProductDto.ProductId, updateCartProductDto.Quantity);
        
        _logger.LogInformation("Successfully updated product quantity in cart.");
        return Ok();
    }
    
    [HttpDelete("remove-product/{productId:guid}")]
    public async Task<IActionResult> RemoveProductFromCartUser([FromRoute] RemoveCartDto removeCartDto)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            _logger.LogError("Failed to get user id when remove product from cart.");
            return BadRequest("Failed to remove product from cart.");
        }
        
        _logger.LogInformation("Removing product {@productId} from cart user {@userId}.", removeCartDto.ProductId, userId);
        await _cartUserService.RemoveProductFromCartUser(userId, removeCartDto.ProductId);
        
        _logger.LogInformation("Successfully removed product from cart.");
        return NoContent();
    }
    
    [HttpPatch("update-cart")]
    public async Task<IActionResult> UpdateCart([FromBody] UpdateCartDto updateCartDto)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            _logger.LogError("Failed to get user id when update cart.");
            return BadRequest("Failed to update cart.");
        }
        
        _logger.LogInformation("Updating cart for user {@userId} with delivery date {@deliveryDate} and delivery time {@deliveryTime}.", userId, updateCartDto.DeliveryDate, updateCartDto.DeliveryTime);
        await _cartUserService.UpdateCartUser(userId, updateCartDto);
        
        _logger.LogInformation("Successfully updated cart.");
        return Ok();
    }
}