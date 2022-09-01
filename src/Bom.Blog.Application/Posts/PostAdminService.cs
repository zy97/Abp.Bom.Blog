using Bom.Blog.Categories;
using Bom.Blog.Permissions;
using Bom.Blog.Posts.AdminDtos;
using Bom.Blog.Tags;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Posts
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class PostAdminService : CrudAppService<Post, PostDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdatePostDto>, IPostAdminService
    {
        private readonly IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo;
        private readonly IReadOnlyRepository<Tag, Guid> readOnlyTagRepo;
        public PostAdminService(IRepository<Post, Guid> repository, IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo,
            IReadOnlyRepository<Tag, Guid> readOnlyTagRepo) : base(repository)
        {
            this.readOnlyCategoryRepo = readOnlyCategoryRepo;
            this.readOnlyTagRepo = readOnlyTagRepo;

            this.GetPolicyName = BlogPermissions.Admin.Default;
            this.GetListPolicyName = BlogPermissions.Admin.Default;
            this.UpdatePolicyName = BlogPermissions.Admin.Update;
            this.CreatePolicyName = BlogPermissions.Admin.Create;
            this.DeletePolicyName = BlogPermissions.Admin.Delete;
        }
        public override async Task<PagedResultDto<PostDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            await CheckGetListPolicyAsync();

            var query = await CreateFilteredQueryAsync(input);
            var totalCount = await AsyncExecuter.CountAsync(query);
            query = await ReadOnlyRepository.WithDetailsAsync(i => i.Category, i => i.Tags);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncExecuter.ToListAsync(query);
            var entityDtos = await MapToGetListOutputDtosAsync(entities);

            return new PagedResultDto<PostDto>(
                totalCount,
                entityDtos
            );
        }
        protected override async Task<Post> GetEntityByIdAsync(Guid id)
        {
            var queryable = await Repository.WithDetailsAsync(i => i.Tags, i => i.Category);
            return await AsyncExecuter.FirstOrDefaultAsync(queryable.Where(i => i.Id == id));
        }
        public override async Task<PostDto> GetAsync(Guid id)
        {
            var post = await base.GetAsync(id);
            return post;
        }
        public override async Task<PostDto> CreateAsync(CreateOrUpdatePostDto input)
        {
            await CheckCreatePolicyAsync();

            var tags = await readOnlyTagRepo.GetListAsync(i => input.Tags.Contains(i.Id));
            var entity = await MapToEntityAsync(input);
            entity.Tags = tags;
            TryToSetTenantId(entity);

            await Repository.InsertAsync(entity, autoSave: true);

            return await MapToGetOutputDtoAsync(entity);
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
    }
}
