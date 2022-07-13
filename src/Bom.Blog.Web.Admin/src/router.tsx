import { useRoutes } from 'react-router-dom';
import App from './App';
import Post from './pages/BlogManage/Pages/Post';
import Category from './pages/BlogManage/Pages/Category';
import FriendLink from './pages/BlogManage/Pages/FriendLink';
import Tags from './pages/BlogManage/Pages/Tag/Index';
import AddOrEditPost from './pages/BlogManage/Pages/Post/AddOrNewPost';
import { FC, lazy, LazyExoticComponent } from 'react';
import { Button, Result } from 'antd';
import NotFound from './pages/NotFound';

export interface Route {
    path?: React.Key;
    title?: string;
    element?: React.ReactNode;
    children?: Route[];
    showInMenu?: boolean;
    index?: boolean;
}
export const routerConfig: Route[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Post /> },
            {
                title: '博客管理',
                path: '/blogmanage',
                children: [
                    {
                        index: true,
                        element: <Post />,
                    },
                    {
                        title: '博客',
                        path: 'post',
                        element: <Post />,
                        children: [
                            {
                                path: 'edit',
                                title: 'edit',
                                showInMenu: false,
                                element: <AddOrEditPost />,
                            },
                            {
                                path: 'add',
                                title: 'add',
                                showInMenu: false,
                                element: <Tags />,
                            },
                        ],
                    },
                    {
                        title: '标签',
                        path: 'tag',
                        element: <Tags />,
                    },
                    {
                        title: '目录',
                        path: 'category',
                        element: <Category />,
                    },
                    {
                        title: '友情链接',
                        path: 'friendlink',
                        element: <FriendLink />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];
export function RenderRoutes() {
    let routes = useRoutes(routerConfig);
    return routes;
}
