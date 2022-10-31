using Bom.Blog.Categories.AdminDtos;
using Bom.Blog.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using CategoryDto = Bom.Blog.Categories.AdminDtos.CategoryDto;

namespace Bom.Blog.Categories
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class CategoryAdminService : CrudAppService<Category, CategoryDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateCategoryDto>, ICategoryAdminService
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly CategoryManager categoryManager;

        public CategoryAdminService(ICategoryRepository categoryRepository, CategoryManager categoryManager) : base(categoryRepository)
        {
            this.categoryRepository = categoryRepository;
            this.categoryManager = categoryManager;
        }
        [Authorize(BlogPermissions.Admin.Create)]
        public override async Task<CategoryDto> CreateAsync(CreateOrUpdateCategoryDto input)
        {
            var category = await categoryManager.CreateAsync(input.Name, input.DisplayName);
            await categoryRepository.InsertAsync(category);
            return ObjectMapper.Map<Category, CategoryDto>(category);
        }
        [Authorize(BlogPermissions.Admin.Update)]
        public override async Task<CategoryDto> UpdateAsync(Guid id, CreateOrUpdateCategoryDto input)
        {
            var category = await categoryRepository.GetAsync(id);
            await categoryManager.ChangeAsync(category, input.Name, input.DisplayName);
            await categoryRepository.UpdateAsync(category);
            return ObjectMapper.Map<Category, CategoryDto>(category);
        }
        [Authorize(BlogPermissions.Admin.Delete)]
        public override async Task DeleteAsync(Guid id)
        {
            await base.DeleteAsync(id);
        }
        protected override async Task<IQueryable<Category>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.Name), i => i.Name.Contains(input.Name));
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.DisplayName), i => i.DisplayName.Contains(input.DisplayName));
            return queryable;
        }
    }
}
