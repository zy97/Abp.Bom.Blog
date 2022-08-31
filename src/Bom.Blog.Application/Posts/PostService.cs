using Bom.Blog.Categories;
using Bom.Blog.Tags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Json;

namespace Bom.Blog.Posts
{
    public class PostService : ApplicationService, IPostService
    {
        private readonly IRepository<Post, Guid> repository;
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IDistributedCache<PagedResultDto<QueryPostDto>> pageCache;
        private readonly IJsonSerializer serializer;
        private readonly IDistributedCache<PostDto, Guid> postCache;

        public PostService(IRepository<Post, Guid> repository, IRepository<Category, Guid> categoryRepo, IRepository<Tag, Guid> tagRepo, IDistributedCache<PagedResultDto<QueryPostDto>> pageCache, IJsonSerializer serializer, IDistributedCache<PostDto, Guid> postCache)
        {
            this.repository = repository;
            this.categoryRepo = categoryRepo;
            this.tagRepo = tagRepo;
            this.pageCache = pageCache;
            this.serializer = serializer;
            this.postCache = postCache;
        }
        public async Task<PagedResultDto<QueryPostDto>> GetListAsync(GetPostListDto input)
        {
            var key = serializer.Serialize(input);
            var result = await pageCache.GetOrAddAsync(key, async () =>
             {
                 var queryable = await repository.GetQueryableAsync();
                 var query = queryable.OrderByDescending(i => i.CreationTime)
                    .Skip(input.SkipCount)
                    .Take(input.MaxResultCount)
                    .Select(i => new PostBriefDto { Id = i.Id, Year = i.CreationTime.Year, Title = i.Title, CreationiTime = i.CreationTime });
                 var queryResult = await AsyncExecuter.ToListAsync(query);
                 var ressult = queryResult.GroupBy(i => i.Year).Select(i => new QueryPostDto { Year = i.Key, Posts = i }).ToList();
                 var totalCount = await repository.GetCountAsync();
                 return new PagedResultDto<QueryPostDto>(totalCount, ressult);
             });
            return result;
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
            var result = await postCache.GetOrAddAsync(id, async () =>
             {
                 var queryable = await repository.WithDetailsAsync(i => i.Category, i => i.Tags);
                 queryable = queryable.Where(i => i.Id == id);
                 var post = await AsyncExecuter.FirstOrDefaultAsync(queryable);

                 var postDto = ObjectMapper.Map<Post, PostDto>(post);
                 queryable = (await repository.GetQueryableAsync()).OrderByDescending(i => i.CreationTime);
                 var previous = queryable.Where(i => i.CreationTime < post.CreationTime);
                 var next = queryable.Where(i => i.CreationTime > post.CreationTime);
                 var previousResult = await AsyncExecuter.FirstOrDefaultAsync(previous);
                 var nextResult = await AsyncExecuter.FirstOrDefaultAsync(next);
                 postDto.Next = ObjectMapper.Map<Post, PostPagedDto>(nextResult);
                 postDto.Previous = ObjectMapper.Map<Post, PostPagedDto>(previousResult);
                 return postDto;
             });
            return result;
        }
    }
}
