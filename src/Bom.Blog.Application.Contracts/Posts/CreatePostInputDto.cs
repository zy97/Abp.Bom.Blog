using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bom.Blog.Posts
{
    public class CreateOrUpdatePostDto
    {
        [Required]
        [StringLength(PostConst.MaxTitleLength)]
        public string Title { get; set; }
        [Required]
        [StringLength(PostConst.MaxAuthorLength)]
        public string Author { get; set; }
        [Required]
        public string Markdown { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public IEnumerable<Guid> TagIds { get; set; }
    }
}
