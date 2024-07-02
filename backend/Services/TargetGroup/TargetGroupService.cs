using AutoMapper;
using backend.DTOs.TargetGroup;
using backend.Repositories.TargetGroup;
using backend.UnitOfWork;

namespace backend.Services.TargetGroup;

public class TargetGroupService(IUnitOfWork unitOfWork, ITargetGroupRepository targetGroupRepository, IMapper mapper)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ITargetGroupRepository _targetGroupRepository = targetGroupRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<ResponseTargetGroupDto> AddTargetGroup(string groupName)
    {
        var targetGroup = await _targetGroupRepository.AddTargetGroupAsync(groupName);
        var saved = await _unitOfWork.CommitAsync();

        if (saved <= 0)
            throw new Exception($"Cannot save {groupName} to database");

        var responseTargetGroupDto = _mapper.Map<ResponseTargetGroupDto>(targetGroup);
        return responseTargetGroupDto;
    }
    
    public async Task<List<ResponseTargetGroupDto>> GetTargetGroups()
    {
        var targetGroups = await _targetGroupRepository.GetAlls();
        var responseTargetGroupDto = _mapper.Map<List<ResponseTargetGroupDto>>(targetGroups);
        return responseTargetGroupDto;
    }
}