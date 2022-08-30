using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.FriendLinks
{
    public class FriendLink : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
