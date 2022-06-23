using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Posts
{
    public interface IPostService : IApplicationService
    {
        Task<PostDto> GetAsync(Guid id);
        Task<PagedResultDto<PostBriefDto>> GetListAsync(GetPostListDto input);
    }
}
