using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories.Dtos
{
    public class CategoryDto : EntityDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
