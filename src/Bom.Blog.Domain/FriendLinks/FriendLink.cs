using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.FriendLinks
{
    public class FriendLink : FullAuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string LinkUrl { get; set; }
    }
}
