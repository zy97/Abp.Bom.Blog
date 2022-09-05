using Bom.Blog.Tags.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Caching;
namespace Bom.Blog.Tags
{
    public class TagService : BlogAppService, ITagService
    {
        private readonly ITagRepository tagRepo;
        private readonly IDistributedCache<IEnumerable<TagWithCountDto>> cache;

        public TagService(ITagRepository tagRepo, IDistributedCache<IEnumerable<TagWithCountDto>> cache)
        {
            this.tagRepo = tagRepo;
            this.cache = cache;
        }
        public async Task<IEnumerable<TagWithCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync(CacheConsts.AllTagWithCount, async () =>
            {
                var tags = await tagRepo.GetWithPostCountAsync();
                return ObjectMapper.Map<IEnumerable<Tag>, IEnumerable<TagWithCountDto>>(tags);
            });
            return result;
        }
    }
}
