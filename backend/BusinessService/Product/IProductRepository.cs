using Backend.Models;

namespace Backend.BusinessService.Product
{
    public interface IProductRepository
    {
        Task<Backend.Models.Product?> GetByIdAsync(int id);
        Task<IEnumerable<Backend.Models.Product>> GetAllAsync();
        Task<IEnumerable<Backend.Models.Product>> SearchAsync(string searchTerm);
        Task<Backend.Models.Product> CreateAsync(Backend.Models.Product product);
        Task<Backend.Models.Product> UpdateAsync(Backend.Models.Product product);
        Task<bool> DeleteAsync(int id);
    }
}
