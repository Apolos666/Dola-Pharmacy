using AutoMapper;

namespace backend.DTOs.ProductImage;

public class ProductImageAutoMapper : Profile
{
    public ProductImageAutoMapper()
    {
        CreateMap<Models.ProductImage, ResponseProductImageDto>();
    }
}