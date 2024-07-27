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

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

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
// await app.SeedDataAsync();
app.Run();