using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.DTOs.Account;
using backend.DTOs.Email;
using backend.Models;
using backend.Options;
using backend.Services.Email;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Account;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IPasswordValidator<ApplicationIdentityUser> _passwordValidator;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthenticationService> _logger;
    private readonly IGoogleAuthService _googleAuthService;
    private readonly DbFactory _dbFactory;
    private readonly JwtConfig _jwtConfig;
    private readonly RefreshTokenConfig _refreshTokenConfig;

    public AuthenticationService(UserManager<ApplicationIdentityUser> userManager, IMapper mapper,
        IEmailService emailService, ILogger<AuthenticationService> logger,
        IPasswordValidator<ApplicationIdentityUser> passwordValidator, DbFactory dbFactory,
        IOptions<JwtConfig> jwtConfigOptions, IOptions<RefreshTokenConfig> refreshTokenConfigOptions, IGoogleAuthService googleAuthService)
    {
        _userManager = userManager;
        _mapper = mapper;
        _emailService = emailService;
        _logger = logger;
        _passwordValidator = passwordValidator;
        _dbFactory = dbFactory;
        _googleAuthService = googleAuthService;
        _jwtConfig = jwtConfigOptions.Value;
        _refreshTokenConfig = refreshTokenConfigOptions.Value;
    }

    private async Task<bool> AddUserToRoleAsync(ApplicationIdentityUser user, string role)
    {
        var result = await _userManager.AddToRoleAsync(user, role);

        if (!result.Succeeded) return false;
        
        _logger.LogInformation("Added user with email: {@email} to role: {@role}", user.Email, role);
        
        return result.Succeeded;
    }

    private async Task<List<Claim>> GetUserPermissionAsync(ApplicationIdentityUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };
        
        var userRoles = await _userManager.GetRolesAsync(user);
        claims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

        return claims;
    }
    

    public async Task<int> LoginUserAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user is null || !(await _userManager.CheckPasswordAsync(user, loginDto.Password)))
        {
            return StatusCodes.Status401Unauthorized; // Wrong credentials
        }

        if (!user.EmailConfirmed)
        {
            return StatusCodes.Status403Forbidden; // Email not confirmed
        }

        return StatusCodes.Status200OK; // Success
    }

    public async Task<ExternalLoginResult> GoogleLoginAsync(GoogleSignInRequest googleSignInRequest)
    {
        // Authenticate with Google, return payload inclueded user information to create account
        var payload = await _googleAuthService.AuthenticateAsync(googleSignInRequest.ExchangeCode);
        
        if (payload is null) return new ExternalLoginResult(false, ""); // Authenticate failed
        
        var user = await _userManager.FindByEmailAsync(payload.Email);
        
        await using var transaction = await _dbFactory.DbContext.Database.BeginTransactionAsync();
        
        try
        {
            // If user not found, create new user
            if (user is null)
            {
                var newUser = new ApplicationIdentityUser();
                newUser.Email = payload.Email;
                newUser.UserName = payload.FamilyName + payload.Name;
                newUser.EmailConfirmed = true;
            
                var isCreated = await _userManager.CreateAsync(newUser);

                if (!isCreated.Succeeded) return new ExternalLoginResult(false, ""); // Create user failed
                
                var isAddRoleSuccess = await AddUserToRoleAsync(newUser, Roles.User);
                
                if (!isAddRoleSuccess)
                {
                    // Rollback transaction if failed to add role
                    await transaction.RollbackAsync();
                    return new ExternalLoginResult(false, "");
                }
                
                await transaction.CommitAsync();
                _logger.LogInformation("Created user with email: {@email}", newUser.Email);
                return new ExternalLoginResult(true, newUser.Email); // Create user success
            }
        
            return new ExternalLoginResult(true, user.Email); // User already exists
        }
        catch (Exception exception)
        {
            _logger.LogError("Error while Google login: {@error}", exception.Message);
            await transaction.RollbackAsync();
            return new ExternalLoginResult(false, "");
        }
    }

    public async Task<ExternalLoginResult> FacebookLoginAsync(FacebookSignInRequest facebookSignInRequest)
    {
        var user = await _userManager.FindByEmailAsync(facebookSignInRequest.Email);
        
        await using var transaction = await _dbFactory.DbContext.Database.BeginTransactionAsync();
        
        try
        {
            // If user not found, create new user
            if (user is null)
            {
                var newUser = new ApplicationIdentityUser();
                newUser.Email = facebookSignInRequest.Email;
                newUser.UserName = facebookSignInRequest.Name;
                newUser.EmailConfirmed = true;
            
                var isCreated = await _userManager.CreateAsync(newUser);

                if (!isCreated.Succeeded) return new ExternalLoginResult(false, ""); // Create user failed
                
                var isAddRoleSuccess = await AddUserToRoleAsync(newUser, Roles.User);
                
                if (!isAddRoleSuccess)
                {
                    // Rollback transaction if failed to add role
                    await transaction.RollbackAsync();
                    return new ExternalLoginResult(false, "");
                }
                
                await transaction.CommitAsync();
                _logger.LogInformation("Created user with email: {@email}", newUser.Email);
                return new ExternalLoginResult(true, newUser.Email); // Create user success
            }
        
            return new ExternalLoginResult(true, user.Email); // User already exists
        }
        catch (Exception exception)
        {
            _logger.LogError("Error while Facebook login: {@error}", exception.Message);
            await transaction.RollbackAsync();
            return new ExternalLoginResult(false, "");
        }
    }

    public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
    {
        await using var transaction = await _dbFactory.DbContext.Database.BeginTransactionAsync();

        try
        {
            var newUser = _mapper.Map<ApplicationIdentityUser>(registerDto);
            newUser.UserName = registerDto.Ho + registerDto.Ten;
            newUser.EmailConfirmed = false;

            var isCreated = await _userManager.CreateAsync(newUser, registerDto.Password);
            _logger.LogInformation("Created user with email: {@email}", newUser.Email);

            if (!isCreated.Succeeded) return false;

            var isAddRoleSuccess = await AddUserToRoleAsync(newUser, Roles.User);

            if (!isAddRoleSuccess)
            {
                // Rollback transaction if failed to add role
                await transaction.RollbackAsync();
                return false;
            }

            var confirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            // Mã hóa token
            var tokenGeneratedBytes = Encoding.UTF8.GetBytes(confirmToken);
            var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

            var confirmationBody = $"""
                                        <h1>Xin chào {registerDto.Ho} {registerDto.Ten},</h1>
                                        <p>Cảm ơn bạn đã đăng ký tại Dola Pharmacy. Vui lòng nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
                                        <a href='https://localhost:7031/api/account/confirm-email?token={codeEncoded}&email={newUser.Email}'>Xác nhận Email</a>
                                        <p>Nếu bạn không yêu cầu email này, vui lòng bỏ qua.</p>
                                        <p>Trân trọng,</p>
                                        <p>Dola Pharmacy</p>
                                    """;

            var mailData = new MailDataBuilder()
                .WithReceiverName(registerDto.Ho + registerDto.Ten)
                .WithReceiverEmail(registerDto.Email)
                .WithTitle("Xác nhận tài khoản Dola Pharmacy")
                .WithBody(confirmationBody)
                .Build();

            await _emailService.SendEmail(mailData);

            await transaction.CommitAsync();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError("Error registering user: {@error}", ex.Message);
            await transaction.RollbackAsync();
            return false;
        }
    }

    public async Task<bool> LogoutAsync(HttpContext httpContext)
    {
        var refreshToken = httpContext.Request.Cookies[Cookies.RefreshToken];
        
        // Nếu không có refreshToken thì không thể logout
        if (string.IsNullOrWhiteSpace(refreshToken)) return false;
        
        var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshToken == refreshToken);
        
        // Nếu không tìm thấy user thì không thể logout
        if (user is null) return false;

        user.RefreshToken = null;
        user.ExpiredTime = null;
        user.CreatedTime = null;
        
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded) return false;
        
        httpContext.Response.Cookies.Delete(Cookies.RefreshToken, CookieOptionsSetup());
        
        return true;
    } 

    public async Task<bool> ConfirmEmailAsync(string token, string email)
    {
        // Giải mã token
        var codeDecodedBytes = WebEncoders.Base64UrlDecode(token);
        var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
        // Tìm xem người dùng đó có tồn tại trong database không
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null) return false;
        // Xác thực email với token gửi đến
        var confirmResult = await _userManager.ConfirmEmailAsync(user, codeDecoded);

        // Todo: thêm logging
        return confirmResult.Succeeded;
    }

    public async Task<bool> ForgotPasswordAsync(ForgotPasswordDto forgotPasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);

        if (user is null || !user.EmailConfirmed)
        {
            _logger.LogWarning("User not found or email not confirmed.");
            return false; // User not found or email not confirmed
        }

        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        // Mã hóa token
        var tokenGeneratedBytes = Encoding.UTF8.GetBytes(resetToken);
        var codeEncoded = WebEncoders.Base64UrlEncode(tokenGeneratedBytes);

        var callbackUrl = $"http://localhost:5173/account/reset-password/{user.Email}/{codeEncoded}";

        var emailMessage = $"""
                                <h1>Xin chào {user.UserName},</h1>
                                <p>Anh/chị đã yêu cầu đổi mật khẩu tại Dola Pharmacy.</p>
                                <p>Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé.</p>
                                <a href='{callbackUrl}' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;'>Đặt lại mật khẩu</a>
                                <p>Nếu Anh/chị không yêu cầu email này, vui lòng bỏ qua.</p>
                                <p>Trân trọng,</p>
                                <p>Dola Pharmacy</p>
                            """;

        var mailData = new MailDataBuilder()
            .WithReceiverName(user.UserName!)
            .WithReceiverEmail(user.Email!)
            .WithTitle("Đặt lại mật khẩu Dola Pharmacy")
            .WithBody(emailMessage)
            .Build();

        await _emailService.SendEmail(mailData);

        return true;
    }

    public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);

        if (user is null) return false; // User not found

        var passwordValidationResult =
            await _passwordValidator.ValidateAsync(_userManager, user, resetPasswordDto.Password);

        // Reset password is identical to the old password
        if (!passwordValidationResult.Succeeded)
        {
            foreach (var error in passwordValidationResult.Errors)
            {
                _logger.LogError("Error resetting password: {@error}", error);
            }

            return false;
        }

        // Giải mã token
        var codeDecodedBytes = WebEncoders.Base64UrlDecode(resetPasswordDto.Token);
        var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);

        var result = await _userManager.ResetPasswordAsync(user, codeDecoded, resetPasswordDto.Password);

        if (result.Succeeded)
        {
            _logger.LogInformation("Successfully reset password for user with email: {@email}", resetPasswordDto.Email);
            return true;
        }

        // Log errors if something wrong with reset password async
        foreach (var error in result.Errors)
        {
            _logger.LogError("Error resetting password: {@error}", error);
        }

        return false;
    }

    public async Task<string?> RefreshAccessTokenAsync(string refreshToken)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshToken == refreshToken);

        if (user is null || user.ExpiredTime < DateTime.UtcNow) return null;

        var newAccessToken = await GenerateJwtStringAsync(user.Email!);

        return newAccessToken;
    }

    public async Task<string> GenerateJwtStringAsync(string userEmail)
    {
        var user = await _userManager.FindByEmailAsync(userEmail);
        
        if (user is null) return string.Empty;
        
        var claims = await GetUserPermissionAsync(user!);
        
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Key));
        
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
        
        var securityTokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = _jwtConfig.Issuer,
            Audience = _jwtConfig.Audience,
            Expires = DateTime.Now.AddMinutes(_jwtConfig.ExpiresMin),
            SigningCredentials = signingCredentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(securityTokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Created = DateTime.Now,
            Expires = DateTime.Now.AddDays(_refreshTokenConfig.ExpiresDay)
        };

        return refreshToken;
    }
    
    /// <summary>
    /// Save refresh token to database
    /// </summary>
    public async Task<bool> SaveRefreshTokenAsync(string userEmail, RefreshToken refreshToken)
    {
        var user = await _userManager.FindByEmailAsync(userEmail);

        if (user is null) return false;
        
        user.RefreshToken = refreshToken.Token;
        user.CreatedTime = refreshToken.Created.ToUniversalTime();
        user.ExpiredTime = refreshToken.Expires.ToUniversalTime();
        
        var result = await _userManager.UpdateAsync(user);
        
        return result.Succeeded;
    }
    
    /// <summary>
    /// Write refresh token to cookie
    /// </summary>
    public void WriteRefreshTokenCookie(RefreshToken refreshToken, HttpContext httpContext)
    {
        var cookieOptions = CookieOptionsSetup();

        httpContext.Response.Cookies.Append(Cookies.RefreshToken, refreshToken.Token, cookieOptions);
    }

    private CookieOptions CookieOptionsSetup()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.Now.AddDays(_refreshTokenConfig.ExpiresDay),
            Secure = true,
            SameSite = SameSiteMode.None
        };
        return cookieOptions;
    }
}