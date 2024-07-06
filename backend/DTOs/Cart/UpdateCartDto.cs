namespace backend.DTOs.Cart;

public record UpdateCartDto(Guid ProductId, int Quantity);