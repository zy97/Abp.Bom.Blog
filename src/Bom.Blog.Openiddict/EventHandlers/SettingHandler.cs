using Bom.Blog.Abp.Setting;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;

namespace Bom.Blog.EventHandlers
{
    public class SettingHandler : IDistributedEventHandler<SettingChangedEto>, ITransientDependency
    {
        private readonly ISettingManager settingManager;
        private readonly ILogger<SettingHandler> logger;

        public SettingHandler(ISettingManager settingManager, ILogger<SettingHandler> logger)
        {
            this.settingManager = settingManager;
            this.logger = logger;
        }
        public Task HandleEventAsync(SettingChangedEto eventData)
        {
            logger.LogInformation("SettingChangedEto");
            return Task.CompletedTask;
        }
    }
}
