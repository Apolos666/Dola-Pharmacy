namespace backend.DTOs.Product;

public class GetProductDto
{
    public bool FilterPrice { get; init; } = false;
    public string? FilterPriceValue { get; init; }
    public bool FilterBrand { get; init; } = false;
    public string? FilterBrandValue { get; init; }
    public bool FilterTargetGroup { get; init; } = false;
    public string? FilterTargetGroupValue { get; init; }
    public bool FilterWeight { get; init; } = false;
    public string? FilterWeightValue { get; init; }
    public string? SortColumn { get; init; } 
    public string? SortOrder { get; init; }
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}