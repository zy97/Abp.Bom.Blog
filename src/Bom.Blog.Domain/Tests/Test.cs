using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tests
{
    public class Test : FullAuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Markdown { get; set; }
        public Guid CategoryId { get; set; }
    }
}
