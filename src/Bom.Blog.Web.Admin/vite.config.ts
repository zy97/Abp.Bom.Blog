import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import react from "@vitejs/plugin-react-swc";
import { setDefaultResultOrder } from 'dns'
// import WindiCSS from 'vite-plugin-windicss';
// import vitePluginImp from 'vite-plugin-imp';
// https://vitejs.dev/config/
setDefaultResultOrder('verbatim')
export default defineConfig({
    plugins: [
        react(),
        // 用于antd按需加载，但很慢,内置支持了多个库
        // vitePluginImp(),
        // 用于解决App主键热更新异常
        {
            name: "singleHMR",
            handleHotUpdate({ modules }) {
                modules.map((m) => {
                    m.importedModules = new Set();
                    m.importers = new Set();
                });

                return modules;
            },
        },
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    // '@primary-color': '#4377F0', //设置antd主题色
                    '@primary-color': 'red', //设置antd主题色
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
