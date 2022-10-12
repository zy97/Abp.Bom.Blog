using Bom.Blog.Abp.Setting;
using System;
using System.Threading.Tasks;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.SettingManagement;
using Volo.Abp.Uow;

namespace Bom.Blog.AbpSettings
{
    public class AbpSetting : BlogAppService
    {
        private readonly ISettingManager settingManager;
        private readonly IDistributedEventBus distributedEventBus;
        private readonly IUnitOfWorkManager unitOfWorkManager;

        public AbpSetting(ISettingManager settingManager, IDistributedEventBus distributedEventBus, IUnitOfWorkManager unitOfWorkManager)
        {
            this.settingManager = settingManager;
            this.distributedEventBus = distributedEventBus;
            this.unitOfWorkManager = unitOfWorkManager;
        }
        public virtual async Task TestAsync()
        {
            //await settingManager.SetGlobalAsync("Abp.Account.IsSelfRegistrationEnabled", "false");
            using var uow = unitOfWorkManager.Begin(true, false);
            await distributedEventBus.PublishAsync(new SettingChangedEto() { Time = DateTime.Now });
            await uow.CompleteAsync();

        }
        public async Task Test1Async()
        {
            //await settingManager.SetGlobalAsync("Abp.Account.IsSelfRegistrationEnabled", "true");
        }
    }
    //public class SettingHandler : IDistributedEventHandler<SettingChangedEto>, ITransientDependency
    //{
    //    private readonly ISettingManager settingManager;
    //    private readonly ILogger<SettingHandler> logger;

    //    public SettingHandler(ISettingManager settingManager, ILogger<SettingHandler> logger)
    //    {
    //        this.settingManager = settingManager;
    //        this.logger = logger;
    //    }
    //    [UnitOfWork]
    //    public virtual Task HandleEventAsync(SettingChangedEto eventData)
    //    {
    //        logger.LogInformation("SettingChangedEto");
    //        return Task.CompletedTask;
    //    }
    //}
}
