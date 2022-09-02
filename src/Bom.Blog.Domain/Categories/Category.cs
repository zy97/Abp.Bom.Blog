using Bom.Blog.Posts;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Categories
{

    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; private set; }
        public string DisplayName { get; private set; }

        public List<Post> Posts { get; private set; }

        private Category()
        {

        }
        internal Category(Guid id, [NotNull] string name, [NotNull] string displayName) : base(id)
        {
            Set(name, displayName);
        }
        internal Category Change([NotNull] string name, [NotNull] string displayName)
        {
            Set(name, displayName);
            return this;
        }
        private void Set([NotNull] string name, [NotNull] string displayName)
        {
            Name = Check.NotNullOrWhiteSpace(name, nameof(name), CategoryConst.MaxNameLength);
            DisplayName = Check.NotNullOrWhiteSpace(displayName, nameof(displayName), CategoryConst.MaxDisplayNameLength);
        }
    }
}
