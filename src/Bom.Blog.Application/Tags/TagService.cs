using Bom.Blog.PostTags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
namespace Bom.Blog.Tags
{
    public class TagService : BlogAppService, ITagService
    {
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IRepository<PostTag, Guid> postTagRepo;

        public TagService(IRepository<Tag, Guid> tagRepo, IRepository<PostTag, Guid> postTagRepo)
        {
            this.tagRepo = tagRepo;
            this.postTagRepo = postTagRepo;
        }
        public async Task<List<TagCountDto>> GetCountAsync()
        {
            var query = from tag in await tagRepo.GetQueryableAsync()
                        join postTag in await postTagRepo.GetQueryableAsync() on tag.Id equals postTag.TagId into tpt
                        from t in tpt.DefaultIfEmpty()
                        group t by new { tag.DisplayName, tag.TagName } into g
                        select new TagCountDto { TagName = g.Key.TagName, DisplayName = g.Key.DisplayName, Count = g.Count(i => i != null) };

            var result = await AsyncExecuter.ToListAsync(query);
            return result;
        }
        public async Task<TagDto> GetByNameAsync(string tagName)
        {
            var res = await tagRepo.GetAsync(i => i.TagName == tagName);
            return ObjectMapper.Map<Tag, TagDto>(res);
        }
    }
    public class AdminTagService : CrudAppService<Tag, AdminTagDto, Guid, PagedAndSortedResultRequestDto, CreateOrUpdateTagDto>, IAdminTagService
    {
        public AdminTagService(IRepository<Tag, Guid> repository) : base(repository)
        {
        }
    }
}
