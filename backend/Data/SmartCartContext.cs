using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class SmartCartContext : DbContext
    {
        public SmartCartContext(DbContextOptions<SmartCartContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.Role).HasConversion<int>();
            });

            // Product configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).IsRequired().HasMaxLength(255);
                entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
                entity.Property(p => p.Description).HasMaxLength(1000);
                entity.Property(p => p.ImageUrl).HasMaxLength(500);
            });

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@smartcart.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = UserRole.Admin,
                    CreatedAt = DateTime.UtcNow
                }
            );            // Seed sample products with reliable placeholder images
            var products = new[]
            {
                new Product { Id = 1, Name = "iPhone 15 Pro", Price = 999.99m, Description = "Latest iPhone with advanced features", ImageUrl = "https://picsum.photos/300/200?random=1", CreatedAt = DateTime.UtcNow },
                new Product { Id = 2, Name = "Samsung Galaxy S24", Price = 899.99m, Description = "Premium Android smartphone", ImageUrl = "https://picsum.photos/300/200?random=2", CreatedAt = DateTime.UtcNow },
                new Product { Id = 3, Name = "MacBook Air M3", Price = 1299.99m, Description = "Lightweight laptop with M3 chip", ImageUrl = "https://picsum.photos/300/200?random=3", CreatedAt = DateTime.UtcNow },
                new Product { Id = 4, Name = "iPad Pro 12.9", Price = 1099.99m, Description = "Professional tablet for creative work", ImageUrl = "https://picsum.photos/300/200?random=4", CreatedAt = DateTime.UtcNow },
                new Product { Id = 5, Name = "AirPods Pro", Price = 249.99m, Description = "Wireless earbuds with noise cancellation", ImageUrl = "https://picsum.photos/300/200?random=5", CreatedAt = DateTime.UtcNow },
                new Product { Id = 6, Name = "Sony WH-1000XM5", Price = 399.99m, Description = "Premium noise-cancelling headphones", ImageUrl = "https://picsum.photos/300/200?random=6", CreatedAt = DateTime.UtcNow },
                new Product { Id = 7, Name = "Nintendo Switch", Price = 299.99m, Description = "Portable gaming console", ImageUrl = "https://picsum.photos/300/200?random=7", CreatedAt = DateTime.UtcNow },
                new Product { Id = 8, Name = "PlayStation 5", Price = 499.99m, Description = "Next-gen gaming console", ImageUrl = "https://picsum.photos/300/200?random=8", CreatedAt = DateTime.UtcNow },
                new Product { Id = 9, Name = "Apple Watch Series 9", Price = 399.99m, Description = "Advanced smartwatch with health features", ImageUrl = "https://picsum.photos/300/200?random=9", CreatedAt = DateTime.UtcNow },
                new Product { Id = 10, Name = "Dell XPS 13", Price = 1199.99m, Description = "Compact Windows laptop", ImageUrl = "https://picsum.photos/300/200?random=10", CreatedAt = DateTime.UtcNow },
                new Product { Id = 11, Name = "Samsung 4K TV 55\"", Price = 799.99m, Description = "Smart 4K television", ImageUrl = "https://picsum.photos/300/200?random=11", CreatedAt = DateTime.UtcNow },
                new Product { Id = 12, Name = "Kindle Oasis", Price = 249.99m, Description = "Premium e-reader with warm light", ImageUrl = "https://picsum.photos/300/200?random=12", CreatedAt = DateTime.UtcNow }
            };

            modelBuilder.Entity<Product>().HasData(products);
        }
    }
}
