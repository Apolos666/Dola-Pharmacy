using System.Text.RegularExpressions;
using FluentValidation;

namespace backend.DTOs.Account;

public class LoginDtoValidator : AbstractValidator<LoginDto>
{
    public LoginDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email là bắt buộc")
            .EmailAddress().WithMessage("Email không hợp lệ");
        
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Mật khẩu là bắt buộc")
            .MinimumLength(8).WithMessage("Mật khẩu phải có ít nhất 8 ký tự")
            .Matches(new Regex(@"[a-z]")).WithMessage("Mật khẩu phải chứa ít nhất 1 chữ cái thường")
            .Matches(new Regex(@"[A-Z]")).WithMessage("Mật khẩu phải chứa ít nhất 1 chữ cái hoa")
            .Matches(new Regex(@"\d")).WithMessage("Mật khẩu phải chứa ít nhất 1 số")
            .Matches(new Regex(@"[!@#$%^&*(),.?\"":{}|<>]")).WithMessage("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");
    }
    
    public static (bool isValid, string result) ValidateLoginDto(LoginDto loginDto)
    {
        var validator = new LoginDtoValidator();
        var result = validator.Validate(loginDto);
        return (result.IsValid, result.ToString());
    }
}