using Bom.Blog.Localization;
using Volo.Abp.AspNetCore.Components;

namespace Bom.Blog.Blazor;

public abstract class BlogComponentBase : AbpComponentBase
{
    protected BlogComponentBase()
    {
        LocalizationResource = typeof(BlogResource);
    }
}
