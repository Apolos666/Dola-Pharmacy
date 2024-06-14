﻿using backend.Data;
using backend.Models;
using backend.Options;
using backend.Repositories.Generic;
using backend.Services.Account;
using backend.Services.Email;
using backend.UnitOfWork;
using Mailjet.Client;
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

        services.AddDefaultIdentity<ApplicationIdentityUser>(options =>
            {
                // Sign in settings
                options.SignIn.RequireConfirmedEmail = true;

                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
            })
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
            .Configure<CorsConfig>(configuration.GetSection("CorsConfig"))
            .Configure<MailSettings>(configuration.GetSection("MailSettings"));
        
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
        services
            .AddScoped<IAuthenticationService, AuthenticationService>()
            .AddScoped<IEmailService, MailKitEmailService>();
        
        return services;
    }
    
    public static IServiceCollection AddThirdPartyServices(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddHttpClient<IMailjetClient, MailjetClient>(client =>
        {
            client.SetDefaultSettings();
            
            client.UseBasicAuthentication("6f9543c0602cc1be87d94d1ae524adfc", "26658f53db990f8da9e5e3406e78ced3");
        });
        
        return services;
    }
}