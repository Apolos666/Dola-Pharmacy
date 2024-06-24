using FluentValidation;

namespace backend.DTOs.ProductStatus;

public class AddProductStatusValidator : AbstractValidator<AddProductStatusDto>
{
    public AddProductStatusValidator()
    {
        RuleFor(x => x.StatusName)
            .NotEmpty()
            .WithMessage("Status name is required.")
            .Length(3, 25) 
            .WithMessage("Status name must be between 3 and 25 characters.");
    }
    
    public static (bool isValid, string result) ValidateAddProductStatusDto(AddProductStatusDto addProductStatusDto)
    {
        var validator = new AddProductStatusValidator();
        var result = validator.Validate(addProductStatusDto);
        return (result.IsValid, result.ToString());
    }
}