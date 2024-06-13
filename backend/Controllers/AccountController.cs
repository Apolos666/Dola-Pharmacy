using backend.DTOs.Account;
using backend.Services.Account;
using Microsoft.AspNetCore.Mvc;

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
        return StatusCode(409);
        var result = await _authenticationService.RegisterUserAsync(registerDto);
        if (result)
        {
            return Ok();
        }
        return BadRequest();
    }
}