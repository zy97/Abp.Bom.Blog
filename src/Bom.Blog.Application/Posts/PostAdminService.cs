using Bom.Blog.Categories;
using Bom.Blog.Permissions;
using Bom.Blog.Posts.AdminDtos;
using Bom.Blog.Posts.Dtos;
using Bom.Blog.Servives;
using Bom.Blog.Tags;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using PostDto = Bom.Blog.Posts.AdminDtos.PostDto;

namespace Bom.Blog.Posts
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class PostAdminService : CrudAppService<Post, PostEditDto, PostDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdatePostDto, CreateOrUpdatePostDto>, IPostAdminService
    {
        private readonly IPostRepository repository;
        private readonly IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo;
        private readonly IReadOnlyRepository<Tag, Guid> readOnlyTagRepo;
        private readonly ICacheRemoveService cacheRemoveService;

        public PostAdminService(IPostRepository repository, IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo,
            IReadOnlyRepository<Tag, Guid> readOnlyTagRepo, ICacheRemoveService cacheRemoveService) : base(repository)
        {
            this.repository = repository;
            this.readOnlyCategoryRepo = readOnlyCategoryRepo;
            this.readOnlyTagRepo = readOnlyTagRepo;
            this.cacheRemoveService = cacheRemoveService;
        }
        [Authorize(BlogPermissions.Admin.Update)]
        public override async Task<PostEditDto> UpdateAsync(Guid id, CreateOrUpdatePostDto input)
        {
            await CheckUpdatePolicyAsync();

            var entity = await GetEntityByIdAsync(id);
            var tags = await readOnlyTagRepo.GetListAsync(i => input.Tags.Contains(i.Id));
            //TODO: Check if input has id different than given id and normalize if it's default value, throw ex otherwise
            await MapToEntityAsync(input, entity);
            entity.Tags = tags;
            await Repository.UpdateAsync(entity, autoSave: true);
            await RemovePostCache();
            return await MapToGetOutputDtoAsync(entity);
        }
        [Authorize(BlogPermissions.Admin.Create)]
        public override async Task<PostEditDto> CreateAsync(CreateOrUpdatePostDto input)
        {
            await CheckCreatePolicyAsync();

            var tags = await readOnlyTagRepo.GetListAsync(i => input.Tags.Contains(i.Id));
            var entity = await MapToEntityAsync(input);
            entity.Tags = tags;
            TryToSetTenantId(entity);
            await Repository.InsertAsync(entity, autoSave: true);
            await RemovePostCache();
            return await MapToGetOutputDtoAsync(entity);
        }
        [Authorize(BlogPermissions.Admin.Delete)]
        public override async Task DeleteAsync(Guid id)
        {
            await base.DeleteAsync(id);
            await RemovePostCache();
        }

        public async Task<ListResultDto<CategoryLookupDto>> GetCategoryLookupAsync()
        {
            var categories = await this.readOnlyCategoryRepo.GetListAsync();
            return new ListResultDto<CategoryLookupDto>(ObjectMapper.Map<List<Category>, List<CategoryLookupDto>>(categories));
        }

        public async Task<ListResultDto<TagLookupDto>> GetTagLookupAsync()
        {
            var tags = await this.readOnlyTagRepo.GetListAsync();
            return new ListResultDto<TagLookupDto>(ObjectMapper.Map<List<Tag>, List<TagLookupDto>>(tags));
        }
        protected override async Task<IQueryable<Post>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.WithDetailsAsync(i => i.Tags, i => i.Category);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Title), i => i.Title.Contains(input.Title));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Author), i => i.Author.Contains(input.Author));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Markdown), i => i.Markdown.Contains(input.Markdown));
            queryable = queryable.WhereIf(input.CategoryId != null, i => i.CategoryId == input.CategoryId);
            queryable = queryable.WhereIf(input.TagId != null, i => i.Tags.Any(i => i.Id == input.TagId));
            return queryable;
        }

        private async Task RemovePostCache()
        {
            await cacheRemoveService.RemoveAsync<PagedResultDto<QueryPostDto>>("");
        }
        private async Task RemovePostCacheByIdAsync()
        {
            await cacheRemoveService.RemoveAsync<Dtos.PostDto>("");
        }
    }
}
