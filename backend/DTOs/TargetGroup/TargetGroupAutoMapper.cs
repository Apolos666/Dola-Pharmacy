using AutoMapper;

namespace backend.DTOs.TargetGroup;

public class TargetGroupAutoMapper : Profile
{
    public TargetGroupAutoMapper()
    {
        CreateMap<Models.TargetGroup, ResponseTargetGroupDto>();
    }
}