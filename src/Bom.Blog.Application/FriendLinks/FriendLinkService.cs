using Bom.Blog.FriendLinks.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Caching;

namespace Bom.Blog.FriendLinks
{
    [RemoteService(false)]
    public class FriendLinkService : BlogAppService, IFriendLinkService
    {
        private readonly IFriendLinkRepository friendLinkRepo;
        private readonly IDistributedCache<List<FriendLinkDto>> cache;

        public FriendLinkService(IFriendLinkRepository friendLinkRepo, IDistributedCache<List<FriendLinkDto>> cache)
        {
            this.friendLinkRepo = friendLinkRepo;
            this.cache = cache;
        }
        public async Task<List<FriendLinkDto>> GetAllAsync()
        {
            var result = await cache.GetOrAddAsync(CacheConsts.FriendLinkList, async () =>
            {
                var res = await friendLinkRepo.GetListAsync();
                return ObjectMapper.Map<List<FriendLink>, List<FriendLinkDto>>(res);
            });
            return result;
        }
    }

}
