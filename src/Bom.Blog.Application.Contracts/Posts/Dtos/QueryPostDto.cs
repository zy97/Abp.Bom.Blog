using System.Collections.Generic;

namespace Bom.Blog.Posts.Dtos
{
    public class QueryPostDto
    {
        public int Year { get; set; }
        public IEnumerable<PostBriefDto> Posts { get; set; }
    }
}
