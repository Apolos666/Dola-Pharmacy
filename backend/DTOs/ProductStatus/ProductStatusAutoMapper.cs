using AutoMapper;
using backend.Models;

namespace backend.DTOs.ProductStatus;

public class ProductStatusAutoMapper : Profile
{
    public ProductStatusAutoMapper()
    {
        CreateMap<Status, ResponseProductStatusDto>();
    }
}