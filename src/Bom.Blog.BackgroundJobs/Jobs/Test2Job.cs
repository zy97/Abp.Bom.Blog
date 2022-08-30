using Hangfire;
using Microsoft.Extensions.Logging;
using Volo.Abp.BackgroundWorkers.Hangfire;

namespace Bom.Blog.Jobs
{
    public class Test2Job : HangfireBackgroundWorkerBase
    {
        public Test2Job()
        {
            RecurringJobId = nameof(Test2Job);
            CronExpression = Cron.Minutely();
        }

        public override Task DoWorkAsync(CancellationToken cancellationToken = default)
        {
            Logger.LogInformation("working......");
            return Task.CompletedTask;
        }
    }
}
