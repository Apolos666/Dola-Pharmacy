using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace backend.Services.Account;

public interface IGoogleAuthService
{
    Task<Payload?> AuthenticateAsync(string exchangeCode);
}