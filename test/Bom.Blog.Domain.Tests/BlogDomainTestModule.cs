using Bom.Blog.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Bom.Blog;

[DependsOn(
    typeof(BlogEntityFrameworkCoreTestModule)
    )]
public class BlogDomainTestModule : AbpModule
{

}
