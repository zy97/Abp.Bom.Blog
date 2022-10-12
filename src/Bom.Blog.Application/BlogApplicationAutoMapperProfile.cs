using AutoMapper;
using Bom.Blog.AuditLogs;
using Bom.Blog.Categories;
using Bom.Blog.Categories.AdminDtos;
using Bom.Blog.Categories.Dtos;
using Bom.Blog.Posts;
using Bom.Blog.Posts.AdminDtos;
using Bom.Blog.Posts.Dtos;
using Bom.Blog.Tags;
using Bom.Blog.Tags.AdminDtos;
using Bom.Blog.Tags.Dtos;
using System.Linq;
using Volo.Abp.AuditLogging;
using Volo.Abp.AutoMapper;

namespace Bom.Blog;

public class BlogApplicationAutoMapperProfile : Profile
{
    public BlogApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Post, Posts.Dtos.PostDto>();
        CreateMap<Post, PostBriefDto>();
        CreateMap<Post, PostPagedDto>();
        CreateMap<Post, PostEditDto>().ForMember(i => i.Tags, config => config.MapFrom(i => i.Tags.Select(i => i.Id)));
        CreateMap<Post, Posts.AdminDtos.PostDto>().ForMember(i => i.Tags, config => config.MapFrom(i => i.Tags.Select(i => i.DisplayName)));
        CreateMap<CreateOrUpdatePostDto, Post>().Ignore(i => i.Tags);



        CreateMap<Category, Categories.Dtos.CategoryDto>();
        CreateMap<Category, Categories.AdminDtos.CategoryDto>();
        CreateMap<Category, CategoryWithCountDto>().ForMember(i => i.Count, config => config.MapFrom(i => i.Posts.Count));
        CreateMap<Category, CategoryLookupDto>();
        CreateMap<CreateOrUpdateCategoryDto, Category>();

        CreateMap<Tag, Tags.Dtos.TagDto>();
        CreateMap<Tag, Tags.AdminDtos.TagDto>();
        CreateMap<Tag, TagLookupDto>();
        CreateMap<Tag, TagWithCountDto>().ForMember(i => i.Count, config => config.MapFrom(i => i.Posts.Count));
        CreateMap<CreateOrUpdateTagDto, Tag>();


        CreateMap<AuditLog, AuditLogDto>();
    }
}
