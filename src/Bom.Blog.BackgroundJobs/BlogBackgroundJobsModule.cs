using Hangfire;
using Hangfire.MySql;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Transactions;
using Volo.Abp;
using Volo.Abp.BackgroundJobs.Hangfire;
using Volo.Abp.Modularity;

namespace Bom.Blog.BackgroundJobs
{
    [DependsOn(typeof(AbpBackgroundJobsHangfireModule))]
    public class BlogBackgroundJobsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var config = context.Services.GetConfiguration();
            ConfigureHangfire(context, config);
        }
        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var app = context.GetApplicationBuilder();

        }
        private void ConfigureHangfire(ServiceConfigurationContext context, IConfiguration configuration)
        {
            context.Services.AddHangfire(config =>
            {
                config.UseStorage(new MySqlStorage(configuration.GetConnectionString("Default") + ";Allow User Variables=True", new MySqlStorageOptions
                {
                    TransactionIsolationLevel = IsolationLevel.ReadCommitted,
                    QueuePollInterval = TimeSpan.FromSeconds(15),
                    JobExpirationCheckInterval = TimeSpan.FromHours(1),
                    CountersAggregateInterval = TimeSpan.FromMinutes(5),
                    PrepareSchemaIfNecessary = true,
                    DashboardJobListLimit = 50000,
                    TransactionTimeout = TimeSpan.FromMinutes(1),
                    TablesPrefix = "Hangfire"
                }));
            });
        }
    }
}