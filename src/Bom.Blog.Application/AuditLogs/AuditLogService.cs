using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.AuditLogging;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.AuditLogs
{

    public class AuditLogService : ReadOnlyAppService<AuditLog, AuditLogDto, Guid, PagedAndSortedAndFilteredResultRequestDto>, IAuditLogService
    {
        public AuditLogService(IRepository<AuditLog, Guid> repository) : base(repository)
        {
        }
        //如果不需要过滤删除这个重载，属性判断根据自己的情况酌情调整
        protected override async Task<IQueryable<AuditLog>> CreateFilteredQueryAsync(PagedAndSortedAndFilteredResultRequestDto input)
        {
            var queryable = await this.ReadOnlyRepository.GetQueryableAsync().ConfigureAwait(false);
            queryable = queryable.WhereIf(!string.IsNullOrWhiteSpace(input.UserName), i => i.UserName.Contains(input.UserName));
            //throw new NotImplementedException("属性ExecutionTime为DateTime类型需自己实现过滤");
            //throw new NotImplementedException("属性ExecutionDuration为int类型需自己实现过滤");
            //throw new NotImplementedException("属性string为virtual类型需自己实现过滤");
            //throw new NotImplementedException("属性string为virtual类型需自己实现过滤");
            //throw new NotImplementedException("属性string为virtual类型需自己实现过滤");
            return queryable;
        }
    }

}
