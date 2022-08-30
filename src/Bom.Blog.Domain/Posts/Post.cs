using Bom.Blog.Categories;
using Bom.Blog.Tags;
using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Posts
{
    /// <summary>
    /// 发票文章
    /// </summary>
    public class Post : FullAuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Markdown { get; set; }
        public Category Category { get; set; }
        public Guid CategoryId { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
