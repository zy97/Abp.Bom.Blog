using Bom.Blog.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace Bom.Blog.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(BlogEntityFrameworkCoreModule),
    typeof(BlogApplicationContractsModule)
    )]
public class BlogDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
