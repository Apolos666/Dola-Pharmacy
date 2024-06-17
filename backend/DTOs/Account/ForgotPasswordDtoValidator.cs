using FluentValidation;

namespace backend.DTOs.Account;

public class ForgotPasswordDtoValidator : AbstractValidator<ForgotPasswordDto>
{
    public ForgotPasswordDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email là bắt buộc")
            .EmailAddress().WithMessage("Email không hợp lệ");
    }

    public static (bool isValid, string result) ValidateForgotPasswordDto(ForgotPasswordDto forgotPasswordDto)
    {
        var validator = new ForgotPasswordDtoValidator();
        var result = validator.Validate(forgotPasswordDto);
        return (result.IsValid, result.ToString());
    }
}