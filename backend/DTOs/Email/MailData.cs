namespace backend.DTOs.Email;

public class MailData(string ReceiverEmail, string ReceiverName, string Title, string Body)
{
    public string ReceiverEmail { get; init; } = ReceiverEmail;
    public string ReceiverName { get; init; } = ReceiverName;
    public string Title { get; init; } = Title;
    public string Body { get; init; } = Body;
}