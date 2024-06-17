namespace backend.DTOs.Email;

public class MailDataBuilder
{
    private string _receiverEmail = string.Empty;
    private string _receiverName = string.Empty;
    private string _title = string.Empty;
    private string _body = string.Empty;
    
    public MailDataBuilder WithReceiverEmail(string receiverEmail)
    {
        _receiverEmail = receiverEmail;
        return this;
    }

    public MailDataBuilder WithReceiverName(string receiverName)
    {
        _receiverName = receiverName;
        return this;
    }

    public MailDataBuilder WithTitle(string title)
    {
        _title = title;
        return this;
    }

    public MailDataBuilder WithBody(string body)
    {
        _body = body;
        return this;
    }
    
    public MailData Build()
    {
        return new MailData(_receiverEmail, _receiverName, _title, _body);
    }
}