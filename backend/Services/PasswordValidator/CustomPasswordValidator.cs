using Microsoft.AspNetCore.Identity;

namespace backend.Services.PasswordValidator;

public class CustomPasswordValidator<TUser> : IPasswordValidator<TUser> where TUser : IdentityUser
{
    private readonly IPasswordHasher<TUser> _passwordHasher;

    public CustomPasswordValidator(IPasswordHasher<TUser> passwordHasher)
    {
        _passwordHasher = passwordHasher;
    }

    public async Task<IdentityResult> ValidateAsync(UserManager<TUser> manager, TUser user, string? newPassword)
    {
        var oldPasswordHash = user.PasswordHash;
        
        // If the user doesn't have an old password, we can assume this is a new user
        // and skip the check for the new password being the same as the old password.
        if (oldPasswordHash == null)
        {
            return IdentityResult.Success;
        }
        
        var passwordVerificationResult =
            _passwordHasher.VerifyHashedPassword(user, oldPasswordHash!, newPassword!);

        if (passwordVerificationResult == PasswordVerificationResult.Success)
        {
            return IdentityResult.Failed(new IdentityError
                { Description = "New password cannot be the same as the old password." });
        }

        return IdentityResult.Success;
    }
}