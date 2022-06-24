using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog.Posts
{
    public class PostAdminService : CrudAppService<Post, PostAdminDto, Guid, PagedAndSortedResultRequestDto, CreatePostInputDto, UpdatePostInputDto>, IAdminPostService
    {
        public PostAdminService(IRepository<Post, Guid> repository) : base(repository)
        {
        }

    }
}
