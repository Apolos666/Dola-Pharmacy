namespace backend.DTOs.Cart;

public record UpdateCartProductDto(Guid ProductId, int Quantity);