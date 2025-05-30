using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.BusinessService.User
{
    public class UserRepository : IUserRepository
    {
        private readonly SmartCartContext _context;

        public UserRepository(SmartCartContext context)
        {
            _context = context;
        }

        public async Task<Models.User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task<Models.User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Models.User> CreateAsync(Models.User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<Models.User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
