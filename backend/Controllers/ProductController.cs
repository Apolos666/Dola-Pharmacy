using backend.DTOs.Product;
using backend.DTOs.ProductImage;
using backend.Services.Product;
using backend.Services.ProductImage;
using backend.Services.ProductTargetGroupService;
using backend.Services.ProductTypeAssociation;
using backend.Services.Stripe;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController(
    ProductService productService,
    ProductImageService productImageService,
    ILogger<ProductController> logger,
    ProductTargetGroupService productTargetGroupService,
    ProductTypeAssociationService productTypeAssociationService,
    IStripeService stripeService)
    : ControllerBase
{
    private readonly ProductService _productService = productService;
    private readonly ProductImageService _productImageService = productImageService;
    private readonly ProductTargetGroupService _productTargetGroupService = productTargetGroupService;
    private readonly ProductTypeAssociationService _productTypeAssociationService = productTypeAssociationService;
    private readonly ILogger<ProductController> _logger = logger;
    private readonly IStripeService _stripeService = stripeService;

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

    [HttpGet("get-products")]
    public async Task<IActionResult> GetProducts([FromQuery] GetProductDto getProductDto, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _productService.GetProductAsync(getProductDto,cancellationToken);
            return Ok(response);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("Request was cancelled");
            return StatusCode(StatusCodes.Status400BadRequest, "Request was cancelled");
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error getting products with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error getting products");
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

        // Todo: Refactor vào cái proudctImageService luôn
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

    [HttpPost("{productId:guid}/product-target-group/{groupId:guid}")]
    public async Task<IActionResult> AddProductTargetGroup([FromRoute] Guid productId, [FromRoute] Guid groupId)
    {
        try
        {
            var response = await _productTargetGroupService.AddProductTargetGroupAsync(productId, groupId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error adding product target group with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product target group");
        }
    }

    [HttpDelete("{productId:guid}/product-target-group/{groupId:guid}")]
    public async Task<IActionResult> DeleteProductTargetGroup([FromRoute] Guid productId, [FromRoute] Guid groupId)
    {
        try
        {
            await _productTargetGroupService.DeleteProductTargetGroupAsync(productId, groupId);
            return NoContent();
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error deleting product target group with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting product target group");
        }
    }

    [HttpPost("{productId:guid}/product-type-association/{productTypeId:guid}")]
    public async Task<IActionResult> AddProductTypeAssociation([FromRoute] Guid productId, [FromRoute] Guid productTypeId)
    {
        try
        {
            var response = await _productTypeAssociationService.AddProductTypeAssociationAsync(productId, productTypeId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error adding product type association with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product type association");
        }
    }

    [HttpDelete("{productId:guid}/product-type-association/{productTypeId:guid}")]
    public async Task<IActionResult> DeleteProductTypeAssociation([FromRoute] Guid productId, [FromRoute] Guid productTypeId)
    {
        try
        {
            await _productTypeAssociationService.DeleteProductTypeAssociationAsync(productId, productTypeId);
            return NoContent();
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Error deleting product type association with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting product type association");
        }
    }

    [HttpPost("upload-products-to-stripe")]
    public async Task<IActionResult> UploadProductsToStripe()
    {
        try
        {
            await _stripeService.UploadProductsToStripe();
            return Ok("Successfully uploaded products to stripe");
        } catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading products to stripe");
        }
    }
}