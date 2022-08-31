using Bom.Blog.Permissions;
using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Categories
{
    public class CategoryService : BlogAppService, ICategoryService
    {
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Post, Guid> postRepo;
        private readonly IDistributedCache<IEnumerable<CategoryCountDto>> cache;

        public CategoryService(IRepository<Category, Guid> categoryRepo, IRepository<Post, Guid> postRepo, IDistributedCache<IEnumerable<CategoryCountDto>> cache)
        {
            this.categoryRepo = categoryRepo;
            this.postRepo = postRepo;
            this.cache = cache;
        }
        public async Task<IEnumerable<CategoryCountDto>> GetCountAsync()
        {
            var result = await cache.GetOrAddAsync("all", async () =>
            {
                var query = await categoryRepo.WithDetailsAsync(i => i.Posts);
                var categoryQuery = query.Select(i => new CategoryCountDto { Id = i.Id, Name = i.Name, DisplayName = i.DisplayName, Count = i.Posts.Count });

                var result = await AsyncExecuter.ToListAsync(categoryQuery);
                return result;
            });
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
            this.GetPolicyName = BlogPermissions.Admin.Default;
            this.GetListPolicyName = BlogPermissions.Admin.Default;
            this.UpdatePolicyName = BlogPermissions.Admin.Update;
            this.CreatePolicyName = BlogPermissions.Admin.Create;
            this.DeletePolicyName = BlogPermissions.Admin.Delete;
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
