namespace backend.DTOs.Cart;

public record AddCartDto(Guid ProductId, int Quantity);