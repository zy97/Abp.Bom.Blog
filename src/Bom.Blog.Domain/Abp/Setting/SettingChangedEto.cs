using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.EventBus;

namespace Bom.Blog.Abp.Setting
{
    [EventName("Abp.Setting.IsSelfRegistrationEnabledChange")]
    public class SettingChangedEto : EtoBase
    {
        public string ProviderName { get; set; }
        public string ProviderKey { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
