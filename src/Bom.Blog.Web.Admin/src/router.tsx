import { useRoutes } from 'react-router-dom';
import App from './App';
import Blog from './pages/BlogManage/Pages/Blog';
import Tag from './pages/BlogManage/Pages/Tag/Index';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';

export interface Route {
    path?: React.Key;
    title?: string;
    element?: React.ReactNode;
    children?: Route[];
}
export const routerConfig: Route[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                title: "Page A",
                path: 'pagea',
                children: [
                    {
                        title: "Page A",
                        path: 'pagea',
                        element: <PageA />,
                    },
                    {
                        title: "Page B",
                        path: 'pageb',
                        element: <PageB />,
                    },
                    {
                        title: "Page C",
                        path: 'pagec',
                        element: <PageC />,
                    }]
            },
            {
                title: "博客管理",
                path: 'blogmanage',
                children: [
                    {
                        title: "博客",
                        path: 'blog',
                        element: <Blog />
                    },
                    {
                        title: "标签",
                        path: 'tag',
                        element: <Tag />
                    }
                ]
            }
        ]
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
];
export function RenderRoutes() {
    let routes = useRoutes(routerConfig);
    return routes;
}
