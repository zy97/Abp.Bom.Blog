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
        public override async Task<PostAdminDto> CreateAsync(CreatePostInputDto input)
        {
            var post = await base.CreateAsync(input);
            await postTagRepo.InsertManyAsync(input.TagIds.Select(i => new PostTag { PostId = post.Id, TagId = i }), true);
            var category = await readOnlyCategoryRepo.FindAsync(input.CategoryId);
            post.Category = ObjectMapper.Map<Category, CategoryDto>(category);
            var tagIds = await postTagRepo.GetListAsync(i => i.PostId == post.Id);
            var tagQueryable = await readOnlyTagRepo.GetQueryableAsync();
            var tags = await AsyncExecuter.ToListAsync(tagQueryable.Where($"Id in @0", tagIds.Select(i => i.TagId).ToArray()));
            post.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(tags);
            return post;
        }
    }
}
