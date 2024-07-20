namespace backend.DTOs.Order;

public record AddOrderDto
{
    public List<CartItemDto> CartItemsDto { get; init; } = null!;
    public string Email { get; init; } = null!;
    public string FullName { get; init; } = null!;
    public string PhoneNumber { get; init; } = null!;
    public string Address { get; init; } = null!;
    public string Province { get; init; } = null!;
    public string District { get; init; } = null!;
    public string Ward { get; init; } = null!;
    public string? Note { get; init; } = null!;
    public Guid ShippingMethodId { get; init; }
    public Guid PaymentMethodId { get; init; }
    public Guid? CouponId { get; init; }
    public DateTime OrderDate { get; init; } = DateTime.Now.ToUniversalTime();
    public TimeSpan DeliveryTime { get; set; }
};

public record CartItemDto(Guid ProductId, int Quantity);