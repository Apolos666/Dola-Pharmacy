using backend.DTOs.Product;
using backend.DTOs.ProductImage;
using backend.Services.Product;
using backend.Services.ProductImage;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController(
    ProductService productService,
    ProductImageService productImageService,
    ILogger<ProductController> logger)
    : ControllerBase
{
    private readonly ProductService _productService = productService;
    private readonly ProductImageService _productImageService = productImageService;
    private readonly ILogger<ProductController> _logger = logger;

    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct([FromBody] AddProductDto addProductDto)
    {
        _logger.LogInformation("Adding product {@ProductName}", addProductDto.ProductName);

        if (!AddProductDtoValidator.ValidateAddProductDto(addProductDto).isValid)
        {
            return BadRequest(AddProductDtoValidator.ValidateAddProductDto(addProductDto).result);
        }

        try
        {
            var response = await _productService.AddProductAsync(addProductDto);
            _logger.LogInformation("Successfully Added Product {@ProductName}", addProductDto.ProductName);
            return Ok(response);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Faield to add product {@ProductName}", addProductDto.ProductName);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error occurred while adding product.");
        }
    }

    [HttpPost("{productId:guid}/product-image")]
    public async Task<IActionResult> AddProductImage([FromRoute] Guid productId, [FromForm] AddProductImageDto addProductImageDto)
    {
        _logger.LogInformation("Adding product image for product with ID {ProductId}", productId);

        if (!AddProductImageDtoValidator.ValidateAddProductImageDto(addProductImageDto).isValid)
        {
            return BadRequest(AddProductImageDtoValidator.ValidateAddProductImageDto(addProductImageDto).result);
        }

        var isProductExists = await _productService.IsProductExists(productId);

        if (!isProductExists)
        {
            _logger.LogError("Product with ID {ProductId} does not exist", productId);
            return NotFound("Product does not exist so cannot add image.");
        }

        var imageId = Guid.NewGuid();
        string? imagePath = null;

        var (success, imagePathResponse) = await _productImageService.UploadProductImageAsync(imageId, productId, addProductImageDto.Image);
        if (success)
            imagePath = imagePathResponse;
        else
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image.");
        
        try
        {
            var response = await _productImageService.AddProductImageAsync(imageId, productId,
                imagePath, addProductImageDto.IsPrimary);
            _logger.LogInformation("Successfully Added Product Image for {@productId}", productId);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding product image.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving product image to database.");
        }
    }
}