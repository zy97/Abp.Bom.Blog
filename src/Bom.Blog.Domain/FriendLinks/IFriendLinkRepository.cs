using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.FriendLinks
{
    public interface IFriendLinkRepository : IRepository<FriendLink, Guid>
    {
        Task<FriendLink> FindByNameAsync(string name);
    }
}
