using Volo.Abp;

namespace Bom.Blog.Tags
{
    public class TagAlreadyExistingException : BusinessException
    {
        public TagAlreadyExistingException(string name) : base(BlogDomainErrorCodes.TagAlreadyExists)
        {
            WithData("name", name);
        }
    }
}
