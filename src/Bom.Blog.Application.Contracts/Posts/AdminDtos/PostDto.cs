﻿using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
{
    public class PostDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Markdown { get; set; }
        public virtual string CategoryName { get; set; }
        public virtual IEnumerable<string> Tags { get; set; }
    }
}
