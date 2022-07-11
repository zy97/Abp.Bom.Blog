import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import vitePluginImp from 'vite-plugin-imp';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        WindiCSS(),
        //用于antd按需加载，但很慢
        // vitePluginImp({
        //     libList: [
        //         {
        //             libName: 'antd',
        //             style: (name) => `antd/es/${name}/style`,
        //         },
        //     ],
        // }),
    ],
    // 用于antd按需加载，但很慢
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
    },
});
