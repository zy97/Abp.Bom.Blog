using Bom.Blog.Categories;
using Bom.Blog.Posts;
using Bom.Blog.Tags;
using System;
using System.Collections.Generic;
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
        private readonly CategoryManager categoryManager;
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly TagManager tagManager;
        private readonly IRepository<Post, Guid> postRepo;

        public BlogDataSeederContributor(
            IRepository<Category, Guid> categoryRepo,
            CategoryManager categoryManager,
            IRepository<Tag, Guid> tagRepo,
            TagManager tagManager,
            IRepository<Post, Guid> postRepo)
        {
            this.categoryRepo = categoryRepo;
            this.categoryManager = categoryManager;
            this.tagRepo = tagRepo;
            this.tagManager = tagManager;
            this.postRepo = postRepo;
        }
        public async Task SeedAsync(DataSeedContext context)
        {
            if (await categoryRepo.GetCountAsync() == 0)
            {
                await categoryRepo.InsertManyAsync(new[] {
                   await categoryManager.CreateAsync(".NET","\".NET\""),
                     await categoryManager.CreateAsync( "Blazor", "Blazor"),
                     await categoryManager.CreateAsync("Python" , "Python"),
                     await categoryManager.CreateAsync("NET" , "NET"),
                     await categoryManager.CreateAsync("Database" , "Database"),
                     await categoryManager.CreateAsync("Web" , "Web"),
                     await categoryManager.CreateAsync("Summary" , "Summary"),
                     await categoryManager.CreateAsync("Other", "Other"),
                     await categoryManager.CreateAsync("Life",  "Life"),
                }, autoSave: true);
            }
            if (await this.tagRepo.GetCountAsync() == 0)
            {
                await tagRepo.InsertManyAsync(new[] {
                   await tagManager.CreateAsync(".NET Core", ".NET Core"),
                    await tagManager.CreateAsync("Python","Python"),
                    await tagManager.CreateAsync("网络请求", "网络请求"),
                    await tagManager.CreateAsync("HTTP", "HTTP"),
                    await tagManager.CreateAsync("GET", "GET"),
                    await tagManager.CreateAsync("POST", "POST"),
                    await tagManager.CreateAsync("ip代理", "ip代理"),
                    await tagManager.CreateAsync("cookie", "cookie"),
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
                    Category = category[0],
                });
                post.Tags = new List<Tag>();
                foreach (var tag in tags)
                {
                    post.Tags.Add(tag);
                }
            }
        }
    }
}
