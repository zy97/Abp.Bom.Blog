using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
{
    public class PostEditDto : EntityDto<Guid>
    {
        public string Title { get; set; }

        public string Author { get; set; }
        public string Markdown { get; set; }
        public Guid CategoryId { get; set; }
        public IEnumerable<Guid> Tags { get; set; }
    }
}
