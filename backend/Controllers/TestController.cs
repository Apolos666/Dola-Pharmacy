using System.Net;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly IAmazonS3 _amazonS3;

    public TestController(IAmazonS3 amazonS3)
    {
        _amazonS3 = amazonS3;
    }
    
    [HttpGet("test-function")]
    public IActionResult Test()
    {
        var httpContext = HttpContext;
        return Ok("Test");
    }

    [HttpPost("test-uploadimage")]
    public async Task<IActionResult> Upload([FromForm(Name = "Data")] IFormFile file)
    {
        var key = $"products/{Guid.NewGuid()}";
        
        var putObjectRequest = new PutObjectRequest
        {
            BucketName = "dolapharmacy",
            Key = key,
            ContentType = file.ContentType,
            InputStream = file.OpenReadStream()
        };

        var putObjectResponse = await _amazonS3.PutObjectAsync(putObjectRequest);

        if (putObjectResponse.HttpStatusCode == HttpStatusCode.OK)
            return Ok();
        
        return BadRequest();
    }
}