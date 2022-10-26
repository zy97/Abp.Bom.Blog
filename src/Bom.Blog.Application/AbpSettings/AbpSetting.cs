using Bom.Blog.Abp.Setting;
using System.Threading.Tasks;
using Volo.Abp.Account.Settings;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;

namespace Bom.Blog.AbpSettings
{
    public class AbpSetting : BlogAppService
    {
        private readonly IDistributedEventBus distributedEventBus;
        private readonly ISettingManager settingManager;

        public AbpSetting(IDistributedEventBus distributedEventBus, ISettingManager settingManager)
        {
            this.distributedEventBus = distributedEventBus;
            this.settingManager = settingManager;
        }
        public virtual async Task EnableRegisterAsync()
        {
            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = AccountSettingNames.IsSelfRegistrationEnabled,
                Value = "true"
            });
        }
        public virtual async Task DisableRegisterAsync()
        {
            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = AccountSettingNames.IsSelfRegistrationEnabled,
                Value = "false"
            });
        }
    }
}
