using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                        group r by new { category.Name, category.DisplayName } into g
                        select new CategoryCountDto { CategoryName = g.Key.Name, DisplayName = g.Key.DisplayName, Count = g.Count(i => !string.IsNullOrWhiteSpace(i.Title)) };

            var result = await AsyncExecuter.ToListAsync(query);
            return result;

        }
        public async Task<CategoryDto> GetByNameAsync(string categoryName)
        {
            var res = await categoryRepo.GetAsync(i => i.Name == categoryName);
            return ObjectMapper.Map<Category, CategoryDto>(res);
        }
    }
    public class AdminCategoryService : CrudAppService<Category, CategoryAdminDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateCategoryDto>, IAdminCategoryService
    {
        public AdminCategoryService(IRepository<Category, Guid> repository) : base(repository)
        {
        }
        public async Task<List<CategorySelectOptionDto>> GetAllCategories()
        {
            var categories = await this.ReadOnlyRepository.GetListAsync();
            return ObjectMapper.Map<List<Category>, List<CategorySelectOptionDto>>(categories);
        }

        protected override async Task<IQueryable<Category>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.CategoryName), i => i.Name.Contains(input.CategoryName));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.DisplayName), i => i.DisplayName.Contains(input.DisplayName));
            return queryable;
        }
    }
}
