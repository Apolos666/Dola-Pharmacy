using backend.DTOs.Stripe;
using Stripe;

namespace backend.Services.Stripe;

public interface IStripeService
{
    Task UploadProductsToStripe();
    Task<global::Stripe.Product> CreateProductAsync(CreateProductStripeDto createProductStripeDto);
    Task<StripeSearchResult<global::Stripe.Product>> GetProductAsync(GetProductStripeDto getProductStripeDto);
}