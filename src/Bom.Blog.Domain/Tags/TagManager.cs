using JetBrains.Annotations;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace Bom.Blog.Tags
{
    public class TagManager : DomainService
    {
        private readonly ITagRepository tagRepository;

        public TagManager(ITagRepository tagRepository)
        {
            this.tagRepository = tagRepository;
        }
        public async Task<Tag> CreateAsync([NotNull] string name, [NotNull] string displayName)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(displayName, nameof(displayName));
            var existingTag = await tagRepository.FindByNameAsync(name);
            if (existingTag is not null)
            {
                throw new TagAlreadyExistingException(name);
            }
            return new Tag(GuidGenerator.Create(), name, displayName);
        }
        public async Task ChangeAsync([NotNull] Tag tag, [NotNull] string name, [NotNull] string displayName)
        {
            Check.NotNull(name, nameof(name));
            Check.NotNull(displayName, nameof(displayName));
            var existingTag = await tagRepository.FindByNameAsync(name);
            if (existingTag is not null && existingTag.Id != tag.Id)
            {
                throw new TagAlreadyExistingException(name);
            }
            tag.Change(name, displayName);
        }
    }
}
