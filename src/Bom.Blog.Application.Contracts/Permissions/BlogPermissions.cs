namespace Bom.Blog.Permissions;

public static class BlogPermissions
{
    public const string GroupName = "Blog";

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
    public static class Admin
    {
        public const string Default = GroupName + ".Admin";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
        public const string Update = Default + ".Update";
    }

    public static class SystemSetting
    {
        public const string Default = GroupName + ".SystemSetting";
    }
}
