using Bom.Blog.Blazor.Web;
using Bom.Blog.Blazor.Web.Common;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
var application = await builder.AddApplicationAsync<AppModule>(options =>
{
    options.UseAutofac();
});
builder.Services.AddSingleton<JsInvoker>();
//await builder.Build().RunAsync();
var host = builder.Build();

await application.InitializeApplicationAsync(host.Services);

await host.RunAsync();


