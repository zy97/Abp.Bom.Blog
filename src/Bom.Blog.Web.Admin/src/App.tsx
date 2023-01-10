import { useDebounceEffect } from "ahooks";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { toJS } from "mobx";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppConfig } from "./hooks/useStore";
import Login from "./pages/Components/Login";
import { Route, routerConfig } from "./router/index";
import { filterPermissionRoute } from "./util/permission";
import styles from "./App.module.less";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type MenuItemProps = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItemProps[] | undefined | null;
  onclick?: (item: any, key: string, keyPath: any, domEvent: any) => void;
};
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { applicationConfigurationStore } = useAppConfig();
  const [routes, setRoutes] = useState([] as Route[])
  const [menues, setMenues] = useState([] as MenuItem[])
  useDebounceEffect(() => {
    applicationConfigurationStore.Get().then((config) => {
      const routes = filterPermissionRoute(routerConfig, toJS(config.auth.grantedPolicies));
      const m = createMenu("", routes[0].children!, [])
      removeInvalidChildrenMenu(m);
      setMenues([...m])
      setRoutes(routes);
    });
  }, [], {});
  const getMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[] | undefined | null
  ) => {
    return {
      key,
      icon,
      children,
      label,
      onClick: (item: any, key: string, keyPath: any, domEvent: any) => {
        navigate(item.key + "");
      },
    } as MenuItemProps;
  };
  const createMenu = (
    rootPath: React.Key,
    nodes: Route[],
    arr: MenuItemProps[]
  ) => {
    for (const item of nodes) {
      if (
        item.path &&
        (item.showInMenu === undefined || item.showInMenu === true)
      ) {
        const menu = getMenuItem(item.title, rootPath + "" + item.path, null);
        arr.push(menu);

        if (item.children && item.children.length) {
          menu.children = [];
          menu.key = rootPath + "" + item.path;
          createMenu(
            rootPath + "" + item.path + "/",
            item.children,
            menu.children
          );
        }
      }
    }
    return arr;
  };
  // const menu = createMenu("", routes[0].children, []);
  const removeInvalidChildrenMenu = (nodes: MenuItemProps[]) => {
    for (const item of nodes) {
      if (item.children && item.children.length === 0) {
        item.children = null;
      }
      if (item.children && item.children.length) {
        removeInvalidChildrenMenu(item.children);
      }
    }
  };
  // removeInvalidChildrenMenu(menu);
  // console.log(menu);

  // const items: MenuItem[] = [];
  // const items: MenuItem[] = [...menu];
  // console.log(items);
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbs = () => {
    const names = [];
    const url = location.pathname;
    for (const menu of menues) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (url.startsWith(menu.key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        names.push(menu.label);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for (const submenu of menu.children) {
          if (url === submenu.key) {
            names.push(submenu.label);
          }
        }
      }
    }
    return names;
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo}>
          <div>Blog</div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={menues}
        />
      </Sider>
      <Layout >
        <Header style={{ padding: 0 }}>
          <span className={styles.login}>
            <Login />
          </span>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {
              breadcrumbs().map(i => { return <Breadcrumb.Item key={i}>{i}</Breadcrumb.Item> })
            }
          </Breadcrumb>
          <div>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout >
  );
}

export default App;
