using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
{
    public class TagLookupDto : EntityDto<Guid>
    {
        public string DisplayName { get; set; }
    }
}
