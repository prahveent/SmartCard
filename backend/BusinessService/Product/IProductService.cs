using Backend.DTOs;

namespace Backend.BusinessService.Product
{
    public interface IProductService
    {
        Task<ProductResponse?> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductResponse>> GetAllProductsAsync();
        Task<IEnumerable<ProductResponse>> SearchProductsAsync(string searchTerm);
        Task<ProductResponse> CreateProductAsync(CreateProductRequest request);
        Task<ProductResponse?> UpdateProductAsync(int id, CreateProductRequest request);
        Task<bool> DeleteProductAsync(int id);
    }
}
