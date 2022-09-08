using System.Threading.Tasks;

namespace Bom.Blog.Servives
{
    public class CacheRemoveService : ICacheRemoveService
    {
        public async Task RemoveAsync<T>(string key, int cursor = 0)
        {
            var keys = await RedisHelper.KeysAsync($"*{nameof(T)}*{key}");
            await RedisHelper.DelAsync(keys);
        }
    }
}
