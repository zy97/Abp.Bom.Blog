using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Bom.Blog.Servives
{
    public interface ICacheRemoveService : ISingletonDependency
    {
        Task RemoveAsync<T>(string key, int cursor = 0);
    }
}
