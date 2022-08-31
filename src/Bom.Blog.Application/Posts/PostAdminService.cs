using Bom.Blog.Categories;
using Bom.Blog.Permissions;
using Bom.Blog.Tags;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Posts
{
    public class PostAdminService : CrudAppService<Post, PostAdminDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdatePostDto>, IAdminPostService
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
        public override async Task<PagedResultDto<PostAdminDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            await CheckGetListPolicyAsync();

            var query = await CreateFilteredQueryAsync(input);
            var totalCount = await AsyncExecuter.CountAsync(query);
            query = await ReadOnlyRepository.WithDetailsAsync(i => i.Category, i => i.Tags);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncExecuter.ToListAsync(query);
            var entityDtos = await MapToGetListOutputDtosAsync(entities);

            return new PagedResultDto<PostAdminDto>(
                totalCount,
                entityDtos
            );
        }
        public override async Task<PostAdminDto> GetAsync(Guid id)
        {
            var post = await base.GetAsync(id);
            post.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(await FindPostTagsAsync(post.Id));
            return post;
        }
        public override async Task<PostAdminDto> CreateAsync(CreateOrUpdatePostDto input)
        {
            var post = await base.CreateAsync(input);
            await SavePostTagsAsync(post.Id, input.TagIds);
            post.Category = ObjectMapper.Map<Category, CategoryAdminDto>(await FindPostCategoryAsync(input.CategoryId));
            post.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(await FindPostTagsAsync(post.Id));
            return post;
        }
        private async Task<List<Tag>> FindPostTagsAsync(Guid postId)
        {
            //var tagIds = await postTagRepo.GetListAsync(i => i.PostId == postId);
            //var tagQueryable = await readOnlyTagRepo.GetQueryableAsync();
            //var tags = await AsyncExecuter.ToListAsync(tagQueryable.Where($"Id in @0", tagIds.Select(i => i.TagId).ToArray()));
            //return tags;
            return default;
        }
        private async Task<Category> FindPostCategoryAsync(Guid categoryId)
        {
            var category = await readOnlyCategoryRepo.FindAsync(categoryId);
            return category;
        }
        private async Task SavePostTagsAsync(Guid postId, IEnumerable<Guid> tagIds)
        {
            //await postTagRepo.InsertManyAsync(tagIds.Select(i => new PostTag { PostId = postId, TagId = i }), true);
        }
    }
}
