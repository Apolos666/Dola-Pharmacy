using FluentValidation;

namespace backend.DTOs.Email;

public class MailDataValidator : AbstractValidator<MailData>
{
    public MailDataValidator()
    {
        RuleFor(x => x.ReceiverEmail)
            .NotEmpty().WithMessage("Receiver Email is required")
            .EmailAddress().WithMessage("Receiver Email is not valid");

        RuleFor(x => x.ReceiverName)
            .NotEmpty().WithMessage("Receiver Name is required");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required");

        RuleFor(x => x.Body)
            .NotEmpty().WithMessage("Body is required");
    }
    
    public static (bool isValid, string result) ValidateMailData(MailData MailData)
    {
        var validator = new MailDataValidator();
        var result = validator.Validate(MailData);
        return (result.IsValid, result.ToString());
    }
}