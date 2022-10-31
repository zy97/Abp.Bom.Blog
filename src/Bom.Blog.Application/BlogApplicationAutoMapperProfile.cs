using AutoMapper;
using Bom.Blog.AuditLogs;
using Volo.Abp.AuditLogging;

namespace Bom.Blog;

public class BlogApplicationAutoMapperProfile : Profile
{
    public BlogApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<AuditLog, AuditLogDto>();
    }
}
