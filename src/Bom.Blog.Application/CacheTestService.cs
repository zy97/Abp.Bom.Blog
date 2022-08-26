using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;

namespace Bom.Blog
{
    public class CacheTestService : ApplicationService, ICacheTestService
    {
        private readonly IDistributedCache<TestCacheItem> distributedCache;

        public CacheTestService(IDistributedCache<TestCacheItem> distributedCache)
        {
            this.distributedCache = distributedCache;
        }

        public async Task<object> GetCacheAsync()
        {
            var cache = await distributedCache.GetAsync("test");
            if (cache is null)
                return "No Cache";
            return cache;
        }
        public async Task SetCacheAsync()
        {
            await distributedCache.SetAsync("test", new TestCacheItem { CachedDateTime = DateTime.Now }, new Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1) });

        }
    }
    public class TestCacheItem
    {
        public DateTime CachedDateTime { get; set; }
    }
}
