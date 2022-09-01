using Volo.Abp.Application.Dtos;

namespace Bom.Blog.FriendLinks.Dtos
{
    public class FriendLinkDto : EntityDto
    {
        public string Title { get; set; }
        public string LinkUrl { get; set; }
    }
}
