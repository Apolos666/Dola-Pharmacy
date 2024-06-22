using AutoMapper;
using backend.Models;

namespace backend.DTOs.Account;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterDto, ApplicationIdentityUser>();
    }
}