using Bom.Blog.Abp.Setting;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Volo.Abp.Caching;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;
using Volo.Abp.Uow;

namespace Bom.Blog.EventHandlers
{
    public class SettingHandler : IDistributedEventHandler<SettingChangedEto>, ITransientDependency
    {
        private readonly ISettingManager settingManager;
        private readonly ILogger<SettingHandler> logger;
        private readonly IDistributedCache<SettingCacheItem, string> distributedCache;

        public SettingHandler(ISettingManager settingManager, ILogger<SettingHandler> logger, IDistributedCache<SettingCacheItem, string> distributedCache)
        {
            this.settingManager = settingManager;
            this.logger = logger;
            this.distributedCache = distributedCache;
        }
        [UnitOfWork]
        public virtual async Task HandleEventAsync(SettingChangedEto eventData)
        {
            await settingManager.SetGlobalAsync(eventData.Name, eventData.Value);
        }
    }
}
