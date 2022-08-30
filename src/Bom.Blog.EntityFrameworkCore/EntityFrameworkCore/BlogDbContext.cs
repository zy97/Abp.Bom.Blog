﻿using Bom.Blog.Categories;
using Bom.Blog.FriendLinks;
using Bom.Blog.Posts;
using Bom.Blog.Tags;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Bom.Blog.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class BlogDbContext :
    AbpDbContext<BlogDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    public DbSet<Post> Posts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<FriendLink> FriendLinks { get; set; }

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public BlogDbContext(DbContextOptions<BlogDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(BlogConsts.DbTablePrefix + "YourEntities", BlogConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});

        builder.Entity<Post>(b =>
        {
            b.ToTable(BlogConsts.DbTablePrefix + "Posts", BlogConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasKey(i => i.Id);
            b.Property(i => i.Title).IsRequired().HasMaxLength(PostConst.MaxTitleLength);
            b.Property(i => i.Author).HasMaxLength(PostConst.MaxAuthorLength);
            b.Property(i => i.Markdown).IsRequired();
            b.HasMany(i => i.Tags).WithMany(i => i.Posts).UsingEntity(i => i.ToTable(BlogConsts.DbTablePrefix + nameof(Post) + nameof(Tag)));
        });
        builder.Entity<Category>(b =>
        {
            b.ToTable(BlogConsts.DbTablePrefix + "Categories", BlogConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasKey(i => i.Id);
            b.Property(i => i.Name).IsRequired().HasMaxLength(CategoryConst.MaxNameLength);
            b.Property(i => i.DisplayName).IsRequired().HasMaxLength(CategoryConst.MaxDisplayNameLength);
        });
        builder.Entity<Tag>(b =>
        {
            b.ToTable(BlogConsts.DbTablePrefix + "Tags", BlogConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasKey(i => i.Id);
            b.Property(i => i.Name).IsRequired().HasMaxLength(TagConst.MaxNameLength);
            b.Property(i => i.DisplayName).IsRequired().HasMaxLength(TagConst.MaxDisplayNameLength);
        });
        builder.Entity<FriendLink>(b =>
        {
            b.ToTable(BlogConsts.DbTablePrefix + "FriendLinks", BlogConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasKey(i => i.Id);
            b.Property(i => i.Name).IsRequired().HasMaxLength(FriendLinkConst.MaxNameLength);
            b.Property(i => i.Url).IsRequired().HasMaxLength(FriendLinkConst.MaxUrlLength);
        });
    }
}
