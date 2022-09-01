using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Categories
{
    /// <summary>
    /// 这些方法似乎没必要，因为标准仓库有IQueryable，可以直接使用而不是定义自定发方法，处于学习的目的，只是为了演示才使用
    /// 
    /// </summary>
    public interface ICategoryRepository : IRepository<Category, Guid>
    {
        Task<Category> FindByNameAsync(string name);
        Task<IEnumerable<Category>> GetWithPostCount();
    }
}
