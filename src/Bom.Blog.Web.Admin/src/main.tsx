import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'virtual:windi.css';
import 'antd/dist/antd.css';
import { RenderRoutes, routerConfig } from './router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './environments/environment';
import * as dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import * as format from 'dayjs/plugin/localizedFormat'; // import plugin
import 'dayjs/locale/zh-cn'; // import locale
import interceptors from './Interceptors';

dayjs.extend(isLeapYear); // use plugin
dayjs.extend(format); // use plugin
dayjs.locale('zh-cn'); // use locale
interceptors();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <RenderRoutes />
                </BrowserRouter>
            </ConfigProvider>
        </AuthProvider>
    </React.StrictMode>
);
