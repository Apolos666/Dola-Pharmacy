namespace backend.Options;

public class AwsS3Config
{
    public string BucketName { get; set; } = null!;
    public string PrefixUrl { get; set; } = null!;
}