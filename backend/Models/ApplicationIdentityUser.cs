using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationIdentityUser : IdentityUser
{
    public string? RefreshToken { get; set; }
    public DateTime? CreatedTime { get; set; }
    public DateTime? ExpiredTime { get; set; }
}