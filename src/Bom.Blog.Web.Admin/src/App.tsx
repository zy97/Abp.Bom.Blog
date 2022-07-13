import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { Children, useState } from 'react';
import { Outlet, useNavigate, useOutlet, useRoutes } from 'react-router-dom';
import Login from './pages/Components/Login';
import { Route, routerConfig } from './router';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
    const navigate = useNavigate();
    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[]
    ) => {
        return {
            key,
            icon,
            children,
            label,
            onClick: (item: any, key: string, keyPath: any, domEvent: any) => {
                // console.log(item, key, keyPath, domEvent);
                navigate(item.key + '');
            },
        } as MenuItem;
    };
    const createMenu = (
        rootPath: React.Key,
        nodes: Route[],
        arr: MenuItem[]
    ) => {
        for (let item of nodes) {
            if (
                item.path &&
                (item.showInMenu === undefined || item.showInMenu === true)
            ) {
                const menu = getItem(
                    item.title,
                    rootPath + '' + item.path,
                    null
                );
                arr.push(menu);

                if (item.children && item.children.length) {
                    menu.children = [];
                    // menu.key = null;
                    createMenu(item.path + '/', item.children, menu.children);
                }
            }
        }
        return arr;
    };
    const menu = createMenu('', routerConfig[0].children, []);
    const clearMenu = (nodes: ItemType[]) => {
        for (let item of nodes) {
            if (item.children && item.children.length === 0) {
                item.children = null;
            }
            if (item.children && item.children.length) {
                clearMenu(item.children);
            }
            // if (
            //     item.path &&
            //     (item.showInMenu === undefined || item.showInMenu === true)
            // ) {
            //     const menu = getItem(
            //         item.title,
            //         rootPath + '' + item.path,
            //         null
            //     );
            //     arr.push(menu);
            //     if (item.children && item.children.length) {
            //         menu.children = [];
            //         menu.key = null;
            //         createMenu(item.path + '/', item.children, menu.children);
            //     }
            // }
        }
    };
    // console.log(menu);
    // const finalMenu = clearMenu(menu);
    // console.log(menu);

    const items: MenuItem[] = [
        // getItem('Option 1', '1', <PieChartOutlined />),
        // getItem('Option 2', '2', <DesktopOutlined />),
        // getItem('User', 'sub1', <UserOutlined />, [
        //   getItem('Tom', '3'),
        //   getItem('Bill', '4'),
        //   getItem('Alex', '5'),
        // ]),
        // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        // getItem('Files', '9', <FileOutlined />),
        // ...routerConfig[0].children.map(i => getItem(i.title, i.path)),
        ...menu,
    ];

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                    defaultSelectedKeys={['2']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background "
                    style={{ padding: 0 }}
                >
                    <span className="text-white absolute right-8">
                        <Login />
                    </span>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="h-full">
                        <div className="p-6 bg-white h-full">
                            <Outlet />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Footer</Footer>
            </Layout>
        </Layout>
    );
};

export default App;
