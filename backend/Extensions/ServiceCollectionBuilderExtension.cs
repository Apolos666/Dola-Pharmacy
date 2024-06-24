using System.Text;
using backend.Data;
using backend.Extensions.Cloud;
using backend.Models;
using backend.Options;
using backend.Repositories.Brand;
using backend.Repositories.Generic;
using backend.Repositories.Product;
using backend.Repositories.ProductStatus;
using backend.Repositories.ProductType;
using backend.Repositories.TargetGroup;
using backend.Services.Account;
using backend.Services.Brand;
using backend.Services.Email;
using backend.Services.PasswordValidator;
using backend.Services.Product;
using backend.Services.ProductStatus;
using backend.Services.ProductType;
using backend.Services.TargetGroup;
using backend.UnitOfWork;
using Mailjet.Client;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

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
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddPasswordValidator<CustomPasswordValidator<ApplicationIdentityUser>>();

        services.AddScoped<Func<ApplicationDbContext>>((provider) => () => provider.GetService<ApplicationDbContext>()!);
        services.AddScoped<DbFactory>();
        services.AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>();

        return services;
    } 
    
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services
            .AddScoped(typeof(IRepository<>), typeof(Repository<>))
            .AddScoped<IBrandRepository, BrandRepository>()
            .AddScoped<ITargetGroupRepository, TargetGroupRepository>()
            .AddScoped<IProductTypeRepository, ProductTypeRepository>()
            .AddScoped<IProductStatusRepository, ProductStatusRepository>()
            .AddScoped<IProductRepository, ProductRepository>();
        
        return services;
    }
    
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services
            .AddScoped<IAuthenticationService, AuthenticationService>()
            .AddScoped<IEmailService, MailKitEmailService>()
            .AddScoped<IGoogleAuthService, GoogleAuthService>();

        services
            .AddScoped<BrandService>()
            .AddScoped<TargetGroupService>()
            .AddScoped<ProductTypeService>()
            .AddScoped<ProductStatusService>()
            .AddScoped<ProductService>();
        
        return services;
    }
    
    public static IServiceCollection AddCustomOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .Configure<DatabaseConfig>(configuration.GetSection("DatabaseConfig"))
            .Configure<CorsConfig>(configuration.GetSection("CorsConfig"))
            .Configure<MailSettings>(configuration.GetSection("MailSettings"))
            .Configure<JwtConfig>(configuration.GetSection("JwtConfig"))
            .Configure<RefreshTokenConfig>(configuration.GetSection("RefreshTokenConfig"))
            .Configure<AwsS3Config>(configuration.GetSection("AwsS3Config"));
        
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

    public static IServiceCollection AddApplicationAuthentication(this IServiceCollection service)
    {
        var jwtConfig = service.BuildServiceProvider().GetService<IOptions<JwtConfig>>()?.Value;

        service
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateActor = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtConfig?.Issuer,
                    ValidAudience = jwtConfig?.Audience,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig?.Key!))
                };
            });

        return service;
    }
    
    public static IServiceCollection AddThirdPartyServices(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddHttpClient<IMailjetClient, MailjetClient>(client =>
        {
            client.SetDefaultSettings();
            
            client.UseBasicAuthentication("6f9543c0602cc1be87d94d1ae524adfc", "26658f53db990f8da9e5e3406e78ced3");
        });

        services.AddAwsService();
        
        return services;
    }
}