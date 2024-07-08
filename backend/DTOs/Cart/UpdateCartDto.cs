namespace backend.DTOs.Cart;

public record UpdateCartDto(DateTime DeliveryDate, TimeSpan? DeliveryTime);