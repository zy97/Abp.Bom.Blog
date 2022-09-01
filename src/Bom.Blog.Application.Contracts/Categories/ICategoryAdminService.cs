using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Categories
{
    public interface ICategoryAdminService : ICrudAppService<CategoryAdminDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateCategoryDto>
    {
        Task<List<CategorySelectOptionDto>> GetAllCategories();
    }
}
