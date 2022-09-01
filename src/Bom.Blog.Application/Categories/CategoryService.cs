using Bom.Blog.Categories.Dtos;
using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Categories
{
    public class CategoryService : BlogAppService, ICategoryService
    {
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Post, Guid> postRepo;
        private readonly IDistributedCache<IEnumerable<CategoryWithCountDto>> cache;
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(IRepository<Category, Guid> categoryRepo, IRepository<Post, Guid> postRepo, IDistributedCache<IEnumerable<CategoryWithCountDto>> cache, ICategoryRepository categoryRepository)
        {
            this.categoryRepo = categoryRepo;
            this.postRepo = postRepo;
            this.cache = cache;
            this.categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<CategoryWithCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var categories = await categoryRepository.GetWithPostCount();
                return ObjectMapper.Map<IEnumerable<Category>, IEnumerable<CategoryWithCountDto>>(categories);
            });
            return result;
        }
        public async Task<CategoryDto> GetByNameAsync(string categoryName)
        {
            var res = await categoryRepo.GetAsync(i => i.Name == categoryName);
            return ObjectMapper.Map<Category, CategoryDto>(res);
        }
    }

}
