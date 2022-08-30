using Bom.Blog.Categories;
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
    public class PostService : ApplicationService, IPostService
    {
        private readonly IRepository<Post, Guid> repository;
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Tag, Guid> tagRepo;

        public PostService(IRepository<Post, Guid> repository, IRepository<Category, Guid> categoryRepo, IRepository<Tag, Guid> tagRepo)
        {
            this.repository = repository;
            this.categoryRepo = categoryRepo;
            this.tagRepo = tagRepo;
        }
        public async Task<PagedResultDto<PostBriefDto>> GetListAsync(GetPostListDto input)
        {
            var queryable = await repository.GetQueryableAsync();

            var query = queryable.OrderBy<Post>(nameof(Post.CreationTime))
               .Skip(input.SkipCount)
               .Take(input.MaxResultCount);

            var queryResult = await AsyncExecuter.ToListAsync(query);
            var posts = ObjectMapper.Map<List<Post>, List<PostBriefDto>>(queryResult);

            var totalCount = await repository.GetCountAsync();
            return new PagedResultDto<PostBriefDto>(totalCount, posts);
        }
        public async Task<PagedResultDto<PostBriefDto>> GetListByCategoryNameAsync(GetPostByCategoryNameListDto input)
        {
            var queryable = await repository.GetQueryableAsync();

            var countQueryable = from post in queryable
                                 join category in await categoryRepo.GetQueryableAsync() on post.CategoryId equals category.Id
                                 where category.Name == input.CategoryName
                                 select post;
            var count = await AsyncExecuter.CountAsync(countQueryable);

            var query = countQueryable.OrderBy(nameof(Post.CreationTime))
               .Skip(input.SkipCount)
               .Take(input.MaxResultCount);

            var queryResult = await AsyncExecuter.ToListAsync(query);
            var posts = ObjectMapper.Map<List<Post>, List<PostBriefDto>>(queryResult);

            return new PagedResultDto<PostBriefDto>(count, posts);
        }
        public async Task<PagedResultDto<PostBriefDto>> GetListByTagNameNameAsync(GetPostByTagNameListDto input)
        {
            //var queryable = await repository.GetQueryableAsync();

            //var countQueryable = from postTag in await postTagRepo.GetQueryableAsync()
            //                     join tag in await tagRepo.GetQueryableAsync() on postTag.TagId equals tag.Id
            //                     where tag.Name == input.TagName
            //                     from post in queryable.Where(x => x.Id == postTag.PostId)
            //                     select post;
            //var count = await AsyncExecuter.CountAsync(countQueryable);

            //var query = countQueryable.OrderBy(nameof(Post.CreationTime))
            //   .Skip(input.SkipCount)
            //   .Take(input.MaxResultCount);

            //var queryResult = await AsyncExecuter.ToListAsync(query);
            //var posts = ObjectMapper.Map<List<Post>, List<PostBriefDto>>(queryResult);

            //return new PagedResultDto<PostBriefDto>(count, posts);
            throw new NotImplementedException();
        }
        public async Task<PostDto> GetAsync(Guid id)
        {
            //var queryable = await repository.GetQueryableAsync();

            //var query = from post in queryable
            //            join category in await categoryRepo.GetQueryableAsync() on post.CategoryId equals category.Id
            //            where post.Id == id
            //            select new { post, category };

            //var tags = from postTag in await postTagRepo.GetQueryableAsync()
            //           join tag in await tagRepo.GetQueryableAsync() on postTag.TagId equals tag.Id
            //           where postTag.PostId == id
            //           select tag;

            //var queryResult = await AsyncExecuter.FirstOrDefaultAsync(query);
            //var tagsResult = await AsyncExecuter.ToListAsync(tags);

            //var previous = queryable.OrderByDescending(i => i.CreationTime).Where(i => i.CreationTime <= queryResult.post.CreationTime && i.Id != queryResult.post.Id);

            //var next = queryable.OrderByDescending(i => i.CreationTime).Where(i => i.CreationTime >= queryResult.post.CreationTime && i.Id != queryResult.post.Id);

            //var previousResult = await AsyncExecuter.FirstOrDefaultAsync(previous);
            //var nextResult = await AsyncExecuter.FirstOrDefaultAsync(next);
            //var res = ObjectMapper.Map<Post, PostDto>(queryResult.post);
            //res.Category = ObjectMapper.Map<Category, CategoryDto>(queryResult.category);
            //res.Tags = ObjectMapper.Map<List<Tag>, List<TagDto>>(tagsResult);
            //res.Previous = ObjectMapper.Map<Post, PostPagedDto>(previousResult);
            //res.Next = ObjectMapper.Map<Post, PostPagedDto>(nextResult);
            //return res;
            throw new NotImplementedException();

        }
    }
}
