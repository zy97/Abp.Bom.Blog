using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories
{
    public class CategoryDto : EntityDto<Guid>
    {
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }
    public class CategoryAdminDto : EntityDto<Guid>
    {
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }
    public class CategorySelectOptionDto : EntityDto<Guid>
    {
        public string DisplayName { get; set; }
    }
}
