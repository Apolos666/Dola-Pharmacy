using backend.DTOs.Product;
using backend.Services.Product;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController(ProductService productService, ILogger<ProductController> logger)
    : ControllerBase
{
    private readonly ProductService _productService = productService;
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
}