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
        Task<PagedResultDto<PostBriefDto>> GetListByCategoryNameAsync(GetPostByCategoryNameListDto input);
        Task<PagedResultDto<PostBriefDto>> GetListByTagNameNameAsync(GetPostByTagNameListDto input);
    }
    public interface IAdminPostService : ICrudAppService<PostAdminDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdatePostDto>
    {

    }
}
