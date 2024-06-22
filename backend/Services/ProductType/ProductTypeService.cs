using System.Net;
using System.Web;
using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using backend.DTOs.ProductType;
using backend.Options;
using backend.Repositories.ProductType;
using backend.UnitOfWork;
using Microsoft.Extensions.Options;

namespace backend.Services.ProductType;

public class ProductTypeService(
    IUnitOfWork unitOfWork,
    IProductTypeRepository productTypeRepository,
    IOptions<AwsS3Config> awsS3Config,
    IAmazonS3 amazonS3,
    IMapper mapper)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductTypeRepository _productTypeRepository = productTypeRepository;
    private readonly AwsS3Config _awsS3Config = awsS3Config.Value;
    private readonly IAmazonS3 _amazonS3 = amazonS3;
    private readonly IMapper _mapper = mapper;

    public async Task<(bool, string)> UploadProductTypeImageAsync(Guid id, string typeName, IFormFile file)
    {
        // Encode the typeName to make it URL safe
        var encodedTypeName = Uri.EscapeDataString(typeName);
        var key = $"product-types/{encodedTypeName}-{id}";

        var putObjectRequest = new PutObjectRequest
        {
            BucketName = _awsS3Config.BucketName,
            Key = key,
            ContentType = file.ContentType,
            InputStream = file.OpenReadStream(),
            Metadata =
            {
                ["x-amz-meta-original-filename"] = file.FileName,
                ["x-amz-meta-extension"] = Path.GetExtension(file.FileName)
            }
        };
        
        var putObjectResponse = await _amazonS3.PutObjectAsync(putObjectRequest);

        if (putObjectResponse.HttpStatusCode == HttpStatusCode.OK)
        {
            var imageUrl = $"{_awsS3Config.PrefixUrl}/{HttpUtility.UrlEncode(key)}";
            return (true, imageUrl);
        }

        return (false, "");
    }
    
    public async Task<ResponseProductTypeDto> AddProductTypeAsync(Guid? id, string typeName, string imagePath, Guid? parentId = null)
    {
        var productType = await _productTypeRepository.AddProductTypeAsync(id, typeName, imagePath, parentId);
        var saved = await _unitOfWork.CommitAsync();

        if (saved <= 0)
            throw new Exception($"Cannot save {typeName} to database");

        var responseProductTypeDto = _mapper.Map<ResponseProductTypeDto>(productType);
        return responseProductTypeDto;
    }
}