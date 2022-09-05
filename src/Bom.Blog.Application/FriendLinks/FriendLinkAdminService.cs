using Bom.Blog.FriendLinks.AdminDtos;
using Bom.Blog.Permissions;
using Bom.Blog.Servives;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog.FriendLinks
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class FriendLinkAdminService : CrudAppService<FriendLink, FriendLinkDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateFriendLinkDto>, IFriendLinkAdminService
    {
        private readonly IFriendLinkRepository repository;
        private readonly FriendLinkManager friendLinkManager;
        private readonly ICacheRemoveService cacheRemoveService;

        public FriendLinkAdminService(IFriendLinkRepository repository, FriendLinkManager friendLinkManager, ICacheRemoveService cacheRemoveService) : base(repository)
        {
            this.GetPolicyName = BlogPermissions.Admin.Default;
            this.GetListPolicyName = BlogPermissions.Admin.Default;
            this.UpdatePolicyName = BlogPermissions.Admin.Update;
            this.CreatePolicyName = BlogPermissions.Admin.Create;
            this.DeletePolicyName = BlogPermissions.Admin.Delete;
            this.repository = repository;
            this.friendLinkManager = friendLinkManager;
            this.cacheRemoveService = cacheRemoveService;
        }
        [Authorize(BlogPermissions.Admin.Create)]
        public override async Task<FriendLinkDto> CreateAsync(CreateOrUpdateFriendLinkDto input)
        {
            var friendLink = await friendLinkManager.CreateAsync(input.Name, input.Url);
            await this.repository.InsertAsync(friendLink);
            await RemoveFriendLinkCache();
            return ObjectMapper.Map<FriendLink, FriendLinkDto>(friendLink);
        }
        [Authorize(BlogPermissions.Admin.Update)]
        public override async Task<FriendLinkDto> UpdateAsync(Guid id, CreateOrUpdateFriendLinkDto input)
        {
            var friendLink = await this.repository.FindAsync(id);
            await friendLinkManager.ChangeAsync(friendLink, input.Name, input.Url);
            await this.repository.UpdateAsync(friendLink);
            await RemoveFriendLinkCache();
            return ObjectMapper.Map<FriendLink, FriendLinkDto>(friendLink);
        }
        public override async Task DeleteAsync(Guid id)
        {
            await base.DeleteAsync(id);
            await RemoveFriendLinkCache();
        }
        protected override async Task<IQueryable<FriendLink>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Name), i => i.Name.Contains(input.Name));
            return queryable;
        }
        private async Task RemoveFriendLinkCache()
        {
            await cacheRemoveService.RemoveAsync<List<FriendLinkDto>>(CacheConsts.FriendLinkList);
        }
    }
}
