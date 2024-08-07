﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

[Table("Carts")]
public class Cart
{
    public Cart()
    {
        CartItems = new HashSet<CartItem>();
    }
    
    [Key] public Guid CartId { get; set; }
    [Required] public string UserId { get; set; }
    [Required] public DateTime DeliveryDate { get; set; }
    [Required] public TimeSpan DeliveryTime { get; set; }

    [ForeignKey(nameof(UserId))] public virtual ApplicationIdentityUser User { get; set; } = null!;
    public virtual ICollection<CartItem> CartItems { get; set; }
    
    public static Cart Create(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }

        return new Cart
        {
            CartId = Guid.NewGuid(),
            UserId = userId,
            DeliveryDate = DateTime.UtcNow.AddDays(7),
            DeliveryTime = TimeSpan.FromHours(12),
            CartItems = new HashSet<CartItem>(),
        };
    }
}