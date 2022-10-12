using System;
using Volo.Abp.Domain.Entities.Events.Distributed;
using Volo.Abp.EventBus;

namespace Bom.Blog.Abp.Setting
{
    [EventName("Abp.Setting.IsSelfRegistrationEnabledChange")]
    public class SettingChangedEto : EtoBase
    {
        public DateTime Time { get; set; }
    }
}
