using backend.Extensions;
using backend.Options;
using backend.Services.Account;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.
    AddCustomOptions(builder.Configuration).
    AddDatabase().
    AddRepositories().
    AddCustomServices().
    AddThirdPartyServices().
    AddCorsService();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseConfiguredCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();