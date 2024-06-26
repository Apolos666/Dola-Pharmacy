using System.Net;
using System.Text;
using System.Web;
using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using backend.DTOs.ProductImage;
using backend.Options;
using backend.Repositories.ProductImage;
using backend.UnitOfWork;
using Microsoft.Extensions.Options;

namespace backend.Services.ProductImage;

public class ProductImageService(
    IUnitOfWork unitOfWork,
    IProductImageRepository productImageRepository,
    IMapper mapper,
    IOptions<AwsS3Config> awsS3Config,
    IAmazonS3 amazonS3)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductImageRepository _productImageRepository = productImageRepository;
    private readonly IMapper _mapper = mapper;
    private readonly AwsS3Config _awsS3Config = awsS3Config.Value;
    private readonly IAmazonS3 _amazonS3 = amazonS3;
    
    private const string ProductImagePrefix = "product-images";
    
    public async Task<(bool, string)> UploadProductImageAsync(Guid imageId, Guid productId, IFormFile file)
    { 
        var key = $"{ProductImagePrefix}/{imageId}-{productId}";

        var putObjectRequest = new PutObjectRequest
        {
            BucketName = _awsS3Config.BucketName,
            Key = key,
            ContentType = file.ContentType,
            InputStream = file.OpenReadStream(),
            Metadata =
            {
                ["x-amz-meta-original-filename"] = EncodeToAscii(file.FileName),
                ["x-amz-meta-extension"] = Path.GetExtension(file.FileName)
            }
        };
        
        var putObjectResponse = await _amazonS3.PutObjectAsync(putObjectRequest);

        if (putObjectResponse.HttpStatusCode == HttpStatusCode.OK)
        {
            // The 'key' is URL-encoded to ensure proper handling of special characters in the URL
            var imageUrl = $"{_awsS3Config.PrefixUrl}/{HttpUtility.UrlEncode(key)}"; 
            return (true, imageUrl);
        }

        return (false, "");
    }

    public async Task<ResponseProductImageDto> AddProductImageAsync(Guid? imageId, Guid productId, string imageUrl, bool isPrimary)
    {
        var productImage = _productImageRepository.AddProductImage(imageId, productId, imageUrl, isPrimary);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception("Error ocurred when trying to save ProductImage");

        var responseProductImageDto = _mapper.Map<ResponseProductImageDto>(productImage);
        return responseProductImageDto;
    }
    
    private string EncodeToAscii(string input)
    {
        // Replace non-ASCII characters with an ASCII representation
        var asciiBytes = Encoding.ASCII.GetBytes(input);
        return Encoding.ASCII.GetString(asciiBytes);
    }
}