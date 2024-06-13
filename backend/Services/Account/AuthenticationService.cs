using AutoMapper;
using backend.DTOs.Account;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.Account;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IMapper _mapper;
    
    public AuthenticationService(UserManager<ApplicationIdentityUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }
    
    public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
    {
        var user = _mapper.Map<ApplicationIdentityUser>(registerDto);
        return true;
    }
}