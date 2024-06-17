using AutoMapper;
using backend.DTOs.Account;
using backend.Models;

namespace backend.Configurations.AutoMapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterDto, ApplicationIdentityUser>();
    }
}