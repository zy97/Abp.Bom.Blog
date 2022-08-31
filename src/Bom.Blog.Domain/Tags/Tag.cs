using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tags
{
    public class Tag : FullAuditedAggregateRoot<Guid>
    {
        public Tag(Guid id) : base(id)
        {
        }
        public Tag()
        {

        }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
