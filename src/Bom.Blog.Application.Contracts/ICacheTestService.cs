using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog
{
    public interface ICacheTestService : IApplicationService
    {
        Task<object> GetCacheAsync();
        Task SetCacheAsync();
    }
}
