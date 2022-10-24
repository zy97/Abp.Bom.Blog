using Bom.Blog.Abp.Setting;
using System.Threading.Tasks;
using Volo.Abp.Account.Settings;
using Volo.Abp.EventBus.Distributed;

namespace Bom.Blog.AbpSettings
{
    public class AbpSetting : BlogAppService
    {
        private readonly IDistributedEventBus distributedEventBus;

        public AbpSetting(IDistributedEventBus distributedEventBus)
        {
            this.distributedEventBus = distributedEventBus;
        }
        public virtual async Task EnableRegisterAsync()
        {
            //var key = SettingCacheItem.CalculateCacheKey(AccountSettingNames.IsSelfRegistrationEnabled, "G", "");

            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = AccountSettingNames.IsSelfRegistrationEnabled,
                ProviderKey = "",
                ProviderName = "G",
                Value = "true"
            });

        }
        public virtual async Task DisableRegisterAsync()
        {
            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = AccountSettingNames.IsSelfRegistrationEnabled,
                ProviderKey = "",
                ProviderName = "G",
                Value = "false"
            });

        }
    }
}
