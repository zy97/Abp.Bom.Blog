using Bom.Blog.FriendLinks.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog.FriendLinks
{
    public interface IFriendLinkService : IApplicationService
    {
        Task<List<FriendLinkDto>> GetAllAsync();
    }

}
