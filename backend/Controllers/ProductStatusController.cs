using backend.DTOs.ProductStatus;
using backend.Services.ProductStatus;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductStatusController(ProductStatusService productStatusService, ILogger<ProductStatusController> logger)
    : ControllerBase
{
    private readonly ProductStatusService _productStatusService = productStatusService;
    private readonly ILogger<ProductStatusController> _logger = logger;
    
    [HttpPost("add-product-status")]
    public async Task<IActionResult> AddStatus([FromBody] AddProductStatusDto addProductStatusDto)
    {
        _logger.LogInformation("Adding status with name: {@name}", addProductStatusDto.StatusName);

        if (!AddProductStatusValidator.ValidateAddProductStatusDto(addProductStatusDto).isValid)
        {
            return BadRequest(AddProductStatusValidator.ValidateAddProductStatusDto(addProductStatusDto).result);
        }
        
        var responseProductStatusDto = await _productStatusService.AddProductStatusAsync(addProductStatusDto.StatusName);
        _logger.LogInformation("Status added successfully with name: {@name}", addProductStatusDto.StatusName);
        return Ok(responseProductStatusDto);
    }
}