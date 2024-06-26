using AutoMapper;

namespace backend.DTOs.Brand;

public class BrandAutoMapper : Profile
{
    public BrandAutoMapper()
    {
        CreateMap<Models.Brand, ResponseBrandDto>();
    }
}