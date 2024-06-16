using backend.DTOs.Account;
using backend.Services.Account;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger<AccountController> _logger;
    
    public AccountController(IAuthenticationService authenticationService, ILogger<AccountController> logger)
    {
        _authenticationService = authenticationService;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        _logger.LogInformation("Logging in user with email: {@email}", loginDto.Email);
        
        if (!LoginDtoValidator.ValidateLoginDto(loginDto).isValid)
        {
            return BadRequest(LoginDtoValidator.ValidateLoginDto(loginDto).result);
        }
        
        var result = await _authenticationService.LoginUserAsync(loginDto);

        switch (result)
        {
            case StatusCodes.Status401Unauthorized:
                return Unauthorized("Invalid credentials");
            case StatusCodes.Status403Forbidden:
                return StatusCode(StatusCodes.Status403Forbidden, "Email not confirmed");
            default:
                // Generate JWT token
                var accessToken = await _authenticationService.GenerateJwtStringAsync(loginDto.Email);
                if (string.IsNullOrWhiteSpace(accessToken)) return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong while generating access token");
                
                // Generate refresh token
                var refreshToken = _authenticationService.GenerateRefreshToken();
                
                // Save refresh token to database
                var saveRefreshTokenResult = await _authenticationService.SaveRefreshTokenAsync(loginDto.Email, refreshToken);
                if (!saveRefreshTokenResult) return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong while saving refresh token");
                
                // Write refresh token to cookie
                _authenticationService.WriteRefreshTokenCookie(refreshToken, HttpContext);
                
                var loginResponseDto = new LoginResponseDto(accessToken);
                return Ok(loginResponseDto);
        }
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        _logger.LogInformation("Registering user with email: {@email}", registerDto.Email);
        
        if (!RegisterDtoValidator.ValidateRegisterDto(registerDto).isValid)
        {
            return BadRequest(RegisterDtoValidator.ValidateRegisterDto(registerDto).result);
        }
        
        var result = await _authenticationService.RegisterUserAsync(registerDto);
        
        if (result)
        {
            return Ok();
        }
        
        return BadRequest();
    }

    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string token, [FromQuery] string email)
    {
        _logger.LogInformation("Confirming email for user with email: {@email}", email);
        
        var confirmResult = await _authenticationService.ConfirmEmailAsync(token, email);
        
        if (!confirmResult)
        {
            return BadRequest("Invalid Email Confirmation Request.");
        }
        
        _logger.LogInformation("Successfully confirmed email for user with email: {@email}", email);
        return Ok("Verified Email Successfully.");
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        _logger.LogInformation("Forgot password for user with email: {@email}", forgotPasswordDto.Email);
        
        if (!ForgotPasswordDtoValidator.ValidateForgotPasswordDto(forgotPasswordDto).isValid)
        {
            return BadRequest(ForgotPasswordDtoValidator.ValidateForgotPasswordDto(forgotPasswordDto).result);
        }
        
        var result = await _authenticationService.ForgotPasswordAsync(forgotPasswordDto);
        
        if (!result)
        {
            return BadRequest("Invalid Request.");
        }
        
        _logger.LogInformation("Successfully sent forgot password email for user with email: {@email}", forgotPasswordDto.Email);
        return Ok("Forgot Password Email Sent Successfully.");
    }
    
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        _logger.LogInformation("Resetting password for user with email: {@email}", resetPasswordDto.Email);
        
        if (!ResetPasswordValidator.ValidateResetPasswordDto(resetPasswordDto).isValid)
        {
            return BadRequest(ResetPasswordValidator.ValidateResetPasswordDto(resetPasswordDto).result);
        }
        
        var result = await _authenticationService.ResetPasswordAsync(resetPasswordDto);
        
        if (!result)
        {
            return BadRequest("Something went wrong while resetting password");
        }
        
        return Ok("Password reset successfully.");
    }
}