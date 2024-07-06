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
    public async Task<IActionResult> AddProductToCartUser(AddCartDto addCartDto)
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
}