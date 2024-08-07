﻿using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationIdentityUser : IdentityUser
{
    public ApplicationIdentityUser()
    {
        Addresses = new HashSet<Address>();
    }

    public string? RefreshToken { get; set; }
    public DateTime? CreatedTime { get; set; }
    public DateTime? ExpiredTime { get; set; }
    
    public virtual ICollection<Address> Addresses { get; init; }
}