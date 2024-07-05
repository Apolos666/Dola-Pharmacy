using AutoMapper;

namespace backend.DTOs.ProductType;

public class ProductTypeMapper : Profile
{
    public ProductTypeMapper()
    {
        CreateMap<Models.ProductType, ResponseProductTypeDto>();
        
        CreateMap<Models.ProductType, ResponseProductTypeWithChildrenDto>()
            .ForMember(dest => dest.Children, opt => opt.MapFrom(src => src.Children));
    }
}