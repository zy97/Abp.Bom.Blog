import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'virtual:windi.css';
import 'antd/dist/antd.css';
import { RenderRoutes, routerConfig } from './router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './environments/environment';
import * as dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import 'dayjs/locale/zh-cn'; // import locale
import interceptors from './Interceptors';
dayjs().format();
dayjs.extend(isLeapYear); // use plugin
dayjs.locale('zh-cn'); // use locale
interceptors();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <ConfigProvider locale={zhCN}>
                {/* <App> */}
                <BrowserRouter>
                    {/* <Routes> */}
                    {/* <Route path="/" element={<App />} />
            <Route path="pagea" element={<PageA />} />
            <Route path="pageb" element={<PageB />} />
            <Route path="pagec" element={<PageC />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            /> */}
                    <RenderRoutes />

                    {/* </Routes> */}
                </BrowserRouter>
                {/* </App> */}
            </ConfigProvider>
        </AuthProvider>
    </React.StrictMode>
);
