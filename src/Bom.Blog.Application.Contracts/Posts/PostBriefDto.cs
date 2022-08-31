using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts
{
    public class PostBriefDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public DateTime CreationiTime { get; set; }
        public int Year { get; set; }
    }
    public class QueryPostDto
    {
        public int Year { get; set; }
        public IEnumerable<PostBriefDto> Posts { get; set; }
    }
}
