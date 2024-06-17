using backend.DTOs.Email;

namespace backend.Services.Email;

public interface IEmailService
{
    Task<bool> SendEmail(MailData mailData);
}