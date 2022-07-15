using System;
using System.Collections.Generic;

namespace Bom.Blog.Posts
{
    public class UpdatePostInputDto
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
        public Guid CategoryId { get; set; }

        /// <summary>
        /// 标签列表
        /// </summary>
        public IEnumerable<Guid> TagIds { get; set; }
    }
}
