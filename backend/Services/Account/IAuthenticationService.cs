using backend.DTOs.Account;

namespace backend.Services.Account;

public interface IAuthenticationService
{
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
}