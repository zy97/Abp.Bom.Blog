using Volo.Abp.Application.Dtos;
using System;
namespace Bom.Blog.AuditLogs
{
    public class PagedAndSortedAndFilteredResultRequestDto : PagedAndSortedResultRequestDto
    {
        
        public string UserName { get; set; }
        public DateTime ExecutionTime { get; set; }
        public int ExecutionDuration { get; set; }
        public virtual string ClientIpAddress { get; set; }
        public virtual string BrowserInfo { get; set; }
        public virtual string Url { get; set; }
    
    }
}
