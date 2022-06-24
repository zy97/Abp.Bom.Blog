using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Bom.Blog.FriendLinks
{
    public interface IFriendLinkService : IApplicationService
    {

    }
    public interface IAdminFriendLinkService : ICrudAppService<AdminFriendLinkDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdateFriendLinkDto>
    {

    }
}
