using System.Net;
using System.Text;
using AutoMapper;
using backend.DTOs.Account;
using backend.DTOs.Email;
using backend.Models;
using backend.Services.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace backend.Services.Account;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<ApplicationIdentityUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthenticationService> _logger;

    public AuthenticationService(UserManager<ApplicationIdentityUser> userManager, IMapper mapper,
        IEmailService emailService, ILogger<AuthenticationService> logger)
    {
        _userManager = userManager;
        _mapper = mapper;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
    {
        var newUser = _mapper.Map<ApplicationIdentityUser>(registerDto);
        newUser.UserName = registerDto.Ho + registerDto.Ten;
        newUser.EmailConfirmed = false;

        var isCreated = await _userManager.CreateAsync(newUser, registerDto.Password);
        _logger.LogInformation("Created user with email: {@email}", newUser.Email);

        if (!isCreated.Succeeded) return false;

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
}