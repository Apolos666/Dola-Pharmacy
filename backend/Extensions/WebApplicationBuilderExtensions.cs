using backend.Options;
using Microsoft.Extensions.Options;

namespace backend.Extensions;

public static class WebApplicationBuilderExtensions
{
    public static WebApplication UseConfiguredCors(this WebApplication app)
    {
        var corsConfig = app.Services.GetService<IOptions<CorsConfig>>()?.Value;

        app.UseCors(corsConfig!.PolicyName);

        return app;
    }
}