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
        public async Task ChangeRegisterStatusAsync(bool status)
        {
            await distributedEventBus.PublishAsync(new SettingChangedEto()
            {
                Name = AccountSettingNames.IsSelfRegistrationEnabled,
                Value = status.ToString()
            });
        }
        //还不是知道locallogin的作用
        //public async Task ChangeLocalLoginStatusAsync(bool status)
        //{
        //    await distributedEventBus.PublishAsync(new SettingChangedEto()
        //    {
        //        Name = AccountSettingNames.EnableLocalLogin,
        //        Value = status.ToString()
        //    });
        //}
    }
}
