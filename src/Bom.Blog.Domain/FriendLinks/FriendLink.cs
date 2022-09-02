﻿using JetBrains.Annotations;
using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.FriendLinks
{
    public class FriendLink : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; private set; }
        public string Url { get; private set; }
        private FriendLink()
        {

        }
        internal FriendLink(Guid id, [NotNull] string name, [NotNull] string url) : base(id)
        {
            Set(name, url);
        }
        private void Set([NotNull] string name, [NotNull] string url)
        {
            Name = Check.NotNullOrWhiteSpace(name, nameof(name), FriendLinkConst.MaxNameLength);
            Url = Check.NotNullOrWhiteSpace(url, nameof(url), FriendLinkConst.MaxUrlLength);
        }
        internal FriendLink Change([NotNull] string name, [NotNull] string url)
        {
            Set(name, url);
            return this;
        }
    }
}
