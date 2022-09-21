using Microsoft.Extensions.Logging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MailKit;

namespace Bom.Blog.Jobs
{
    public class EmailSendJob : AsyncBackgroundJob<EmailJobArgs>, ITransientDependency
    {
        private readonly IMailKitSmtpEmailSender emailSender;
        private readonly ILogger<EmailSendJob> logger;

        public EmailSendJob(IMailKitSmtpEmailSender emailSender, ILogger<EmailSendJob> logger)
        {
            this.emailSender = emailSender;
            this.logger = logger;
        }

        public override async Task ExecuteAsync(EmailJobArgs args)
        {
            await emailSender.SendAsync(args.Email, args.Subject, args.Body, false);
            this.logger.LogInformation("Email Sended!");
        }
    }
    public class EmailJobArgs
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
