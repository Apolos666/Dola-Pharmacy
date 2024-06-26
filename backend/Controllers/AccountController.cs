using backend.DTOs.Account;
using backend.Models;
using backend.Services.Account;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController(IAuthenticationService authenticationService, ILogger<AccountController> logger)
    : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        logger.LogInformation("Logging in user with email: {@email}", loginDto.Email);

        if (!LoginDtoValidator.ValidateLoginDto(loginDto).isValid)
        {
            return BadRequest(LoginDtoValidator.ValidateLoginDto(loginDto).result);
        }

        var result = await authenticationService.LoginUserAsync(loginDto);

        switch (result)
        {
            case StatusCodes.Status401Unauthorized:
                return Unauthorized("Invalid credentials");
            case StatusCodes.Status403Forbidden:
                return StatusCode(StatusCodes.Status403Forbidden, "Email not confirmed");
            default:
                // Generate JWT token
                var accessToken = await authenticationService.GenerateJwtStringAsync(loginDto.Email);
                if (string.IsNullOrWhiteSpace(accessToken))
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "Something went wrong while generating access token");

                // Generate refresh token
                var refreshToken = authenticationService.GenerateRefreshToken();

                // Save refresh token to database
                var saveRefreshTokenResult =
                    await authenticationService.SaveRefreshTokenAsync(loginDto.Email, refreshToken);
                if (!saveRefreshTokenResult)
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        "Something went wrong while saving refresh token");

                // Write refresh token to cookie
                authenticationService.WriteRefreshTokenCookie(refreshToken, HttpContext);

                var loginResponseDto = new LoginResponseDto(accessToken);
                return Ok(loginResponseDto);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        logger.LogInformation("Registering user with email: {@email}", registerDto.Email);

        if (!RegisterDtoValidator.ValidateRegisterDto(registerDto).isValid)
        {
            return BadRequest(RegisterDtoValidator.ValidateRegisterDto(registerDto).result);
        }

        var result = await authenticationService.RegisterUserAsync(registerDto);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var result = await authenticationService.LogoutAsync(HttpContext);

        if (!result)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong while logging out");
        }

        return Ok("Logged out successfully.");
    }

    [HttpPost("google-sign-in")]
    public async Task<IActionResult> GoogleSignIn([FromBody] GoogleSignInRequest googleSignInRequest)
    {
        logger.LogInformation("Google sign in request with exchange code: {@exchangeCode}",
            googleSignInRequest.ExchangeCode);
        
        var googleLoginResult = await authenticationService.GoogleLoginAsync(googleSignInRequest);
        
        if (!googleLoginResult.Success) return Unauthorized("Invalid Google login request");
        
        // Generate JWT token
        var accessToken = await authenticationService.GenerateJwtStringAsync(googleLoginResult.Email!);
        if (string.IsNullOrWhiteSpace(accessToken))
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Something went wrong while generating access token");

        // Generate refresh token
        var refreshToken = authenticationService.GenerateRefreshToken();

        // Save refresh token to database
        var saveRefreshTokenResult =
            await authenticationService.SaveRefreshTokenAsync(googleLoginResult.Email!, refreshToken);
        if (!saveRefreshTokenResult)
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Something went wrong while saving refresh token");

        // Write refresh token to cookie
        authenticationService.WriteRefreshTokenCookie(refreshToken, HttpContext);

        var loginResponseDto = new LoginResponseDto(accessToken);
        return Ok(loginResponseDto);
    }
    
    [HttpPost("facebook-sign-in")]
    public async Task<IActionResult> FacebookSignIn([FromBody] FacebookSignInRequest facebookSignInRequest)
    {
        logger.LogInformation("Facebook sign in request with payload: {@payload}",
            facebookSignInRequest);
        
        var facebookLoginResult = await authenticationService.FacebookLoginAsync(facebookSignInRequest);
        
        if (!facebookLoginResult.Success) return Unauthorized("Invalid Facebook login request");
        
        // Generate JWT token
        var accessToken = await authenticationService.GenerateJwtStringAsync(facebookLoginResult.Email!);
        if (string.IsNullOrWhiteSpace(accessToken))
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Something went wrong while generating access token");

        // Generate refresh token
        var refreshToken = authenticationService.GenerateRefreshToken();

        // Save refresh token to database
        var saveRefreshTokenResult =
            await authenticationService.SaveRefreshTokenAsync(facebookLoginResult.Email!, refreshToken);
        if (!saveRefreshTokenResult)
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Something went wrong while saving refresh token");

        // Write refresh token to cookie
        authenticationService.WriteRefreshTokenCookie(refreshToken, HttpContext);

        var loginResponseDto = new LoginResponseDto(accessToken);
        return Ok(loginResponseDto);
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies[Cookies.RefreshToken];

        if (string.IsNullOrWhiteSpace(refreshToken)) return Unauthorized("No refresh token found in cookies");

        var newAccessToken = await authenticationService.RefreshAccessTokenAsync(refreshToken);

        if (string.IsNullOrWhiteSpace(newAccessToken)) return Unauthorized("Unable to refresh access token");

        return Ok(new AccessTokenResponse(newAccessToken));
    }

    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string token, [FromQuery] string email)
    {
        logger.LogInformation("Confirming email for user with email: {@email}", email);

        var confirmResult = await authenticationService.ConfirmEmailAsync(token, email);

        if (!confirmResult)
        {
            return BadRequest("Invalid Email Confirmation Request.");
        }

        logger.LogInformation("Successfully confirmed email for user with email: {@email}", email);
        return Ok("Verified Email Successfully.");
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        logger.LogInformation("Forgot password for user with email: {@email}", forgotPasswordDto.Email);

        if (!ForgotPasswordDtoValidator.ValidateForgotPasswordDto(forgotPasswordDto).isValid)
        {
            return BadRequest(ForgotPasswordDtoValidator.ValidateForgotPasswordDto(forgotPasswordDto).result);
        }

        var result = await authenticationService.ForgotPasswordAsync(forgotPasswordDto);

        if (!result)
        {
            return BadRequest("Invalid Request.");
        }

        logger.LogInformation("Successfully sent forgot password email for user with email: {@email}",
            forgotPasswordDto.Email);
        return Ok("Forgot Password Email Sent Successfully.");
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        logger.LogInformation("Resetting password for user with email: {@email}", resetPasswordDto.Email);

        if (!ResetPasswordValidator.ValidateResetPasswordDto(resetPasswordDto).isValid)
        {
            return BadRequest(ResetPasswordValidator.ValidateResetPasswordDto(resetPasswordDto).result);
        }

        var result = await authenticationService.ResetPasswordAsync(resetPasswordDto);

        if (!result)
        {
            return BadRequest("Something went wrong while resetting password");
        }

        return Ok("Password reset successfully.");
    }
}