using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace Bom.Blog
{
    public class BlogDataSeederContributor : IDataSeedContributor, ITransientDependency
    {

        public BlogDataSeederContributor()
        {

        }
        public async Task SeedAsync(DataSeedContext context)
        {

        }
    }
}
