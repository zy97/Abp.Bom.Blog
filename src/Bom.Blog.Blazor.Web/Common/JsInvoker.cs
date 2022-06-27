using Microsoft.JSInterop;

namespace Bom.Blog.Blazor.Web.Common
{
    public class JsInvoker
    {
        private readonly IJSRuntime jSRuntime;

        public JsInvoker(IJSRuntime jSRuntime)
        {
            this.jSRuntime = jSRuntime;
        }
        public async Task InvokeAsync(string identifier, params object[] args)
        {
            await jSRuntime.InvokeVoidAsync(identifier, args);
        }
        public async Task<TValue> InvokeAsync<TValue>(string identifier, params object[] args)
        {
            return await jSRuntime.InvokeAsync<TValue>(identifier, args);
        }
        public async Task SetStorageAsync(string key, string value)
        {
            await InvokeAsync("window.func.setStorage", key, value);
        }
        public async Task<string> GetStorageAsync(string key)
        {
            return await InvokeAsync<string>("window.func.getStorage", key);
        }
    }
}
