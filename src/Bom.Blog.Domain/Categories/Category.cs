using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }
}
