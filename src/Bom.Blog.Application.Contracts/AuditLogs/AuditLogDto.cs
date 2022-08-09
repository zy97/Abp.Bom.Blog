using System;
using Volo.Abp.Application.Dtos;

namespace Bom.Blog.AuditLogs
{
    public class AuditLogDto : EntityDto<Guid>
    {

        public string UserName { get; set; }
        public DateTime ExecutionTime { get; set; }
        public int ExecutionDuration { get; set; }
        public string ClientIpAddress { get; set; }
        public string BrowserInfo { get; set; }
        public string Url { get; set; }

    }
}