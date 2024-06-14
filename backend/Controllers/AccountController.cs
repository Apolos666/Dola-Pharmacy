using backend.DTOs.Account;
using backend.Services.Account;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

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
            _logger.LogInformation("Successfully confirmed email for user with email: {@email}", email);
            return BadRequest("Invalid Email Confirmation Request.");
        }
        
        return Ok("Verified Email Successfully.");
    }
}