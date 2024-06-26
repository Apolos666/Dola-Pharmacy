namespace backend.DTOs.ProductImage;

public record ResponseProductImageDto(Guid ImageId, Guid ProductId, string ImageUrl, bool IsPrimary);