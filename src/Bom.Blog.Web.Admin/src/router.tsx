import { useRoutes } from 'react-router-dom';
import App from './App';
import Post from './pages/BlogManage/Pages/Post';
import Category from './pages/BlogManage/Pages/Category';
import FriendLink from './pages/BlogManage/Pages/FriendLink';
import Tags from './pages/BlogManage/Pages/Tag/Index';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';
import AddOrEditPost from './pages/BlogManage/Pages/Post/AddOrNewPost';

export interface Route {
    path?: React.Key;
    title?: string;
    element?: React.ReactNode;
    children?: Route[];
    showInMenu?: boolean;
}
export const routerConfig: Route[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                title: '博客管理',
                path: 'blogmanage',
                children: [
                    {
                        title: '博客',
                        path: 'blog',
                        element: <Post />,
                        children: [
                            {
                                path: 'blog/aa',
                                title: 'asd',
                                showInMenu: false,
                                element: <AddOrEditPost />,
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
                element: (
                    <>
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    </>
                ),
            },
        ],
    },
];
export function RenderRoutes() {
    let routes = useRoutes(routerConfig);
    return routes;
}
