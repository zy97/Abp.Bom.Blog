using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.Dtos
{
    public class PostBriefDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public DateTime CreationiTime { get; set; }
        public int Year { get; set; }
    }
}
