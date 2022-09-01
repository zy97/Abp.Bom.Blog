using Bom.Blog.FriendLinks.AdminDtos;
using System;
using Volo.Abp.Application.Services;

namespace Bom.Blog.FriendLinks
{
    public interface IFriendLinkAdminService : ICrudAppService<FriendLinkDto, Guid, PagedAndSortedAndFilteredResultRequestDto, CreateOrUpdateFriendLinkDto>
    {

    }
}
