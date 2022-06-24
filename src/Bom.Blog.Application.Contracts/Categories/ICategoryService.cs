using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Categories
{
    public interface ICategoryService : IApplicationService
    {
        Task<IEnumerable<CategoryCountDto>> GetCountAsync();
    }
    public interface IAdminCategoryService : ICrudAppService<CategoryAdminDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdateCategoryDto>
    {
    }
}
