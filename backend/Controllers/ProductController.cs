using backend.DTOs.Product;
using backend.DTOs.ProductImage;
using backend.Models;
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
    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct([FromBody] AddProductDto addProductDto)
    {
        logger.LogInformation("Adding product {@ProductName}", addProductDto.ProductName);

        if (!AddProductDtoValidator.ValidateAddProductDto(addProductDto).isValid)
        {
            return BadRequest(AddProductDtoValidator.ValidateAddProductDto(addProductDto).result);
        }

        try
        {
            var response = await productService.AddProductAsync(addProductDto);
            logger.LogInformation("Successfully Added Product {@ProductName}", addProductDto.ProductName);
            return Ok(response);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Faield to add product {@ProductName}", addProductDto.ProductName);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error occurred while adding product.");
        }
    }

    [HttpGet("get-products")]
    public async Task<IActionResult> GetProducts([FromQuery] GetProductDto getProductDto, CancellationToken cancellationToken)
    {
        try
        {
            var response = await productService.GetProductAsync(getProductDto,cancellationToken);
            return Ok(response);
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("Request was cancelled");
            return StatusCode(StatusCodes.Status400BadRequest, "Request was cancelled");
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error getting products with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error getting products");
        }
    }
    
    [HttpGet("get-product/{productNameNormalized}")]
    public async Task<IActionResult> GetProductByProductNameNormalized([FromRoute] string productNameNormalized)
    {
        try
        {
            var response = await productService.GetProductByProductNameNormalized(productNameNormalized);
            return Ok(response);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error getting product with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error getting product");
        }
    }

    [HttpPost("{productId:guid}/product-image")]
    public async Task<IActionResult> AddProductImage([FromRoute] Guid productId, [FromForm] AddProductImageDto addProductImageDto)
    {
        logger.LogInformation("Adding product image for product with ID {ProductId}", productId);

        if (!AddProductImageDtoValidator.ValidateAddProductImageDto(addProductImageDto).isValid)
        {
            return BadRequest(AddProductImageDtoValidator.ValidateAddProductImageDto(addProductImageDto).result);
        }

        // Todo: Refactor vào cái proudctImageService luôn
        var isProductExists = await productService.IsProductExists(productId);

        if (!isProductExists)
        {
            logger.LogError("Product with ID {ProductId} does not exist", productId);
            return NotFound("Product does not exist so cannot add image.");
        }

        var imageId = Guid.NewGuid();
        string? imagePath = null;

        var (success, imagePathResponse) = await productImageService.UploadProductImageAsync(imageId, productId, addProductImageDto.Image);
        if (success)
            imagePath = imagePathResponse;
        else
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image.");

        try
        {
            var response = await productImageService.AddProductImageAsync(imageId, productId,
                imagePath, addProductImageDto.IsPrimary);
            logger.LogInformation("Successfully Added Product Image for {@productId}", productId);
            return Ok(response);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error adding product image.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving product image to database.");
        }
    }

    [HttpPost("{productId:guid}/product-target-group/{groupId:guid}")]
    public async Task<IActionResult> AddProductTargetGroup([FromRoute] Guid productId, [FromRoute] Guid groupId)
    {
        try
        {
            var response = await productTargetGroupService.AddProductTargetGroupAsync(productId, groupId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error adding product target group with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product target group");
        }
    }

    [HttpDelete("{productId:guid}/product-target-group/{groupId:guid}")]
    public async Task<IActionResult> DeleteProductTargetGroup([FromRoute] Guid productId, [FromRoute] Guid groupId)
    {
        try
        {
            await productTargetGroupService.DeleteProductTargetGroupAsync(productId, groupId);
            return NoContent();
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error deleting product target group with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting product target group");
        }
    }

    [HttpPost("{productId:guid}/product-type-association/{productTypeId:guid}")]
    public async Task<IActionResult> AddProductTypeAssociation([FromRoute] Guid productId, [FromRoute] Guid productTypeId)
    {
        try
        {
            var response = await productTypeAssociationService.AddProductTypeAssociationAsync(productId, productTypeId);
            return Ok(response);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error adding product type association with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product type association");
        }
    }

    [HttpDelete("{productId:guid}/product-type-association/{productTypeId:guid}")]
    public async Task<IActionResult> DeleteProductTypeAssociation([FromRoute] Guid productId, [FromRoute] Guid productTypeId)
    {
        try
        {
            await productTypeAssociationService.DeleteProductTypeAssociationAsync(productId, productTypeId);
            return NoContent();
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error deleting product type association with exception: {@Exception}", exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting product type association");
        }
    }

    [HttpPost("upload-products-to-stripe")]
    public async Task<IActionResult> UploadProductsToStripe()
    {
        try
        {
            await stripeService.UploadProductsToStripe();
            return Ok("Successfully uploaded products to stripe");
        } catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading products to stripe");
        }
    }
}