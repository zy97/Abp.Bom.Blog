using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Tags
{
    public interface ITagRepository : IRepository<Tag, Guid>
    {
        Task<Tag> FindByNameAsync(string name);
        Task<IEnumerable<Tag>> GetWithPostCountAsync();
    }
}
