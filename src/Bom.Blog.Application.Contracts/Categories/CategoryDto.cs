using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories
{
    public class CategoryAdminDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
    public class CategorySelectOptionDto : EntityDto<Guid>
    {
        public string DisplayName { get; set; }
    }
}
