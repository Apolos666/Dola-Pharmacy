namespace backend.DTOs.ProductImage;
public record AddProductImageDto(IFormFile Image, bool IsPrimary = false);