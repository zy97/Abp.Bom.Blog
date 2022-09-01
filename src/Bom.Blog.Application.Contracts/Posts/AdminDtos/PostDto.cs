using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts.AdminDtos
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
        /// 分类
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        /// 标签列表
        /// </summary>
        public IEnumerable<string> Tags { get; set; }

    }
}
