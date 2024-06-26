namespace backend.DTOs.Product;

public record GetProductDto(string? SortColumn, string? SortOrder, int Page = 1, int PageSize = 10);