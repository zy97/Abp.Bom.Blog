using Bom.Blog.Posts;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }

        public List<Post> Posts { get; set; }
    }
}
