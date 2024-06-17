namespace backend.Models;

public class RefreshToken
{
    public string Token { get; set; } = null!;
    public DateTime Created { get; set; }
    public DateTime Expires { get; set; }
}