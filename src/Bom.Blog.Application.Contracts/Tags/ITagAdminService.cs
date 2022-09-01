using Bom.Blog.Tags.AdminDtos;
using System;
using Volo.Abp.Application.Services;

namespace Bom.Blog.Tags
{
    public interface ITagAdminService : ICrudAppService<TagDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateTagDto>
    {
    }
}
