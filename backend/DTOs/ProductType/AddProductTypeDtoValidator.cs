using FluentValidation;

namespace backend.DTOs.ProductType;

public class AddProductTypeDtoValidator : AbstractValidator<AddProductTypeDto>
{
    public AddProductTypeDtoValidator()
    {
        RuleFor(x => x.TypeName)
            .NotEmpty().WithMessage("TypeName is required.")
            .MaximumLength(100).WithMessage("TypeName must not exceed 100 characters.");
        
        RuleFor(x => x.Image)
            .NotNull().WithMessage("Image is required.");
    }
    
    public static (bool isValid, string result) ValidateAddProductTypeDto(AddProductTypeDto addProductTypeDto)
    {
        var validator = new AddProductTypeDtoValidator();
        var result = validator.Validate(addProductTypeDto);
        return (result.IsValid, result.ToString());
    }
}