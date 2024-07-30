using backend.DTOs.Account;
using backend.Models;

namespace backend.Services.Account;

public interface IAuthenticationService
{
    Task<int> LoginUserAsync(LoginDto loginDto);
    Task<ExternalLoginResult> GoogleLoginAsync(GoogleSignInRequest googleSignInRequest);
    Task<ExternalLoginResult> FacebookLoginAsync(FacebookSignInRequest facebookSignInRequest);
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
    Task<bool> LogoutAsync(HttpContext httpContext); // Cần refreshToken ở đây là để đảm bảo phiên người dùng còn hợp lệ
    Task<bool> ConfirmEmailAsync(string token, string email);
    Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto);
    Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
    Task<string?> RefreshAccessTokenAsync(string refreshToken);
    Task<string> GenerateJwtStringAsync(string userEmail);
    RefreshToken GenerateRefreshToken();
    Task<bool> SaveRefreshTokenAsync(string userEmail, RefreshToken refreshToken);
    void WriteRefreshTokenCookie(RefreshToken refreshToken, HttpContext httpContext);
    Task<GetUserDto?> GetMe(string email);
}