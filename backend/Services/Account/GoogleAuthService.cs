using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace backend.Services.Account;

public class GoogleAuthService : IGoogleAuthService
{
    private readonly ILogger<GoogleAuthService> _logger;
    
    public GoogleAuthService(ILogger<GoogleAuthService> logger)
    {
        _logger = logger;
    }
    
    public async Task<Payload?> AuthenticateAsync(string exchangeCode)
    {
        try
        {
            // Create a new Google authorization code flow
            var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = Environment.GetEnvironmentVariable("DolaPharmacyGoogleClientId", EnvironmentVariableTarget.User),
                    ClientSecret = Environment.GetEnvironmentVariable("DolaPharmacyGoogleClientSecret", EnvironmentVariableTarget.User),
                },
            });

            // Exchange code for access and ID tokens
            var tokenResponse = await flow.ExchangeCodeForTokenAsync(
                "",
                exchangeCode,
                "http://localhost:5173",
                CancellationToken.None);

            // Create a new Google user credential
            UserCredential userCredential = new UserCredential(flow, "", tokenResponse);
            // Validate the ID token
            var payload = await ValidateAsync(userCredential.Token.IdToken);
            return payload;
        } catch (Exception e)
        {
            _logger.LogError(e, "Error while authenticating Google user");
            return null;
        }
    } 
}