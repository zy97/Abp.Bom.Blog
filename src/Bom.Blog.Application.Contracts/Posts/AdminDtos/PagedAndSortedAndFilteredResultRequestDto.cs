using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Markdown { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? TagId { get; set; }
    }
}
