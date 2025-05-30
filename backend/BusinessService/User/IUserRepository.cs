using Backend.Models;

namespace Backend.BusinessService.User
{
    public interface IUserRepository
    {
        Task<Models.User?> GetByEmailAsync(string email);
        Task<Models.User?> GetByIdAsync(int id);
        Task<Models.User> CreateAsync(Models.User user);
        Task<IEnumerable<Models.User>> GetAllAsync();
    }
}
