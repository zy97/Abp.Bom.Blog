using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts
{
    public class GetPostListDto : PagedAndSortedResultRequestDto
    {

    }
    public class GetPostByCategoryNameListDto : PagedAndSortedResultRequestDto
    {
        public string CategoryName { get; set; }
    }
    public class GetPostByTagNameListDto : PagedAndSortedResultRequestDto
    {
        public string TagName { get; set; }
    }
}
