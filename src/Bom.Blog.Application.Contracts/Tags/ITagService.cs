using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Tags
{
    public interface ITagService : IApplicationService
    {
        Task<TagDto> GetByNameAsync(string tagName);
        Task<List<TagCountDto>> GetCountAsync();
    }
}
