﻿using System.Security.Claims;
using backend.DTOs.Order;
using backend.Services.Order;
using backend.Services.Stripe;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IStripeService stripeService, OrderService orderService) : ControllerBase
{
    private readonly IStripeService _stripeService = stripeService;
    private readonly OrderService _orderService = orderService;

    [HttpPost("create-order")]
    [Authorize(Roles = Roles.User)]
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
                await _stripeService.FullfilCheckout(session.Metadata, session.Id);
            }

            return Ok("Success");
        }
        catch (Exception exception)
        {
            return BadRequest("Webhook Error");
        }
    }

    [HttpGet("session/{sessionId}")]
    public async Task<IActionResult> GetSession([FromRoute] string sessionId)
    {
        var service = new SessionService();
        var session = await service.GetAsync(sessionId, new SessionGetOptions
        {
            Expand = ["line_items"]
        });

        if (session is null)
            return NotFound("Session not found.");

        return Ok(session);
    }

    [HttpPost("create-order-pdf")]
    public IActionResult CreateOrderPdf([FromBody] OrderData orderData)
    {
        var pdf = _orderService.CreateOrderPdf(orderData);

        if (pdf == null)
            return BadRequest("Failed to generate PDF.");

        var base64Pdf = Convert.ToBase64String(pdf);

        return Ok(new
        {
            pdfData = base64Pdf,
            contentType = "application/pdf"
        });
    }
}