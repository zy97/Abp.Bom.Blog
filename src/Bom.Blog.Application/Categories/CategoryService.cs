using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Categories
{
    public class CategoryService : BlogAppService, ICategoryService
    {
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Post, Guid> postRepo;

        public CategoryService(IRepository<Category, Guid> categoryRepo, IRepository<Post, Guid> postRepo)
        {
            this.categoryRepo = categoryRepo;
            this.postRepo = postRepo;
        }
        public async Task<IEnumerable<CategoryCountDto>> GetCountAsync()
        {
            var query = from category in await categoryRepo.GetQueryableAsync()
                        join post in await postRepo.GetQueryableAsync() on category.Id equals post.CategoryId into res
                        from r in res.DefaultIfEmpty()
                        group r by new { category.CategoryName, category.DisplayName } into g
                        select new CategoryCountDto { CategoryName = g.Key.CategoryName, DisplayName = g.Key.DisplayName, Count = g.Count(i => !string.IsNullOrWhiteSpace(i.Title)) };

            var result = await AsyncExecuter.ToListAsync(query);
            return result;

        }
        public async Task<CategoryDto> GetByNameAsync(string categoryName)
        {
            var res = await categoryRepo.GetAsync(i => i.CategoryName == categoryName);
            return ObjectMapper.Map<Category, CategoryDto>(res);
        }
    }
    public class AdminCategoryService : CrudAppService<Category, CategoryAdminDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdateCategoryDto>, IAdminCategoryService
    {
        public AdminCategoryService(IRepository<Category, Guid> repository) : base(repository)
        {
        }
    }
}
