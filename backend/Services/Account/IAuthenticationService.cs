using backend.DTOs.Account;

namespace backend.Services.Account;

public interface IAuthenticationService
{
    Task<int> LoginUserAsync(LoginDto loginDto);
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
    Task<bool> ConfirmEmailAsync(string token, string email);
    Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
}