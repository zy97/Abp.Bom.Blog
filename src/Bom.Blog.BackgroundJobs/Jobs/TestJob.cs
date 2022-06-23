using Microsoft.Extensions.Logging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.DependencyInjection;

namespace Bom.Blog.Jobs
{
    public class TestJob : AsyncBackgroundJob<TestJobArgs>, ITransientDependency
    {
        private readonly ILogger<TestJob> logger;

        public TestJob(ILogger<TestJob> logger)
        {
            this.logger = logger;
        }
        public override Task ExecuteAsync(TestJobArgs args)
        {
            this.logger.LogInformation("TestJob is executed with argument: {Argument}", args.Name);
            return Task.CompletedTask;
        }
    }
    public class TestJobArgs
    {
        public string Name { get; set; }
    }
}
