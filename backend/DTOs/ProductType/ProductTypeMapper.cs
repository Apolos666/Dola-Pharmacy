using AutoMapper;

namespace backend.DTOs.ProductType;

public class ProductTypeMapper : Profile
{
    public ProductTypeMapper()
    {
        CreateMap<Models.ProductType, ResponseProductTypeDto>();
    }
}