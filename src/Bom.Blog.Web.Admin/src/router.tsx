import { RouteObject, useRoutes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import App from "./App";
import AuditLog from "./pages/Admin/AuditLog";
import User from "./pages/Admin/User";
import Role from "./pages/Admin/Role";
import { useMount } from "ahooks";
import { useAppConfig } from "./hooks/useStore";
import { toJS } from "mobx";
import { filterPermissionRoute } from "./util/permission";
import { useState } from "react";
import EmailSetting from "./pages/Admin/EmailSetting";
import Tenant from "./pages/Admin/Tenant";
import SystemSetting from "./pages/Admin/SystemSetting";
//https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
//嵌套的的父级需要有一个letout容器才行
export interface Route extends RouteObject {
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
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export function RenderRoutes() {
  const [routes, setRoutes] = useState([] as Route[])
  const { applicationConfigurationStore } = useAppConfig();
  useMount(() => {
    applicationConfigurationStore.Get().then((config) => {
      const routes = filterPermissionRoute(routerConfig, toJS(config.auth.grantedPolicies));
      setRoutes(routes);
    });
  });

  return useRoutes(routes);
}