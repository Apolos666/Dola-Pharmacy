using backend.DTOs.Order;
using backend.DTOs.Stripe;
using backend.Services.Stripe;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IStripeService stripeService) : ControllerBase
{
    private readonly IStripeService _stripeService = stripeService;
    
    // [HttpPost("create-session")]
    // public async Task<ActionResult> Create([FromBody] CreateOrderDto createOrderDto)
    // {
    //     var options = new CustomerCreateOptions
    //     {
    //         Email = createOrderDto.Email,
    //         Name = createOrderDto.Name,
    //         Metadata = new Dictionary<string, string>
    //         {
    //             { "ID", Guid.NewGuid().ToString()}
    //         }
    //     };
    //     
    //     var service = new CustomerService();
    //     var customer = await service.CreateAsync(options);
    //     
    //     return Ok(customer);
    // }

    [HttpPost("create-order")]
    public async Task<IActionResult> CreateOrder([FromBody] AddOrderDto addOrderDto)
    {
        try
        {
            List<string> prices = new();
            
            foreach (var cartItemDto in addOrderDto.CartItemsDto)
            {
                var result = await _stripeService.GetProductAsync(new GetProductStripeDto(cartItemDto.ProductId));
                prices.Add(result.Data[0].DefaultPriceId);
            }

            var options = new SessionCreateOptions
            {
                SuccessUrl = "http://localhost:5173/sucess",
                CancelUrl = "http://localhost:5173/cancel",
                LineItems = prices.Select(price => new SessionLineItemOptions
                {
                    Price = price,
                    Quantity = 1
                }).ToList(),
                Mode = "payment",
            };
            
            var service = new SessionService();
            var session = await service.CreateAsync(options);
            
            Response.Headers.Append("Location", session.Url);
            return Ok(session.Id);

        } catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error occurred while adding order.");
        }
    }
}
