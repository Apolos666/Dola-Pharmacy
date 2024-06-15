using backend.Extensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.
    AddCustomOptions(builder.Configuration).
    AddDatabase().
    AddRepositories().
    AddCustomServices().
    AddThirdPartyServices().
    AddCorsService().
    AddApplicationAuthentication();

builder.Services.AddControllers();
builder.Host.UseSerilog((context, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});
var app = builder.Build();
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseConfiguredCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();