using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
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
    public class AdminFriendLinkService : CrudAppService<FriendLink, AdminFriendLinkDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateFriendLinkDto>, IAdminFriendLinkService
    {
        public AdminFriendLinkService(IRepository<FriendLink, Guid> repository) : base(repository)
        {
        }
        protected override async Task<IQueryable<FriendLink>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Title), i => i.Title.Contains(input.Title));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.LinkUrl), i => i.LinkUrl.Contains(input.LinkUrl));
            return queryable;
        }
    }
}
