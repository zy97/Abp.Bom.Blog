using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Tags
{
    public class TagDto : EntityDto<Guid>
    {
        public string TagName { get; set; }
        public string DisplayName { get; set; }
    }
}
