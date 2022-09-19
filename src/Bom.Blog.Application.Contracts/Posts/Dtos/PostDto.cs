﻿using Bom.Blog.Categories.Dtos;
using Bom.Blog.Tags.Dtos;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.Dtos
{
    public class PostDto : EntityDto<Guid>
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 作者
        /// </summary>
        public string Author { get; set; }


        /// <summary>
        /// Markdown
        /// </summary>
        public string Markdown { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string CreationTime { get; set; }

        /// <summary>
        /// 分类
        /// </summary>
        public CategoryDto Category { get; set; }

        /// <summary>
        /// 标签列表
        /// </summary>
        public IEnumerable<TagDto> Tags { get; set; }

        /// <summary>
        /// 上一篇
        /// </summary>
        public PostPagedDto Previous { get; set; }

        /// <summary>
        /// 下一篇
        /// </summary>
        public PostPagedDto Next { get; set; }
    }
}