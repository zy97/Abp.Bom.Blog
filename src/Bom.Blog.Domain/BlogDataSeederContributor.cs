﻿using Bom.Blog.Categories;
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
        private readonly IRepository<Tag, Guid> tagRepo;
        private readonly IRepository<Post, Guid> postRepo;

        public BlogDataSeederContributor(
            IRepository<Category, Guid> categoryRepo,
            IRepository<Tag, Guid> tagRepo,
            IRepository<Post, Guid> postRepo)
        {
            this.categoryRepo = categoryRepo;
            this.tagRepo = tagRepo;
            this.postRepo = postRepo;
        }
        public async Task SeedAsync(DataSeedContext context)
        {
            if (await categoryRepo.GetCountAsync() == 0)
            {
                await categoryRepo.InsertManyAsync(new[] {
                    new Category(){DisplayName = ".NET",Name = ".NET"},
                    new Category(){DisplayName = "Blazor",Name = "Blazor"},
                    new Category(){DisplayName = "Python",Name = "Python"},
                    new Category(){DisplayName = "NET",Name = "NET"},
                    new Category(){DisplayName = "Database",Name = "Database"},
                    new Category(){DisplayName = "Web",Name = "Web"},
                    new Category(){DisplayName = "Summary",Name = "Summary"},
                    new Category(){DisplayName = "Other",Name = "Other"},
                    new Category(){DisplayName = "Life",Name = "Life"},
                }, autoSave: true);
            }
            if (await this.tagRepo.GetCountAsync() == 0)
            {
                await tagRepo.InsertManyAsync(new[] {
                    new Tag(){DisplayName = ".NET Core",Name = ".NET Core"},
                    new Tag(){DisplayName = "Python",Name = "Python"},
                    new Tag(){DisplayName = "网络请求",Name = "网络请求"},
                    new Tag(){DisplayName = "HTTP",Name = "HTTP"},
                    new Tag(){DisplayName = "GET",Name = "GET"},
                    new Tag(){DisplayName = "POST",Name = "POST"},
                    new Tag(){DisplayName = "ip代理",Name = "ip代理"},
                    new Tag(){DisplayName = "cookie",Name = "cookie"},
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
