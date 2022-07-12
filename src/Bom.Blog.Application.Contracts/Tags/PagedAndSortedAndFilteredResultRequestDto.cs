using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Tags
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string TagName { get; set; }
        public string DisplayName { get; set; }
    }
}
