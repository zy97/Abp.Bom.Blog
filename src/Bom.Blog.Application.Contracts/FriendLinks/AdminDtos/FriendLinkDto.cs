using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.FriendLinks.AdminDtos
{
    public class FriendLinkDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string LinkUrl { get; set; }
    }
}
