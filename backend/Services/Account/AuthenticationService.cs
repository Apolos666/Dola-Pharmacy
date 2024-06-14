using AutoMapper;
using backend.DTOs.Account;
using backend.DTOs.Email;
using backend.Models;
using backend.Services.Email;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.Account;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public AuthenticationService(UserManager<ApplicationIdentityUser> userManager, IMapper mapper,
        IEmailService emailService)
    {
        _userManager = userManager;
        _mapper = mapper;
        _emailService = emailService;
    }

    public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
    {
        var newUser = _mapper.Map<ApplicationIdentityUser>(registerDto);
        newUser.UserName = registerDto.Ho + registerDto.Ten;
        newUser.EmailConfirmed = false;

        var isCreated = await _userManager.CreateAsync(newUser, registerDto.Password);

        if (!isCreated.Succeeded) return false;

        var confirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

        var confirmationBody = $"""
                                    <h1>Xin chào {registerDto.Ho} {registerDto.Ten},</h1>
                                    <p>Cảm ơn bạn đã đăng ký tại Dola Pharmacy. Vui lòng nhấp vào liên kết dưới đây để xác nhận địa chỉ email của bạn:</p>
                                    <a href='https://localhost:7031/api/account/confirm-email?token={confirmToken}&email={newUser.Email}'>Xác nhận Email</a>
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

        return true;
    }
}