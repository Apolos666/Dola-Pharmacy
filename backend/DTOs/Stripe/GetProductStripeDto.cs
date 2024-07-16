namespace backend.DTOs.Stripe;

public record GetProductStripeDto(Guid ProductId, bool Active = true);