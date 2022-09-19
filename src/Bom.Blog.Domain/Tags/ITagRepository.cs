﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Tags
{
    /// <summary>
    /// 这些方法似乎没必要，因为标准仓库有IQueryable，可以直接使用而不是定义自定发方法，处于学习的目的，只是为了演示才使用
    /// <para>但真是情况是定义具体仓库的具体实现,某些更高级的操作在具体的仓库实现方便，比如EfCore仓库</para>
    /// </summary>
    public interface ITagRepository : IRepository<Tag, Guid>
    {
        Task<Tag> FindByNameAsync(string name);
        Task<IEnumerable<Tag>> GetWithPostCountAsync();
    }
}