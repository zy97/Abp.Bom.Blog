using Bom.Blog.Posts;
using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }

        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}
