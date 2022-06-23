using Bom.Blog.Jobs;
using System;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;

namespace Bom.Blog
{
    public class JobService : BlogAppService
    {
        private readonly IBackgroundJobManager backgroundJobManager;

        public JobService(IBackgroundJobManager backgroundJobManager)
        {
            this.backgroundJobManager = backgroundJobManager;
        }

        public async Task StartAsync()
        {
            await backgroundJobManager.EnqueueAsync(new TestJobArgs() { Name = $"Job ${DateTime.Now}" });
        }
    }
}
