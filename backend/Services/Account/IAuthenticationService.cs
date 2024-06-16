using backend.DTOs.Account;
using backend.Models;

namespace backend.Services.Account;

public interface IAuthenticationService
{
    Task<int> LoginUserAsync(LoginDto loginDto);
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
    Task<bool> ConfirmEmailAsync(string token, string email);
    Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
    Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
    Task<string> GenerateJwtStringAsync(string userEmail);
    RefreshToken GenerateRefreshToken();
    Task<bool> SaveRefreshTokenAsync(string userEmail, RefreshToken refreshToken);
    void WriteRefreshTokenCookie(RefreshToken refreshToken, HttpContext httpContext);
}