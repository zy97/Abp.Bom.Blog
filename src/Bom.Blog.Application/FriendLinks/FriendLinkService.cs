using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.FriendLinks
{
    public class FriendLinkService : BlogAppService, IFriendLinkService
    {
        private readonly IRepository<FriendLink, Guid> friendLinkRepo;

        public FriendLinkService(IRepository<FriendLink, Guid> friendLinkRepo)
        {
            this.friendLinkRepo = friendLinkRepo;
        }
        public async Task<List<FriendLinkDto>> GetAllAsync()
        {
            var res = await friendLinkRepo.GetListAsync();
            return ObjectMapper.Map<List<FriendLink>, List<FriendLinkDto>>(res);
        }
    }
}
