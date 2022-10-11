import { RouteObject, useRoutes } from "react-router-dom";
import Post from "./pages/BlogManage/Pages/Post";
import Category from "./pages/BlogManage/Pages/Category";
import FriendLink from "./pages/BlogManage/Pages/FriendLink";
import Tags from "./pages/BlogManage/Pages/Tag/Index";
import AddOrEditPost from "./pages/BlogManage/Pages/Post/AddOrNewPost";
import NotFound from "./pages/NotFound";
import App from "./App";
import ListView from "./pages/BlogManage/Pages/Post/ListView";
import AuditLog from "./pages/Admin/AuditLog";
import User from "./pages/Admin/User";
import Role from "./pages/Admin/Role";
import { useDebounceEffect, useMount } from "ahooks";
import { useAppConfig } from "./hooks/useStore";
import { toJS } from "mobx";
import { filterPermissionRoute } from "./util/permission";
import { useState } from "react";
import EmailSetting from "./pages/Admin/EmailSetting";
import Tenant from "./pages/Admin/Tenant";
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
      { index: true, element: <Post /> },
      {
        title: "系统管理",
        path: "/sysmanage",
        children: [
          { title: "用户管理", path: "user", element: <User />, permission: "AbpIdentity.Users" },
          { title: "角色管理", path: "role", element: <Role />, permission: "AbpIdentity.Roles" },
          { title: "审计日志", path: "auditlog", element: <AuditLog />, permission: "Blog.Admin" },
          { title: "邮件设置", path: "emailsetting", element: <EmailSetting />, permission: "SettingManagement.Emailing" },
          { title: "租户设置", path: "tenants", element: <Tenant />, permission: "AbpTenantManagement.Tenants" },
        ],
      },
      {
        title: "博客管理",
        path: "/blogmanage",
        children: [
          {
            index: true,
            element: <Post />,
          },
          {
            title: "博客",
            path: "post",
            permission: "Blog.Admin",
            element: <Post />,
            children: [
              {
                index: true,
                showInMenu: false,
                element: <ListView />,
              },
              {
                path: "add",
                showInMenu: false,
                element: <AddOrEditPost />,
              },
              {
                path: ":postid",
                showInMenu: false,
                element: <AddOrEditPost />,
              },
            ],
          },
          {
            title: "标签",
            path: "tag",
            permission: "Blog.Admin",
            element: <Tags />,
          },
          {
            title: "目录",
            path: "category",
            permission: "Blog.Admin",
            element: <Category />,
          },
          {
            title: "友情链接",
            path: "friendlink",
            element: <FriendLink />,
            permission: "Blog.Admin"
          },
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