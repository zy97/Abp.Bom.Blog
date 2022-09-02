using JetBrains.Annotations;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace Bom.Blog.FriendLinks
{
    /// <summary>
    /// 不要引入域服务，除非真的需要与执行一些核心业务规则，比如现在确保目录名是唯一的
    /// </summary>
    public class FriendLinkManager : DomainService
    {
        private readonly IFriendLinkRepository friendLinkRepository;

        public FriendLinkManager(IFriendLinkRepository friendLinkRepository)
        {
            this.friendLinkRepository = friendLinkRepository;
        }
        public async Task<FriendLink> CreateAsync([NotNull] string name, [NotNull] string url)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(url, nameof(url));
            var existingFriendLink = await friendLinkRepository.FindByNameAsync(name);
            if (existingFriendLink is not null)
            {
                throw new FriendLinkAlreadyExistingException(name);
            }
            return new FriendLink(GuidGenerator.Create(), name, url);
        }
        public async Task ChangeAsync([NotNull] FriendLink friendLink, [NotNull] string name, [NotNull] string url)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(url, nameof(url));
            var existingFriendLink = await friendLinkRepository.FindByNameAsync(name);
            if (existingFriendLink is not null && existingFriendLink.Id != friendLink.Id)
            {
                throw new FriendLinkAlreadyExistingException(name);
            }
            friendLink.Change(name, url);
        }
    }
}
