using Bom.Blog.Posts;
using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tags
{
    public class Tag : FullAuditedAggregateRoot<Guid>
    {

        public string Name { get; private set; }
        public string DisplayName { get; private set; }
        public ICollection<Post> Posts { get; private set; }
        private Tag()
        {
        }
        internal Tag(Guid id, [NotNull] string name, [NotNull] string displayName) : base(id)
        {
            Set(name, displayName);
        }
        private void Set([NotNull] string name, [NotNull] string displayName)
        {
            Name = Check.NotNullOrWhiteSpace(name, nameof(name), TagConst.MaxNameLength);
            DisplayName = Check.NotNullOrWhiteSpace(displayName, nameof(displayName), TagConst.MaxDisplayNameLength);
        }
        internal Tag Change([NotNull] string name, [NotNull] string displayName)
        {
            Set(name, displayName);
            return this;
        }
    }
}
