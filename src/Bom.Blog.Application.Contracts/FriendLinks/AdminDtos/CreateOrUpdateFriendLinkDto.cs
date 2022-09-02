using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.FriendLinks.AdminDtos
{
    public class CreateOrUpdateFriendLinkDto
    {
        [Required]
        [StringLength(FriendLinkConst.MaxNameLength)]
        public string Name { get; set; }
        [Required]
        [StringLength(FriendLinkConst.MaxUrlLength)]
        public string Url { get; set; }
    }
}
