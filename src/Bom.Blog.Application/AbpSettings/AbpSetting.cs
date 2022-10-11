using Bom.Blog.Abp.Setting;
using System;
using System.Threading.Tasks;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;

namespace Bom.Blog.AbpSettings
{
    public class AbpSetting : BlogAppService
    {
        private readonly ISettingManager settingManager;
        private readonly IDistributedEventBus distributedEventBus;

        public AbpSetting(ISettingManager settingManager, IDistributedEventBus distributedEventBus)
        {
            this.settingManager = settingManager;
            this.distributedEventBus = distributedEventBus;
        }
        public virtual async Task TestAsync()
        {
            //await settingManager.SetGlobalAsync("Abp.Account.IsSelfRegistrationEnabled", "false");
            await distributedEventBus.PublishAsync(new SettingChangedEto() { Time = DateTime.Now });
        }
        public async Task Test1Async()
        {
            //await settingManager.SetGlobalAsync("Abp.Account.IsSelfRegistrationEnabled", "true");
        }
    }
}
