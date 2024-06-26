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

        modelBuilder.Entity<ProductTypeAssociation>()
            .HasKey(pta => new { pta.ProductId, pta.TypeId });
    }
    
    public DbSet<Address> Addresses { get; init; }
    public DbSet<Brand> Brands { get; init; }
    public DbSet<Cart> Carts { get; init; }
    public DbSet<CartItem> CartItems { get; init; }
    public DbSet<Coupon> Coupons { get; init; }
    public DbSet<Order> Orders { get; init; }
    public DbSet<OrderItem> OrderItems { get; init; }
    public DbSet<PaymentMethod> PaymentMethods { get; init; }
    public DbSet<Product> Products { get; init; }
    public DbSet<ProductImage> ProductImages { get; init; }
    public DbSet<ProductTargetGroup> ProductTargetGroups { get; init; }
    public DbSet<ProductType> ProductTypes { get; init; }
    public DbSet<Promotion> Promotions { get; init; }
    public DbSet<PromotionProduct> PromotionProducts { get; init; }
    public DbSet<ShippingMethod> ShippingMethods { get; init; }
    public DbSet<Status> Status { get; init; }
    public DbSet<TargetGroup> TargetGroups { get; init; }
    public DbSet<ProductTypeAssociation> ProductTypeAssociations { get; init; }
};