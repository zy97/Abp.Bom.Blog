using Volo.Abp;

namespace Bom.Blog.FriendLinks
{
    public class FriendLinkAlreadyExistingException : BusinessException
    {
        public FriendLinkAlreadyExistingException(string name) : base(BlogDomainErrorCodes.FriendLinkAlreadyExists)
        {
            WithData("name", name);
        }

    }
}
