using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Entities.Events;
using Volo.Abp.Emailing;
using Volo.Abp.Emailing.Templates;
using Volo.Abp.EventBus;
using Volo.Abp.Identity;
using Volo.Abp.TextTemplating;

namespace Bom.Blog.EventHandles
{
    public class AccountHandler : ILocalEventHandler<EntityCreatedEventData<IdentityUser>>, ITransientDependency
    {
        private readonly IEmailSender emailSender;
        private readonly ITemplateRenderer templateRenderer;

        public AccountHandler(IEmailSender emailSender, ITemplateRenderer templateRenderer)
        {
            this.emailSender = emailSender;
            this.templateRenderer = templateRenderer;
        }
        public async Task HandleEventAsync(EntityCreatedEventData<IdentityUser> eventData)
        {
            var content = await templateRenderer.RenderAsync(StandardEmailTemplates.Message, new { message = $"Hello {eventData.Entity.UserName}" });
            await emailSender.QueueAsync(eventData.Entity.Email, "Welcome", content);
        }
    }
}
