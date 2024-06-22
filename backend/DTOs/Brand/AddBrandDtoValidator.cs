using FluentValidation;

namespace backend.DTOs.Brand;

public class AddBrandDtoValidator : AbstractValidator<AddBrandDto>
{
    private AddBrandDtoValidator()
    {
        RuleFor(x => x.BrandName)
            .NotEmpty()
            .WithMessage("Brand name is required.")
            .Length(3, 50) // Brand name must be between 3 and 50 characters.
            .WithMessage("Brand name must be between 3 and 50 characters.");
    }
    
    public static (bool isValid, string result) ValidateLoginDto(AddBrandDto addBrandDto)
    {
        var validator = new AddBrandDtoValidator();
        var result = validator.Validate(addBrandDto);
        return (result.IsValid, result.ToString());
    }
}