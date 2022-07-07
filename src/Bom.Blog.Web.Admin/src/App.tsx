import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate, useOutlet, useRoutes } from 'react-router-dom';
import Login from './pages/Components/Login';
import { routerConfig } from './router';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];




const App: React.FC = () => {
  const navigate = useNavigate();
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ) => {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => { navigate(key + ""); }
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
    ...routerConfig[0].children.map(i => getItem(i.path, i.path)),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const routes = useOutlet();
  console.log(routes);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo text-white h-16 text-lg text-center  leading-[64px]"><div>logo</div></div>
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background " style={{ padding: 0 }} >
          <span className='text-white absolute right-8'>
            <Login />
          </span>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;