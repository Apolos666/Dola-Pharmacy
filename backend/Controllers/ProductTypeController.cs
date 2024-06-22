using backend.DTOs.ProductType;
using backend.Services.ProductType;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductTypeController(ProductTypeService productTypeService, ILogger<ProductTypeController> logger) : ControllerBase
{
    private readonly ProductTypeService _productTypeService = productTypeService;
    private readonly ILogger<ProductTypeController> _logger = logger;

    [HttpPost("add-product-type")]
    public async Task<IActionResult> AddProductType([FromForm] AddProductTypeDto productTypeDto)
    {
        _logger.LogInformation("Adding product type {@ProductTypeName}", productTypeDto.TypeName);

        if (!AddProductTypeDtoValidator.ValidateAddProductTypeDto(productTypeDto).isValid)
        {
            return BadRequest(AddProductTypeDtoValidator.ValidateAddProductTypeDto(productTypeDto).result);
        }

        var productTypeId = Guid.NewGuid();

        var (success, imagePath) = await _productTypeService.UploadProductTypeImageAsync(productTypeId, productTypeDto.TypeName ,productTypeDto.Image);
        
        if (!success)
            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image.");

        try
        {
            var response = await _productTypeService.AddProductTypeAsync(productTypeId, productTypeDto.TypeName,
                imagePath, productTypeDto.ParentId);
            _logger.LogInformation("Successfully Added Product Type {@ProductTypeName}", productTypeDto.TypeName);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding product type.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving product type to database.");
        }
    }
}