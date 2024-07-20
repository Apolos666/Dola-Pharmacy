using System.Security.Claims;
using backend.DTOs.Order;
using backend.Services.Stripe;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = Roles.User)]
public class OrderController(IStripeService stripeService) : ControllerBase
{
    private readonly IStripeService _stripeService = stripeService;

    [HttpPost("create-order")]
    public async Task<IActionResult> CreateOrder([FromBody] AddOrderDto addOrderDto)
    {
        var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (userId is null)
            return BadRequest("Failed to add product to cart.");
        
        try
        {
            var sessionId = await _stripeService.CreateSessionAsync(addOrderDto, userId);
            return Ok(sessionId);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error occurred while adding order.");
        }
    }

    [HttpPost("fullfilment-order")]
    public async Task<IActionResult> FullilmentOrder()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                "whsec_ce88cf3fba8b47579449beae696c757180f5ec366e90dd355bb34d029dec06e6");

            if (stripeEvent.Type is Events.CheckoutSessionCompleted or Events.CheckoutSessionAsyncPaymentSucceeded)
            {
                var session = stripeEvent.Data.Object as Session;
                await _stripeService.FullfilCheckout(session!.Id);
            }

            return Ok("Success");
        }
        catch (Exception exception)
        {
            return BadRequest("Webhook Error");
        }
    }
}