using Bom.Blog.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Tags
{
    public class TagService : BlogAppService, ITagService
    {
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IDistributedCache<IEnumerable<TagCountDto>> cache;

        public TagService(IRepository<Tag, Guid> tagRepo, IDistributedCache<IEnumerable<TagCountDto>> cache)
        {
            this.tagRepo = tagRepo;
            this.cache = cache;
        }
        public async Task<IEnumerable<TagCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var query = await tagRepo.WithDetailsAsync(i => i.Posts);
                var categoryQuery = query.Select(i => new TagCountDto { Id = i.Id, TagName = i.Name, DisplayName = i.DisplayName, Count = i.Posts.Count });

                var result = await AsyncExecuter.ToListAsync(categoryQuery);
                return result;
            });
            return result;
        }
        public async Task<TagDto> GetByNameAsync(string tagName)
        {
            var res = await tagRepo.GetAsync(i => i.Name == tagName);
            return ObjectMapper.Map<Tag, TagDto>(res);
        }
    }
    public class AdminTagService : CrudAppService<Tag, AdminTagDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateTagDto>, IAdminTagService
    {
        public AdminTagService(IRepository<Tag, Guid> repository) : base(repository)
        {
            this.GetPolicyName = BlogPermissions.Admin.Default;
            this.GetListPolicyName = BlogPermissions.Admin.Default;
            this.UpdatePolicyName = BlogPermissions.Admin.Update;
            this.CreatePolicyName = BlogPermissions.Admin.Create;
            this.DeletePolicyName = BlogPermissions.Admin.Delete;
        }

        public async Task<List<TagSelectOptionDto>> GetAllTags()
        {
            var tags = await this.ReadOnlyRepository.GetListAsync();
            return ObjectMapper.Map<List<Tag>, List<TagSelectOptionDto>>(tags);
        }

        protected override async Task<IQueryable<Tag>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.TagName), i => i.Name.Contains(input.TagName));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.DisplayName), i => i.DisplayName.Contains(input.DisplayName));
            return queryable;
        }
    }
}
