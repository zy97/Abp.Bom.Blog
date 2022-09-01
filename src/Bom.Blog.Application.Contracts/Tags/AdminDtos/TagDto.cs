using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Tags.AdminDtos
{
    public class TagDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
