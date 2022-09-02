using Bom.Blog.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Bom.Blog.Tags
{
    public class EfCoreTagRepository : EfCoreRepository<BlogDbContext, Tag, Guid>, ITagRepository
    {
        public EfCoreTagRepository(IDbContextProvider<BlogDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<Tag> FindByNameAsync(string name)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.AsNoTracking().FirstOrDefaultAsync(i => i.Name == name);
        }

        public async Task<IEnumerable<Tag>> GetWithPostCountAsync()
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.AsNoTracking().Include(i => i.Posts).ToListAsync();
        }
    }
}
