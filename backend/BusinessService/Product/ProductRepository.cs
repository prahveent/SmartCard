using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.BusinessService.Product
{
    public class ProductRepository : IProductRepository
    {
        private readonly SmartCartContext _context;

        public ProductRepository(SmartCartContext context)
        {
            _context = context;
        }

        public async Task<Backend.Models.Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public async Task<IEnumerable<Backend.Models.Product>> GetAllAsync()
        {
            return await _context.Products
                .Where(p => p.IsActive)
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<IEnumerable<Backend.Models.Product>> SearchAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return await GetAllAsync();
            }

            return await _context.Products
                .Where(p => p.IsActive && 
                           (p.Name.ToLower().Contains(searchTerm.ToLower()) ||
                            p.Description.ToLower().Contains(searchTerm.ToLower())))
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<Backend.Models.Product> CreateAsync(Backend.Models.Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Backend.Models.Product> UpdateAsync(Backend.Models.Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            // Soft delete
            product.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
