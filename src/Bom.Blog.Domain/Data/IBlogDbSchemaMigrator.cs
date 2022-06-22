using System.Threading.Tasks;

namespace Bom.Blog.Data;

public interface IBlogDbSchemaMigrator
{
    Task MigrateAsync();
}
