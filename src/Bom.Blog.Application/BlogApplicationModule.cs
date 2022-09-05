using CSRedis;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Redis;
using Microsoft.Extensions.DependencyInjection;
using System;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.Caching;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace Bom.Blog;

[DependsOn(
    typeof(BlogDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(BlogApplicationContractsModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
public class BlogApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<BlogApplicationModule>();
        });
        Configure<AbpDistributedCacheOptions>(options =>
        {
            options.GlobalCacheEntryOptions.SlidingExpiration = TimeSpan.FromHours(1);
        });

        var configuration = context.Services.GetConfiguration();
        var csredis = new CSRedisClient(configuration["Redis"]);
        RedisHelper.Initialization(csredis);
        context.Services.AddSingleton<IDistributedCache>(new CSRedisCache(RedisHelper.Instance));

        //context.Services.AddSingleton<ICacheRemoveService, CacheRemoveService>();
    }
}
