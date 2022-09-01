using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.Dtos
{
    public class GetPostByCategoryNameListDto : PagedResultRequestDto
    {
        public string CategoryName { get; set; }
    }
}
