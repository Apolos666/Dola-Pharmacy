using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;

namespace backend.Extensions.Cloud;

public static class AwsServiceExtension
{
    private const string DolaPharmacyAwsAccessKeyVariable = "DolaPharmacyAwsAccessKey";
    private const string DolaPharmacyAwsSecretKeyVariable = "DolaPharmacyAwsSecretKey";

    public static IServiceCollection AddAwsService(this IServiceCollection service)
    {
        var awsOptions = new AWSOptions
        {
            Profile = "default",
            Credentials = new BasicAWSCredentials(
                Environment.GetEnvironmentVariable(DolaPharmacyAwsAccessKeyVariable, EnvironmentVariableTarget.User),
                Environment.GetEnvironmentVariable(DolaPharmacyAwsSecretKeyVariable, EnvironmentVariableTarget.User)),
            Region = RegionEndpoint.APSoutheast1
        };

        service.AddDefaultAWSOptions(awsOptions);
        service.AddAWSService<IAmazonS3>();

        return service;
    }
}