using Volo.Abp.Modularity;

namespace Bom.Blog;

[DependsOn(
    typeof(BlogApplicationModule),
    typeof(BlogDomainTestModule)
    )]
public class BlogApplicationTestModule : AbpModule
{

}
