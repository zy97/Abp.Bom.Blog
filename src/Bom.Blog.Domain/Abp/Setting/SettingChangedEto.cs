using System;
using Volo.Abp.EventBus;

namespace Bom.Blog.Abp.Setting
{
    [EventName("Abp.Setting.IsSelfRegistrationEnabledChange")]
    public class SettingChangedEto
    {
        public DateTime Time { get; set; }
    }
}
