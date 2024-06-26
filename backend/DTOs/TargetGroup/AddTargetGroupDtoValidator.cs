using FluentValidation;

namespace backend.DTOs.TargetGroup;

public class AddTargetGroupDtoValidator : AbstractValidator<AddTargetGroupDto>
{
    private AddTargetGroupDtoValidator()
    {
        RuleFor(x => x.GroupName)
            .NotEmpty()
            .WithMessage("TargetGroup name is required.")
            .Length(2, 100)
            .WithMessage("TargetGroup name must be between 2 and 100 characters.");
    }
    
    public static (bool isValid, string result) ValidateAddTargetGroupDto(AddTargetGroupDto addTargetGroupDto)
    {
        var validator = new AddTargetGroupDtoValidator();
        var result = validator.Validate(addTargetGroupDto);
        return (result.IsValid, result.ToString());
    }
}