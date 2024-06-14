using backend.DTOs.Email;
using backend.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace backend.Services.Email;

public class MailKitEmailService : IEmailService
{
    private readonly MailSettings _mailSettings;
    
    public MailKitEmailService(IOptions<MailSettings> mailSettingsOptions)
    {
        _mailSettings = mailSettingsOptions.Value;
    }
    
    public async Task<bool> SendEmail(MailData mailData)
    {
        try
        {
            using var emailMessage = new MimeMessage();
            // Tạo địa chỉ mail người gửi & Add địa chỉ mail người gửi vào minemesage
            var emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
            emailMessage.From.Add(emailFrom);
            // Tạo địa chỉ mail người nhận & Add địa chỉ mail người nhận vào minemesage
            var emailTo = new MailboxAddress(mailData.ReceiverName, mailData.ReceiverEmail);
            emailMessage.To.Add(emailTo);
            // Gán tiêu đề cho email
            emailMessage.Subject = mailData.Title;
            // Tạo nội dung cho mail
            var emailBodyBuilder = new BodyBuilder
            {
                HtmlBody = mailData.Body
            };
            // Gán nội dung cho email
            emailMessage.Body = emailBodyBuilder.ToMessageBody();

            using var mailKitClient = new SmtpClient();
            await mailKitClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, SecureSocketOptions.StartTls);
            await mailKitClient.AuthenticateAsync(_mailSettings.SenderEmail, _mailSettings.Password);
            var result = await mailKitClient.SendAsync(emailMessage);
            await mailKitClient.DisconnectAsync(true);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}