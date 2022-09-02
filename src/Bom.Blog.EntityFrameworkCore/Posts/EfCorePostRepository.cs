using Bom.Blog.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Bom.Blog.Posts
{
    public class EfCorePostRepository : EfCoreRepository<BlogDbContext, Post, Guid>, IPostRepository
    {
        public EfCorePostRepository(IDbContextProvider<BlogDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<Post> GetNextAsync(DateTime createTime)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.AsNoTracking().OrderByDescending(i => i.CreationTime).FirstOrDefaultAsync(i => i.CreationTime > createTime);
        }
        public override async Task<IQueryable<Post>> WithDetailsAsync()
        {
            var queryable = await base.WithDetailsAsync();
            queryable = queryable.Include(i => i.Category).Include(i => i.Tags);
            return queryable;
        }
        public async Task<Post> GetPreviousAsync(DateTime createTime)
        {
            var dbSet = await GetDbSetAsync();
            return await dbSet.AsNoTracking().OrderByDescending(i => i.CreationTime).FirstOrDefaultAsync(i => i.CreationTime < createTime);
        }

        public async Task<(int, IEnumerable<Post>)> GetListByTagNameAsync(string tagName, int skipCount, int maxResultCount)
        {
            var dbSet = await GetDbSetAsync();
            var queryable = dbSet.AsNoTracking()
                              .Include(i => i.Tags)
                              .Where(i => i.Tags.Any(i => i.Name == tagName));
            var list = await queryable
                              .OrderByDescending(i => i.CreationTime)
                              .PageBy(skipCount, maxResultCount)
                              .ToListAsync();
            var count = await queryable.CountAsync();
            return (count, list);
        }
        public async Task<(int, IEnumerable<Post>)> GetListByCategoryNameAsync(string categoryName, int skipCount, int maxResultCount)
        {
            var dbSet = await GetDbSetAsync();
            var queryable = dbSet.AsNoTracking()
                              .Include(i => i.Category)
                              .Where(i => i.Category.Name == categoryName);
            var list = await queryable
                              .OrderByDescending(i => i.CreationTime)
                              .PageBy(skipCount, maxResultCount)
                              .ToListAsync();
            var count = await queryable.CountAsync();
            return (count, list);
        }

        public async Task<(int count, IEnumerable<Post> items)> GetListAsync(int skipCount, int maxResultCount)
        {
            var dbSet = await GetDbSetAsync();
            var queryable = dbSet.AsNoTracking();
            var list = await queryable
                              .OrderByDescending(i => i.CreationTime)
                              .PageBy(skipCount, maxResultCount)
                              .ToListAsync();
            var count = await queryable.CountAsync();
            return (count, list);
        }
    }
}
