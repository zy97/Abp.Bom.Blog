using Bom.Blog.Permissions;
using Bom.Blog.Tags.AdminDtos;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using TagDto = Bom.Blog.Tags.AdminDtos.TagDto;

namespace Bom.Blog.Tags
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class TagAdminService : CrudAppService<Tag, TagDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateTagDto>, ITagAdminService
    {
        private readonly ITagRepository repository;
        private readonly TagManager tagManager;

        public TagAdminService(ITagRepository repository, TagManager tagManager) : base(repository)
        {
            this.repository = repository;
            this.tagManager = tagManager;
        }
        [Authorize(BlogPermissions.Admin.Create)]
        public override async Task<TagDto> CreateAsync(CreateOrUpdateTagDto input)
        {
            var tag = await tagManager.CreateAsync(input.Name, input.DisplayName);
            await repository.InsertAsync(tag);
            return ObjectMapper.Map<Tag, TagDto>(tag);
        }
        [Authorize(BlogPermissions.Admin.Update)]
        public override async Task<TagDto> UpdateAsync(Guid id, CreateOrUpdateTagDto input)
        {
            var tag = await this.repository.GetAsync(id);
            await tagManager.ChangeAsync(tag, input.Name, input.DisplayName);
            await this.repository.UpdateAsync(tag);
            return ObjectMapper.Map<Tag, TagDto>(tag);
        }
        [Authorize(BlogPermissions.Admin.Delete)]
        public override async Task DeleteAsync(Guid id)
        {
            await base.DeleteAsync(id);
        }
        protected override async Task<IQueryable<Tag>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Name), i => i.Name.Contains(input.Name));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.DisplayName), i => i.DisplayName.Contains(input.DisplayName));
            return queryable;
        }
    }
}
