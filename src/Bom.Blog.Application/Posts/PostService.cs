using Bom.Blog.Posts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Json;

namespace Bom.Blog.Posts
{
    public class PostService : ApplicationService, IPostService
    {
        private readonly IPostRepository repository;
        private readonly IDistributedCache<PagedResultDto<QueryPostDto>> pageCache;
        private readonly IJsonSerializer serializer;
        private readonly IDistributedCache<PostDto, Guid> postCache;

        public PostService(IPostRepository repository, IDistributedCache<PagedResultDto<QueryPostDto>> pageCache, IJsonSerializer serializer, IDistributedCache<PostDto, Guid> postCache)
        {
            this.repository = repository;
            this.pageCache = pageCache;
            this.serializer = serializer;
            this.postCache = postCache;
        }
        public async Task<PagedResultDto<QueryPostDto>> GetListAsync(GetPostListDto input)
        {
            var key = serializer.Serialize(input);
            var result = await pageCache.GetOrAddAsync(key, async () =>
             {
                 var posts = await repository.GetListAsync(input.SkipCount, input.MaxResultCount);
                 var items = posts.items.GroupBy(i => i.CreationTime.Year).Select(i => new QueryPostDto { Year = i.Key, Posts = ObjectMapper.Map<IEnumerable<Post>, IEnumerable<PostBriefDto>>(i) }).ToList();
                 return new PagedResultDto<QueryPostDto>(posts.count, items);
             });
            return result;
        }
        public async Task<PagedResultDto<QueryPostDto>> GetListByCategoryNameAsync(GetPostByCategoryNameListDto input)
        {
            var result = await pageCache.GetOrAddAsync(serializer.Serialize(input), async () =>
            {
                var posts = await repository.GetListByCategoryNameAsync(input.CategoryName, input.SkipCount, input.MaxResultCount);
                var items = posts.items.GroupBy(i => i.CreationTime.Year).Select(i => new QueryPostDto { Year = i.Key, Posts = ObjectMapper.Map<IEnumerable<Post>, IEnumerable<PostBriefDto>>(i) }).ToList();
                return new PagedResultDto<QueryPostDto>(posts.count, items);
            });
            return result;
        }
        public async Task<PagedResultDto<QueryPostDto>> GetListByTagNameAsync(GetPostByTagNameListDto input)
        {
            var result = await pageCache.GetOrAddAsync(serializer.Serialize(input), async () =>
            {
                var posts = await repository.GetListByTagNameAsync(input.TagName, input.SkipCount, input.MaxResultCount);
                var items = posts.items.GroupBy(i => i.CreationTime.Year).Select(i => new QueryPostDto { Year = i.Key, Posts = ObjectMapper.Map<IEnumerable<Post>, IEnumerable<PostBriefDto>>(i) }).ToList();
                return new PagedResultDto<QueryPostDto>(posts.count, items);
            });
            return result;
        }
        public async Task<PostDto> GetAsync(Guid id)
        {
            var result = await postCache.GetOrAddAsync(id, async () =>
             {
                 var post = await this.repository.GetAsync(id);
                 var postDto = ObjectMapper.Map<Post, PostDto>(post);
                 postDto.Next = ObjectMapper.Map<Post, PostPagedDto>(await repository.GetNextAsync(post.CreationTime));
                 postDto.Previous = ObjectMapper.Map<Post, PostPagedDto>(await repository.GetPreviousAsync(post.CreationTime));
                 return postDto;
             });
            return result;
        }
    }
}
