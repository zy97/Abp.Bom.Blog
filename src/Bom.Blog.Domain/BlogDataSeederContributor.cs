using Bom.Blog.Categories;
using Bom.Blog.Posts;
using Bom.Blog.PostTags;
using Bom.Blog.Tags;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Bom.Blog
{
    public class BlogDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Category, Guid> categoryRepo;
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IRepository<Post, Guid> postRepo;
        private readonly IRepository<PostTag, Guid> postTagRepo;

        public BlogDataSeederContributor(
            IRepository<Category, Guid> categoryRepo,
            IRepository<Tag, Guid> tagRepo,
            IRepository<Post, Guid> postRepo,
            IRepository<PostTag, Guid> postTagRepo)
        {
            this.categoryRepo = categoryRepo;
            this.tagRepo = tagRepo;
            this.postRepo = postRepo;
            this.postTagRepo = postTagRepo;
        }
        public async Task SeedAsync(DataSeedContext context)
        {
            if (await categoryRepo.GetCountAsync() == 0)
            {
                await categoryRepo.InsertManyAsync(new[] {
                    new Category(){DisplayName = ".NET",CategoryName = ".NET"},
                    new Category(){DisplayName = "Blazor",CategoryName = "Blazor"},
                    new Category(){DisplayName = "Python",CategoryName = "Python"},
                    new Category(){DisplayName = "NET",CategoryName = "NET"},
                    new Category(){DisplayName = "Database",CategoryName = "Database"},
                    new Category(){DisplayName = "Web",CategoryName = "Web"},
                    new Category(){DisplayName = "Summary",CategoryName = "Summary"},
                    new Category(){DisplayName = "Other",CategoryName = "Other"},
                    new Category(){DisplayName = "Life",CategoryName = "Life"},
                }, autoSave: true);
            }
            if (await this.tagRepo.GetCountAsync() == 0)
            {
                await tagRepo.InsertManyAsync(new[] {
                    new Tag(){DisplayName = ".NET Core",TagName = ".NET Core"},
                    new Tag(){DisplayName = "Python",TagName = "Python"},
                    new Tag(){DisplayName = "网络请求",TagName = "网络请求"},
                    new Tag(){DisplayName = "HTTP",TagName = "HTTP"},
                    new Tag(){DisplayName = "GET",TagName = "GET"},
                    new Tag(){DisplayName = "POST",TagName = "POST"},
                    new Tag(){DisplayName = "ip代理",TagName = "ip代理"},
                    new Tag(){DisplayName = "cookie",TagName = "cookie"},
                }, autoSave: true);
            }
            if (await this.postRepo.GetCountAsync() == 0)
            {
                var tags = (await tagRepo.GetListAsync()).Take(3);
                var category = (await categoryRepo.GetListAsync()).Take(1).ToList();
                var post = await postRepo.InsertAsync(new Post()
                {
                    Title = "TestTitle",
                    Author = "TestAuthor",
                    Markdown = "<p>test p</p>",
                    CategoryId = category[0].Id,
                });
                await postTagRepo.InsertManyAsync(tags.Select(i => new PostTag() { TagId = i.Id, PostId = post.Id }));

            }
        }
    }
}
