using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories.AdminDtos
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}
