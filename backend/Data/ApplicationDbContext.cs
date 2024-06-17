using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationIdentityUser>(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ProductTargetGroup>()
            .HasKey(ptg => new { ptg.ProductId, ptg.GroupId });
        
        modelBuilder.Entity<PromotionProduct>()
            .HasKey(pp => new { pp.PromotionId, pp.ProductId });
        
        modelBuilder.Entity<CartItem>()
            .HasKey(ci => new { ci.CartId, ci.ProductId });
        
        modelBuilder.Entity<OrderItem>()
            .HasKey(oi => new { oi.OrderId, oi.ProductId });
    }
    
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<ProductTargetGroup> ProductTargetGroups { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<PromotionProduct> PromotionProducts { get; set; }
    public DbSet<ShippingMethod> ShippingMethods { get; set; }
    public DbSet<Status> Status { get; set; }
    public DbSet<TargetGroup> TargetGroups { get; set; }
};