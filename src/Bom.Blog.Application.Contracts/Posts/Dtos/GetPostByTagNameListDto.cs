using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.Dtos
{
    public class GetPostByTagNameListDto : PagedResultRequestDto
    {
        public string TagName { get; set; }
    }
}
