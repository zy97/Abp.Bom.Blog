using JetBrains.Annotations;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace Bom.Blog.Categories
{
    //不要引入域服务，除非真的需要与执行一些核心业务规则，比如现在确保目录名是唯一的
    public class CategoryManager : DomainService
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoryManager(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        public async Task<Category> CreateAsync([NotNull] string name, [NotNull] string displayName)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(displayName, nameof(displayName));
            var existingCategory = await categoryRepository.FindByNameAsync(name);
            if (existingCategory != null)
            {
                throw new CategoryAlreadyExistingException(name);
            }
            return new Category(GuidGenerator.Create(), name, displayName);
        }
        public async Task ChangeAsync([NotNull] Category category, [NotNull] string name, [NotNull] string displayName)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(displayName, nameof(displayName));
            var existingCategory = await categoryRepository.FindByNameAsync(name);
            if (existingCategory != null && existingCategory.Id != category.Id)
            {
                throw new CategoryAlreadyExistingException(name);
            }
            category.Change(name, displayName);
        }
    }
}
