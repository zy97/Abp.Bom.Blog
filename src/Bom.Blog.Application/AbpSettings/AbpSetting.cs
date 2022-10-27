using Bom.Blog.Abp.Setting;
using Bom.Blog.Permissions;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;

namespace Bom.Blog.AbpSettings
{
    [Authorize(BlogPermissions.SystemSetting.Default)]
    public class AbpSetting : BlogAppService
    {
        private readonly IDistributedEventBus distributedEventBus;
        private readonly ISettingManager settingManager;

        public AbpSetting(IDistributedEventBus distributedEventBus, ISettingManager settingManager)
        {
            this.distributedEventBus = distributedEventBus;
            this.settingManager = settingManager;
        }
        public async Task ChangeSettingAsync(AbpSettingDto setting)
        {
            //AccountSettingNames.
            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = setting.Key,
                Value = setting.Value
            });
        }
    }
}
