using backend.Data;
using backend.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDatabase(this IServiceCollection services)
    {
        var databaseConfig = services.BuildServiceProvider().GetService<IOptions<DatabaseConfig>>()?.Value;
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(databaseConfig?.ConnectionString);
        });

        services.AddDefaultIdentity<IdentityUser>(options => { })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        return services;
    } 
    
    public static IServiceCollection AddCustomOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<DatabaseConfig>(configuration.GetSection("DatabaseConfig"));
        return services;
    }
}