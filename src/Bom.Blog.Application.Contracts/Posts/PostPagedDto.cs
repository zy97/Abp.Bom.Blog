﻿using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.Posts
{
    public class PostPagedDto : EntityDto<Guid>
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 链接
        /// </summary>
        public string Url { get; set; }
    }
}