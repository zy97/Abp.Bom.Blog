using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Tags.Dtos
{
    public class TagDto : EntityDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
