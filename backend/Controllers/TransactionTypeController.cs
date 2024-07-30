using backend.DTOs.PaymentMethodDto;
using backend.DTOs.ShippingMethod;
using backend.Services.PaymentMethod;
using backend.Services.ShippingMethod;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionTypeController(ShippingMethodService shippingMethodService, PaymentMethodService paymentMethodService) : ControllerBase
{
    private readonly ShippingMethodService _shippingMethodService = shippingMethodService;
    private readonly PaymentMethodService _paymentMethodService = paymentMethodService;
    
    [HttpPost("add-shipping-method")]
    public async Task<IActionResult> AddShippingMethod(AddShippingMethodDto addShippingMethodDto)
    {
        var shippingMethod = await _shippingMethodService.AddShippingMethodAsync(addShippingMethodDto);
        return Ok(shippingMethod);
    }

    [HttpGet("get-all-shipping-methods")]
    public async Task<IActionResult> GetAllShippingMethods()
    {
        var shippingMethods = await _shippingMethodService.GetAllShippingMethodsAsync();
        return Ok(shippingMethods);
    }
    
    [HttpPost("add-payment-method")]
    public async Task<IActionResult> AddPaymentMethod(AddPaymentMethodDto addPaymentMethodDto)
    {
        var paymentMethod = await _paymentMethodService.AddPaymentMethodAsync(addPaymentMethodDto);
        return Ok(paymentMethod);
    }
    
    [HttpGet("get-all-payment-methods")]
    public async Task<IActionResult> GetAllPaymentMethods()
    {
        var paymentMethods = await _paymentMethodService.GetAllPaymentMethodsAsync();
        return Ok(paymentMethods);
    }
}
