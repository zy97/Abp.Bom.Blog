using Bom.Blog.Categories.AdminDtos;
using System;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Categories
{
    public interface ICategoryAdminService : ICrudAppService<CategoryDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateCategoryDto>
    {
    }
}
