using backend.Data;
using backend.Models;
using backend.Options;
using backend.Repositories.Generic;
using backend.Services.Account;
using backend.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Extensions;

public static class ServiceCollectionBuilderExtension
{
    public static IServiceCollection AddDatabase(this IServiceCollection services)
    {
        var databaseConfig = services.BuildServiceProvider().GetService<IOptions<DatabaseConfig>>()?.Value;
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(databaseConfig?.ConnectionString);
        });

        services.AddDefaultIdentity<ApplicationIdentityUser>(options => { })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddScoped<Func<ApplicationDbContext>>((provider) => () => provider.GetService<ApplicationDbContext>()!);
        services.AddScoped<DbFactory>();
        services.AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>();

        return services;
    } 
    
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        
        return services;
    }
    
    public static IServiceCollection AddCustomOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .Configure<DatabaseConfig>(configuration.GetSection("DatabaseConfig"))
            .Configure<CorsConfig>(configuration.GetSection("CorsConfig"));
        
        return services;
    }

    public static IServiceCollection AddCorsService(this IServiceCollection services)
    {
        var corsConfig = services.BuildServiceProvider().GetService<IOptions<CorsConfig>>()?.Value;
        
        services.AddCors(options =>
        {
            options.AddPolicy(corsConfig!.PolicyName, builder =>
            {
                builder
                    .WithOrigins(corsConfig.AllowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });
        
        return services;
    }
    
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        
        return services;
    }
    
    public static IServiceCollection AddThirdPartyServices(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        
        return services;
    }
}