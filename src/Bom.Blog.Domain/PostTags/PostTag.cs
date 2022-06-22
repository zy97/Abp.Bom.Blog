using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.PostTags
{
    public class PostTag : FullAuditedAggregateRoot<Guid>
    {
        public Guid PostId { get; set; }
        public Guid TagId { get; set; }
    }
}
