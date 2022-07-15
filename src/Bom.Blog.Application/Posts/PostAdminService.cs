using Bom.Blog.Categories;
using Bom.Blog.PostTags;
using Bom.Blog.Tags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Posts
{
    public class PostAdminService : CrudAppService<Post, PostAdminDto, Guid, PagedAndSortedResultRequestDto, CreatePostInputDto, UpdatePostInputDto>, IAdminPostService
    {
        private readonly IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo;
        private readonly IRepository<PostTag, Guid> postTagRepo;
        private readonly IReadOnlyRepository<Tag, Guid> readOnlyTagRepo;

        public PostAdminService(IRepository<Post, Guid> repository, IReadOnlyRepository<Category, Guid> readOnlyCategoryRepo,
            IRepository<PostTag, Guid> readOnlyPostTagRepo,
            IReadOnlyRepository<Tag, Guid> readOnlyTagRepo) : base(repository)
        {
            this.readOnlyCategoryRepo = readOnlyCategoryRepo;
            this.postTagRepo = readOnlyPostTagRepo;
            this.readOnlyTagRepo = readOnlyTagRepo;
        }
        public override async Task<PagedResultDto<PostAdminDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var posts = await base.GetListAsync(input);
            foreach (var post in posts.Items)
            {
                post.Category = ObjectMapper.Map<Category, CategoryDto>(await FindPostCategoryAsync(post.Category.Id));
                post.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(await FindPostTagsAsync(post.Id));
            }
            //posts.Items.Select(async post =>
            //{

            //    return post;
            //});
            return posts;
        }
        public override async Task<PostAdminDto> CreateAsync(CreatePostInputDto input)
        {
            var post = await base.CreateAsync(input);
            await SavePostTagsAsync(post.Id, input.TagIds);
            post.Category = ObjectMapper.Map<Category, CategoryDto>(await FindPostCategoryAsync(input.CategoryId));
            post.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(await FindPostTagsAsync(post.Id));
            return post;
        }
        private async Task<List<Tag>> FindPostTagsAsync(Guid postId)
        {
            var tagIds = await postTagRepo.GetListAsync(i => i.PostId == postId);
            var tagQueryable = await readOnlyTagRepo.GetQueryableAsync();
            var tags = await AsyncExecuter.ToListAsync(tagQueryable.Where($"Id in @0", tagIds.Select(i => i.TagId).ToArray()));
            return tags;
        }
        private async Task<Category> FindPostCategoryAsync(Guid categoryId)
        {
            var category = await readOnlyCategoryRepo.FindAsync(categoryId);
            return category;
        }
        private async Task SavePostTagsAsync(Guid postId, IEnumerable<Guid> tagIds)
        {
            await postTagRepo.InsertManyAsync(tagIds.Select(i => new PostTag { PostId = postId, TagId = i }), true);
        }
    }
}
