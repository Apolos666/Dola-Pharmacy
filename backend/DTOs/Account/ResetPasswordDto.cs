namespace backend.DTOs.Account;

public record ResetPasswordDto(string Email, string Password, string Token);