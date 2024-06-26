using backend.DTOs.TargetGroup;
using backend.Services.TargetGroup;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TargetGroupController(TargetGroupService targetGroupService, ILogger<TargetGroupController> logger) : ControllerBase
{
    private readonly TargetGroupService _targetGroupService = targetGroupService;
    private readonly ILogger<TargetGroupController> _logger = logger;
    
    [HttpPost("add-target-group")]
    public async Task<IActionResult> AddTargetGroup([FromBody] AddTargetGroupDto addTargetGroupDto)
    {
        _logger.LogInformation("Adding target group with name: {@name}", addTargetGroupDto.GroupName);
        
        if (!AddTargetGroupDtoValidator.ValidateAddTargetGroupDto(addTargetGroupDto).isValid)
        {
            return BadRequest(AddTargetGroupDtoValidator.ValidateAddTargetGroupDto(addTargetGroupDto).result);
        }
        
        var responseTargetGroupDto = await _targetGroupService.AddTargetGroup(addTargetGroupDto.GroupName);
        _logger.LogInformation("Target group added successfully with name: {@name}", addTargetGroupDto.GroupName);
        return Ok(responseTargetGroupDto);
    }
}