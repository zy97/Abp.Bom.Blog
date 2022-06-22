using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tags
{
    public class Tag : FullAuditedAggregateRoot<Guid>
    {
        public string TagName { get; set; }
        public string DisplayName { get; set; }
    }
}
