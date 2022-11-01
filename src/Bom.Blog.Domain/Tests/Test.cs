using JetBrains.Annotations;
using System;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace Bom.Blog.Tests
{
    public class Test : FullAuditedAggregateRoot<Guid>
    {
        public string Aaa { get; private set; }
        public string Bbb { get; private set; }
        private Test()
        {

        }
        internal Test(Guid id, [NotNull] string aaa, [NotNull] string bbb) : base(id)
        {
            Set(aaa, bbb);
        }
        private void Set([NotNull] string aaa, [NotNull] string bbb)
        {
            Aaa = Check.NotNullOrWhiteSpace(aaa, nameof(aaa), TestConst.TestConstA);
            Bbb = Check.NotNullOrWhiteSpace(bbb, nameof(bbb), TestConst.TestConstB);
        }
        internal Test Change([NotNull] string aaa, [NotNull] string bbb)
        {
            Set(aaa, bbb);
            return this;
        }
    }

    //一般常量定义在domain.shared项目中
    public static class TestConst
    {
        public const int TestConstA = 24;
        public const int TestConstB = 100;
    }
}
