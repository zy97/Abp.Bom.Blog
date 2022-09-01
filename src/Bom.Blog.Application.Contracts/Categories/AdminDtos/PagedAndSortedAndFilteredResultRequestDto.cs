using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Categories.AdminDtos
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }
}
