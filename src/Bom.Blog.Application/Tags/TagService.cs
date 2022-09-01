using Bom.Blog.Tags.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Tags
{
    public class TagService : BlogAppService, ITagService
    {
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IDistributedCache<IEnumerable<TagWithCountDto>> cache;

        public TagService(IRepository<Tag, Guid> tagRepo, IDistributedCache<IEnumerable<TagWithCountDto>> cache)
        {
            this.tagRepo = tagRepo;
            this.cache = cache;
        }
        public async Task<IEnumerable<TagWithCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var query = await tagRepo.WithDetailsAsync(i => i.Posts);
                var categoryQuery = query.Select(i => new TagWithCountDto { Name = i.Name, DisplayName = i.DisplayName, Count = i.Posts.Count });

                var result = await AsyncExecuter.ToListAsync(categoryQuery);
                return result;
            });
            return result;
        }
        public async Task<TagDto> GetByNameAsync(string tagName)
        {
            var res = await tagRepo.GetAsync(i => i.Name == tagName);
            return ObjectMapper.Map<Tag, TagDto>(res);
        }
    }

}
