using backend.DTOs.Brand;
using backend.Services.Brand;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandController(BrandService brandService, ILogger<BrandController> logger) : ControllerBase
{
    private readonly BrandService _brandService = brandService;
    private readonly ILogger<BrandController> _logger = logger;
    
    [HttpPost("add-brand")]
    public async Task<IActionResult> AddBrand([FromBody] AddBrandDto addBrandDto)
    {
        _logger.LogInformation("Adding brand with name: {@name}", addBrandDto.BrandName);

        if (!AddBrandDtoValidator.ValidateAddTargetGroupDto(addBrandDto).isValid)
        {
            return BadRequest(AddBrandDtoValidator.ValidateAddTargetGroupDto(addBrandDto).result);
        }
        
        var responseBrandDto = await _brandService.AddBrand(addBrandDto.BrandName);
        _logger.LogInformation("Brand added successfully with name: {@name}", addBrandDto.BrandName);
        return Ok(responseBrandDto);
    }
}