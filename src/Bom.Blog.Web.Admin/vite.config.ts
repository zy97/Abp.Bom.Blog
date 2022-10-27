import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { setDefaultResultOrder } from 'dns'
// import WindiCSS from 'vite-plugin-windicss';
import vitePluginImp from 'vite-plugin-imp';
import swc from 'unplugin-swc'
// https://vitejs.dev/config/
setDefaultResultOrder('verbatim')
export default defineConfig({
    plugins: [
        react(),
        swc.vite(),
        swc.rollup(),
        // 用于antd按需加载，但很慢,内置支持了多个库
        vitePluginImp(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    // '@primary-color': '#4377FE', //设置antd主题色
                },
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:44399',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
        port: 3000,

    },
});
