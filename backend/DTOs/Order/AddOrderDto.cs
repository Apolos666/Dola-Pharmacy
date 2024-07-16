namespace backend.DTOs.Order;

public record AddOrderDto
{
    public List<CartItemDto> CartItemsDto { get; init; } = null!;
};

public record CartItemDto(Guid CartId, Guid ProductId, int Quantity);