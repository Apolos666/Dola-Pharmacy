public record LineItem
{
    public required string ProductDescription { get; init; }
    public required decimal ProductPrice { get; init; }
    public required int ProductQuantity { get; init; }
}

public record OrderData
{
    public required string Address { get; init; }
    public required string CouponId { get; init; }
    public required string DeliveryTime { get; init; }
    public required string District { get; init; }
    public required string Email { get; init; }
    public required string FullName { get; init; }
    public required string Note { get; init; }
    public required string OrderDate { get; init; }
    public required string PaymentMethodId { get; init; }
    public required string PhoneNumber { get; init; }
    public required string Province { get; init; }
    public required string ShippingMethodId { get; init; }
    public required string UserId { get; init; }
    public required string Ward { get; init; }
    public required List<LineItem> LineItems { get; init; }
    public required decimal ShippingFee { get; init; }
    public required string CurrentSuccessUrl { get; init; }
}