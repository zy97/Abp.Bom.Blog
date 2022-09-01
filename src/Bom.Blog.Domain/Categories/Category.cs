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
            //SetName(name);
            //SetDisplayName(displayName);
            Set(name, displayName);
        }
        //private void SetName([NotNull] string name)
        //{
        //    Name = Check.NotNullOrWhiteSpace(name, nameof(name), CategoryConst.MaxNameLength);
        //}
        //private void SetDisplayName([NotNull] string displayName)
        //{
        //    DisplayName = Check.NotNullOrWhiteSpace(displayName, nameof(displayName), CategoryConst.MaxDisplayNameLength);
        //}
        //internal Category ChangeName([NotNull] string name)
        //{
        //    SetName(name);
        //    return this;
        //}
        //internal Category ChangeDiaplayName([NotNull] string displayName)
        //{
        //    SetDisplayName(displayName);
        //    return this;
        //}
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
