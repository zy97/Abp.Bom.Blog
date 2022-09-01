using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories.AdminDtos
{
    public class CategoryDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
