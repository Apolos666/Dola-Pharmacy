using FluentValidation;

namespace backend.DTOs.Product;

public class AddProductDtoValidator : AbstractValidator<AddProductDto>
{
    public AddProductDtoValidator()
    {
        RuleFor(x => x.ProductName)
            .NotEmpty().WithMessage("ProductName is required.")
            .Length(0, 100).WithMessage("ProductName must be less than or equal to 100 characters.");

        RuleFor(x => x.BrandId)
            .NotEmpty().WithMessage("BrandId is required.");

        RuleFor(x => x.StatusId)
            .NotEmpty().WithMessage("StatusId is required.");

        RuleFor(x => x.Price)
            .NotEmpty().WithMessage("Price is required.")
            .GreaterThanOrEqualTo(0).WithMessage("Price must be greater than or equal to 0.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .Length(0, 1000).WithMessage("Description must be less than or equal to 1000 characters.");

        RuleFor(x => x.BuyingGuide)
            .NotEmpty().WithMessage("BuyingGuide is required.")
            .Length(0, 1000).WithMessage("BuyingGuide must be less than or equal to 1000 characters.");

        RuleFor(x => x.Weight)
            .NotEmpty().WithMessage("Weight is required.")
            .GreaterThanOrEqualTo(0).WithMessage("Weight must be greater than or equal to 0.");
    }

    public static (bool isValid, string result) ValidateAddProductDto(AddProductDto addProductDto)
    {
        var validator = new AddProductDtoValidator();
        var result = validator.Validate(addProductDto);
        return (result.IsValid, result.ToString());
    }
}