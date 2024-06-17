using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "User")]
public class TestController : ControllerBase
{
    [HttpGet("test-function")]
    public IActionResult Test()
    {
        var httpContext = HttpContext;
        return Ok("Test");
    }
}