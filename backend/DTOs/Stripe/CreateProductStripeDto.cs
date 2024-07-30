namespace backend.DTOs.Stripe;

public record CreateProductStripeDto(Guid ProductId ,string Name, string Description, List<string> Images, decimal Price);