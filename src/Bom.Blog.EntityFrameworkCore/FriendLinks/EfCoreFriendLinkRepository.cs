using Bom.Blog.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Bom.Blog.FriendLinks
{
    public class EfCoreFriendLinkRepository : EfCoreRepository<BlogDbContext, FriendLink, Guid>, IFriendLinkRepository
    {
        public EfCoreFriendLinkRepository(IDbContextProvider<BlogDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public async Task<FriendLink> FindByNameAsync(string name)
        {
            var dbSet = await this.GetDbSetAsync();
            return await dbSet.AsNoTracking().FirstOrDefaultAsync(i => i.Name == name);
        }
    }
}
