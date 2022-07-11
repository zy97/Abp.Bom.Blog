using AutoMapper;
using Bom.Blog.Categories;
using Bom.Blog.FriendLinks;
using Bom.Blog.Posts;
using Bom.Blog.Tags;

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


        CreateMap<Category, CategoryDto>();
        CreateMap<Category, CategoryCountDto>();

        CreateMap<Tag, TagDto>();
        CreateMap<Tag, AdminTagDto>();

        CreateMap<FriendLink, FriendLinkDto>();
    }
}
