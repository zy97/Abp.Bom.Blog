using System;
using Volo.Abp.Application.Services;

namespace Bom.Blog.AuditLogs
{

    public interface IAuditLogService : IReadOnlyAppService<AuditLogDto, Guid, PagedAndSortedAndFilteredResultRequestDto>
    {
    }

}