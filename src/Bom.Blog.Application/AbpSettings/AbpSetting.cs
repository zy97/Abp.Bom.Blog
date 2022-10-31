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
        private readonly ISettingManager settingManager;

        public AbpSetting(IDistributedEventBus distributedEventBus, ISettingManager settingManager)
        {
            this.settingManager = settingManager;
        }
        public async Task ChangeSettingAsync(AbpSettingDto setting)
        {
            await settingManager.SetGlobalAsync(setting.Key, setting.Value);
        }
    }
}
