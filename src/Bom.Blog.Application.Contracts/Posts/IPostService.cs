using Bom.Blog.Posts.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Posts
{
    public interface IPostService : IApplicationService
    {
        Task<PostDto> GetAsync(Guid id);
        Task<PagedResultDto<QueryPostDto>> GetListAsync(GetPostListDto input);
        Task<PagedResultDto<QueryPostDto>> GetListByCategoryNameAsync(GetPostByCategoryNameListDto input);
        Task<PagedResultDto<QueryPostDto>> GetListByTagNameAsync(GetPostByTagNameListDto input);
    }

}
