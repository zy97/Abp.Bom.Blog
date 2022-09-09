using JetBrains.Annotations;
using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tests
{
    public class Test : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; private set; }
        public string Url { get; private set; }
        private Test()
        {

        }
        internal Test(Guid id, [NotNull] string name, [NotNull] string url) : base(id)
        {
            Set(name, url);
        }
        private void Set([NotNull] string name, [NotNull] string url)
        {
            Name = Check.NotNullOrWhiteSpace(name, nameof(name), FriendLinkConst.MaxNameLength);
            Url = Check.NotNullOrWhiteSpace(url, nameof(url), FriendLinkConst.MaxUrlLength);
        }
        internal Test Change([NotNull] string name, [NotNull] string url)
        {
            Set(name, url);
            return this;
        }
    }
}
