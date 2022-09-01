using Bom.Blog.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Bom.Blog.Categories
{
    public class EfCoreCategoryRepository : EfCoreRepository<BlogDbContext, Category, Guid>, ICategoryRepository
    {
        public EfCoreCategoryRepository(IDbContextProvider<BlogDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<Category> FindByNameAsync(string name)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.FirstOrDefaultAsync(i => i.Name == name);
        }

        public async Task<IEnumerable<Category>> GetWithPostCount()
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.Include(i => i.Posts).ToListAsync();
        }
    }
}
