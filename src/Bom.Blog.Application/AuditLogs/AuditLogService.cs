using System;
using System.Linq;
using System.Threading.Tasks;
using Bom.Blog.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.AuditLogging;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.AuditLogs
{
    [Authorize(BlogPermissions.Admin.Default)]
    public class AuditLogService : ReadOnlyAppService<AuditLog, AuditLogDto, Guid, PagedAndSortedAndFilteredResultRequestDto>, IAuditLogService
    {
        public AuditLogService(IRepository<AuditLog, Guid> repository) : base(repository)
        {
        }
        protected override async Task<IQueryable<AuditLog>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.UserName), i => i.UserName.Contains(input.UserName));
            return queryable;
        }
    }

}
