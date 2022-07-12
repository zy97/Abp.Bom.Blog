using Volo.Abp.Application.Dtos;

namespace Bom.Blog.FriendLinks
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Title { get; set; }
        public string LinkUrl { get; set; }
    }
}
