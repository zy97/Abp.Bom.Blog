using Bom.Blog.Abp.Setting;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;

namespace Bom.Blog.EventHandlers
{
    public class SettingHandler : IDistributedEventHandler<SettingChangedEto>, ITransientDependency
    {
        private readonly ISettingManager settingManager;

        public SettingHandler(ISettingManager settingManager)
        {
            this.settingManager = settingManager;
        }
        public Task HandleEventAsync(SettingChangedEto eventData)
        {
            return Task.CompletedTask;
        }
    }
}
