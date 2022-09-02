using Volo.Abp.Application.Dtos;

namespace Bom.Blog.FriendLinks.AdminDtos
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Name { get; set; }
    }
}
