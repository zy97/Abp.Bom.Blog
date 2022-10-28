using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Bom.Blog
{
    public class TestServiec : ApplicationService
    {
        public TestServiec()
        {
        }
        public Task<string> Test()
        {
            return Task.FromResult("yes");
        }
    }
}
