using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Tags
{
    public class TagDto : EntityDto<Guid>
    {
        public string TagName { get; set; }
        public string DisplayName { get; set; }
    }
    public class AdminTagDto : EntityDto<Guid>
    {
        public string TagName { get; set; }
        public string DisplayName { get; set; }
    }
    public class TagSelectOptionDto : EntityDto<Guid>
    {
        public string DisplayName { get; set; }
    }
}
