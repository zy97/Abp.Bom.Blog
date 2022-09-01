using Bom.Blog.FriendLinks.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.FriendLinks
{
    public class FriendLinkService : BlogAppService, IFriendLinkService
    {
        private readonly IRepository<FriendLink, Guid> friendLinkRepo;
        private readonly IDistributedCache<List<FriendLinkDto>> cache;

        public FriendLinkService(IRepository<FriendLink, Guid> friendLinkRepo, IDistributedCache<List<FriendLinkDto>> cache)
        {
            this.friendLinkRepo = friendLinkRepo;
            this.cache = cache;
        }
        public async Task<List<FriendLinkDto>> GetAllAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var res = await friendLinkRepo.GetListAsync();
                return ObjectMapper.Map<List<FriendLink>, List<FriendLinkDto>>(res);
            });
            return result;
        }
    }

}
