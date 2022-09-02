using Bom.Blog.Categories.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Caching;
namespace Bom.Blog.Categories
{
    public class CategoryService : BlogAppService, ICategoryService
    {
        private readonly IDistributedCache<IEnumerable<CategoryWithCountDto>> cache;
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(IDistributedCache<IEnumerable<CategoryWithCountDto>> cache, ICategoryRepository categoryRepository)
        {
            this.cache = cache;
            this.categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<CategoryWithCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var categories = await categoryRepository.GetWithPostCountAsync();
                return ObjectMapper.Map<IEnumerable<Category>, IEnumerable<CategoryWithCountDto>>(categories);
            });
            return result;
        }
    }

}
