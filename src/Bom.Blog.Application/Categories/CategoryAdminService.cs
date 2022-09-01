using Bom.Blog.Categories.AdminDtos;
using Bom.Blog.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Categories
{
    public class CategoryAdminService : CrudAppService<Category, CategoryDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateCategoryDto>, ICategoryAdminService
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly CategoryManager categoryManager;

        public CategoryAdminService(IRepository<Category, Guid> repository, ICategoryRepository categoryRepository, CategoryManager categoryManager) : base(repository)
        {
            this.GetPolicyName = BlogPermissions.Admin.Default;
            this.GetListPolicyName = BlogPermissions.Admin.Default;
            this.UpdatePolicyName = BlogPermissions.Admin.Update;
            this.CreatePolicyName = BlogPermissions.Admin.Create;
            this.DeletePolicyName = BlogPermissions.Admin.Delete;
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
            if (category.Name != input.Name)
            {
                await categoryManager.ChangeAsync(category, input.Name, input.DisplayName);
            }
            await categoryRepository.UpdateAsync(category);
            return ObjectMapper.Map<Category, CategoryDto>(category);
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
