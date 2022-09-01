using Volo.Abp;

namespace Bom.Blog.Categories
{
    public class CategoryAlreadyExistingException : BusinessException
    {
        public CategoryAlreadyExistingException(string name) : base(BlogDomainErrorCodes.CategoryAlreadyExists)
        {
            WithData("name", name);
        }
    }
}
