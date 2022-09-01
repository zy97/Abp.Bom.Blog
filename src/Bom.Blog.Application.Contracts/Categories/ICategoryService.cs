﻿using Bom.Blog.Categories.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Categories
{
    public interface ICategoryService : IApplicationService
    {
        Task<CategoryDto> GetByNameAsync(string categoryName);
        Task<IEnumerable<CategoryWithCountDto>> GetCountAsync();
    }

}
