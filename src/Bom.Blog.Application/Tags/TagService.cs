using Bom.Blog.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Tags
{
    public class TagService : BlogAppService, ITagService
    {
        private readonly IRepository<Tag, Guid> tagRepo;

        public TagService(IRepository<Tag, Guid> tagRepo)
        {
            this.tagRepo = tagRepo;
        }
        async Task<List<TagCountDto>> ITagService.GetCountAsync()
        {
            throw new NotImplementedException();
            //var query = from tag in await tagRepo.GetQueryableAsync()
            //            join postTag in await postTagRepo.GetQueryableAsync() on tag.Id equals postTag.TagId into tpt
            //            from t in tpt.DefaultIfEmpty()
            //            group t by new { tag.DisplayName, tag.Name } into g
            //            select new TagCountDto { TagName = g.Key.Name, DisplayName = g.Key.DisplayName, Count = g.Count(i => i != null) };

            //var result = await AsyncExecuter.ToListAsync(query);
            //return result;
        }
        async Task<TagDto> ITagService.GetByNameAsync(string tagName)
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
