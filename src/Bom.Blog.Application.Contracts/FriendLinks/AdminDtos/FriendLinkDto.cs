using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.FriendLinks.AdminDtos
{
    public class FriendLinkDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
