using AutoMapper;
using Bom.Blog.AuditLogs;
using Bom.Blog.Categories;
using Bom.Blog.Categories.Dtos;
using Bom.Blog.FriendLinks;
using Bom.Blog.Posts;
using Bom.Blog.Tags;
using System.Linq;
using Volo.Abp.AuditLogging;

namespace Bom.Blog;

public class BlogApplicationAutoMapperProfile : Profile
{
    public BlogApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Post, PostDto>();
        CreateMap<Post, PostBriefDto>();
        CreateMap<Post, PostPagedDto>();
        CreateMap<Post, PostAdminDto>();
        CreateMap<CreateOrUpdatePostDto, Post>().ForMember(i => i.Tags, config => config.MapFrom(i => i.Tags.Select(i => new Tag(i))));



        CreateMap<Category, CategoryDto>();
        CreateMap<Category, CategoryAdminDto>();
        CreateMap<Category, CategoryWithCountDto>().ForMember(i => i.Count, config => config.MapFrom(i => i.Posts.Count));
        CreateMap<Category, CategorySelectOptionDto>();
        CreateMap<CreateOrUpdateCategoryDto, Category>();

        CreateMap<Tag, TagDto>();
        CreateMap<Tag, AdminTagDto>();
        CreateMap<Tag, TagSelectOptionDto>();
        CreateMap<CreateOrUpdateTagDto, Tag>();


        CreateMap<FriendLink, FriendLinkDto>();
        CreateMap<FriendLink, AdminFriendLinkDto>();
        CreateMap<CreateOrUpdateFriendLinkDto, FriendLink>();

        CreateMap<AuditLog, AuditLogDto>();
    }
}
