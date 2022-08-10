using Bom.Blog.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Bom.Blog.Permissions;

public class BlogPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        //var myGroup = context.AddGroup(BlogPermissions.GroupName);
        ////Define your own permissions here. Example:
        //myGroup.AddPermission(BlogPermissions.MyPermission1, L("Permission:MyPermission1"));

        var adminGroup = context.GetGroupOrNull(BlogPermissions.GroupName);
        if (adminGroup == null)
        {
            adminGroup = context.AddGroup(BlogPermissions.GroupName);
            var defaultPermission = adminGroup.GetPermissionOrNull(BlogPermissions.Admin.Default);
            if (defaultPermission == null)
            {
                defaultPermission = adminGroup.AddPermission(BlogPermissions.Admin.Default);
                defaultPermission.AddChild(BlogPermissions.Admin.Create);
                defaultPermission.AddChild(BlogPermissions.Admin.Delete);
                defaultPermission.AddChild(BlogPermissions.Admin.Update);
            }
        }
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BlogResource>(name);
    }
}
