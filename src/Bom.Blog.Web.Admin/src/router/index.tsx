import { Router } from "@remix-run/router";
import { useRequest, useThrottleEffect } from "ahooks";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import App from "../App";
import Loading from "../components/Loading";
import { useAppConfig } from "../hooks/useStore";
import AuditLog from "../pages/Admin/AuditLog";
import EmailSetting from "../pages/Admin/EmailSetting";
import Role from "../pages/Admin/Role";
import SystemSetting from "../pages/Admin/SystemSetting";
import Tenant from "../pages/Admin/Tenant";
import User from "../pages/Admin/User";
import NotFound from "../pages/NotFound";
import { filterPermissionRoute } from "../util/permission";
import styles from "./index.module.less"
function Router() {
    const [router, setRouter] = useState<Router>()
    const { applicationConfigurationStore } = useAppConfig();
    const { data, error, loading, runAsync } = useRequest(applicationConfigurationStore.Get, { throttleWait: 1000, manual: true });
    useThrottleEffect(() => {
        runAsync()
    }, [], { "wait": 300 })
    useEffect(() => {
        if (data !== undefined) {
            const routes = filterPermissionRoute(routerConfig, toJS(data.auth.grantedPolicies));
            const r = createBrowserRouter(routes);
            setRouter(r);
        }

    }, [data]);

    return (
        <div className={styles.wrapper}>
            {loading ? <Loading /> :
                error !== undefined ? <div>{error.message}</div> :
                    router !== undefined ? <RouterProvider router={router} /> : <Loading />
            }
        </div>
    );
}

export default Router;

export type Route = RouteObject & {
    title?: string;
    showInMenu?: boolean;
    children?: Route[];
    permission?: string
}

export const routerConfig: Route[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <User /> },
            {
                title: "系统管理",
                path: "/sysmanage",
                children: [
                    { title: "用户管理", path: "user", element: <User />, permission: "AbpIdentity.Users" },
                    { title: "角色管理", path: "role", element: <Role />, permission: "AbpIdentity.Roles" },
                    { title: "审计日志", path: "auditlog", element: <AuditLog />, permission: "Blog.Admin" },
                    { title: "邮件设置", path: "emailsetting", element: <EmailSetting />, permission: "SettingManagement.Emailing" },
                    { title: "租户设置", path: "tenants", element: <Tenant />, permission: "AbpTenantManagement.Tenants" },
                    { title: "系统设置", path: "systemSetting", element: <SystemSetting />, permission: "Blog.SystemSetting" },
                ] as Route[],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];