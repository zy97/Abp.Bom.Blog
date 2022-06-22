using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Bom.Blog.Blazor;

[Dependency(ReplaceServices = true)]
public class BlogBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Blog";
}
