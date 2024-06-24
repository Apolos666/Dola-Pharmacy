using FluentValidation;

namespace backend.DTOs.ProductImage;

public class AddProductImageDtoValidator : AbstractValidator<AddProductImageDto>
{
    public AddProductImageDtoValidator()
    {
        RuleFor(x => x.Image)
            .NotNull().WithMessage("Image is required.");
    }
    
    public static (bool isValid, string result) ValidateAddProductImageDto(AddProductImageDto addProductImageDtoDto)
    {
        var validator = new AddProductImageDtoValidator();
        var result = validator.Validate(addProductImageDtoDto);
        return (result.IsValid, result.ToString());
    }
}