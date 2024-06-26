using AutoMapper;

namespace backend.DTOs.Product;

public class ProductAutoMapper : Profile
{
    public ProductAutoMapper()
    {
        CreateMap<Models.Product, ResponseProductDto>();
    }
}