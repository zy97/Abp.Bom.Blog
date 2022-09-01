using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.FriendLinks.AdminDtos
{
    public class CreateOrUpdateFriendLinkDto
    {
        [Required]
        [StringLength(FriendLinkConst.MaxNameLength)]
        public string Title { get; set; }
        [Required]
        [StringLength(FriendLinkConst.MaxUrlLength)]
        public string LinkUrl { get; set; }
    }
}
