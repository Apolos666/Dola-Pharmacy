using backend.Options;
using backend.Utilities.TypeSafe;
using Microsoft.AspNetCore.Identity;
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

    public static async Task<IApplicationBuilder> SeedDataAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        
        var adminRole = new IdentityRole(Roles.Admin);
        var userRole = new IdentityRole(Roles.User);

        await roleManager.CreateAsync(adminRole);
        await roleManager.CreateAsync(userRole);

        return app;
    }
}