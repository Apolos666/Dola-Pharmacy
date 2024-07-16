using Stripe;

namespace backend.Extensions.Stripe;

public static class StripeServiceExtension
{
    private const string StripeApiKeyVariable = "StripeApiKey";
    
    public static IServiceCollection AddStripeService(this IServiceCollection services)
    {
        StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable(StripeApiKeyVariable, EnvironmentVariableTarget.User);

        return services;
    }
}