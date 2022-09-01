using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
{
    public class CategoryLookupDto : EntityDto<Guid>
    {
        public string DisplayName { get; set; }
    }
}
