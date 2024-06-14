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
    
    public AccountController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
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
        return Ok();
    }
}