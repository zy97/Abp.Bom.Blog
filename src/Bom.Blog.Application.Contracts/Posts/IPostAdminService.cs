using Bom.Blog.Posts.AdminDtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Posts
{
    public interface IPostAdminService : ICrudAppService<PostEditDto, PostDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdatePostDto, CreateOrUpdatePostDto>
    {
        Task<ListResultDto<CategoryLookupDto>> GetCategoryLookupAsync();
        Task<ListResultDto<TagLookupDto>> GetTagLookupAsync();
    }
}
