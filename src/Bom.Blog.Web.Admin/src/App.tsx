import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Components/Login";
import { Route, routerConfig } from "./router";

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
  console.log(location);
  const getItem = (
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
        const menu = getItem(item.title, rootPath + "" + item.path, null);
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
  const menu = createMenu("", routerConfig[0].children!, []);
  const clearMenu = (nodes: MenuItemProps[]) => {
    for (const item of nodes) {
      if (item.children && item.children.length === 0) {
        item.children = null;
      }
      if (item.children && item.children.length) {
        clearMenu(item.children);
      }
    }
  };
  clearMenu(menu);
  // console.log(menu);

  const items: MenuItem[] = [...menu];
  console.log(items);
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbs = () => {
    const names = [];
    const url = location.pathname;
    for (const menu of items) {
      if (url.startsWith(menu.key)) {
        names.push(menu.label);
        for (const submenu of menu.children) {
          if (url === submenu.key) {
            names.push(submenu.label);
          }
        }
      }
    }
    return names;
  };
  console.log(breadcrumbs())
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo text-white h-16 text-lg text-center  leading-[64px]">
          <div>logo</div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background " style={{ padding: 0 }}>
          <span className="text-white absolute right-8">
            <Login />
          </span>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {
              breadcrumbs().map(i => { return <Breadcrumb.Item key={i}>{i}</Breadcrumb.Item> })
            }
          </Breadcrumb>
          <div className="h-full">
            <div className="p-6 bg-white h-full">
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
