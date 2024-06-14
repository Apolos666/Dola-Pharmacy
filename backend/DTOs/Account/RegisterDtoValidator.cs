using System.Text.RegularExpressions;
using FluentValidation;

namespace backend.DTOs.Account;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator()
    {
        RuleFor(x => x.Ho)
            .NotEmpty().WithMessage("Họ là bắt buộc");

        RuleFor(x => x.Ten)
            .NotEmpty().WithMessage("Tên là bắt buộc");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email là bắt buộc")
            .EmailAddress().WithMessage("Email không hợp lệ");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Số điện thoại là bắt buộc")
            .Matches(new Regex(@"(84|0[3|5|7|8|9])+([0-9]{8})\b")).WithMessage("Số điện thoại không hợp lệ");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Mật khẩu là bắt buộc")
            .MinimumLength(8).WithMessage("Mật khẩu phải có ít nhất 8 ký tự")
            .Matches(new Regex(@"[a-z]")).WithMessage("Mật khẩu phải chứa ít nhất 1 chữ cái thường")
            .Matches(new Regex(@"[A-Z]")).WithMessage("Mật khẩu phải chứa ít nhất 1 chữ cái hoa")
            .Matches(new Regex(@"\d")).WithMessage("Mật khẩu phải chứa ít nhất 1 số")
            .Matches(new Regex(@"[!@#$%^&*(),.?\"":{}|<>]")).WithMessage("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");
    }
    
    public static (bool isValid, string result) ValidateRegisterDto(RegisterDto registerDto)
    {
        var validator = new RegisterDtoValidator();
        var result = validator.Validate(registerDto);
        return (result.IsValid, result.ToString());
    }
}