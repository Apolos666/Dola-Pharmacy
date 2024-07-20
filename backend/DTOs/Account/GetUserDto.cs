namespace backend.DTOs.Account;

public record GetUserDto
{
    public string HoTen { get; init; } = null!;
    public string Email { get; init; } = null!;
    public string PhoneNumber { get; init; } = null!;
    public string[] DiaChi { get; init; } = null!;
}