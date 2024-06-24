namespace backend.DTOs.Product;

public record AddProductDto(string ProductName, Guid BrandId, Guid StatusId, decimal Price, string Description, string BuyingGuide, decimal Weight);