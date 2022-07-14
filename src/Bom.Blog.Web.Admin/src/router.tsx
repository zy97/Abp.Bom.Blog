import { RouteObject, useRoutes } from 'react-router-dom';
import Post from './pages/BlogManage/Pages/Post';
import Category from './pages/BlogManage/Pages/Category';
import FriendLink from './pages/BlogManage/Pages/FriendLink';
import Tags from './pages/BlogManage/Pages/Tag/Index';
import AddOrEditPost from './pages/BlogManage/Pages/Post/AddOrNewPost';
import NotFound from './pages/NotFound';
import App from './App';
import ListView from './pages/BlogManage/Pages/Post/ListView';
//https://reactrouter.com/docs/en/v6/getting-started/overview#nested-routes
//嵌套的的父级需要有一个letout容器才行
export interface Route extends RouteObject {
    title?: string;
    showInMenu?: boolean;
    children?: Route[];
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
                                index: true,
                                showInMenu: false,
                                element: <ListView />,
                            },
                            {
                                path: 'add',
                                showInMenu: false,
                                element: <AddOrEditPost />,
                            },
                            {
                                path: 'edit/:id',
                                showInMenu: false,
                                element: <AddOrEditPost />,
                            },
                        ],
                    },
                    // {
                    //     title: '博客+',
                    //     path: 'post/add',
                    //     element: <AddOrEditPost />,
                    // },
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
