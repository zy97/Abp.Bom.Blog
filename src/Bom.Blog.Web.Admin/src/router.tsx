import { useRoutes } from 'react-router-dom';
import App from './App';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';

export const routerConfig = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/pagea',
                element: <PageA />,
            },
            {
                path: '/pageb',
                element: <PageB />,
            },
            {
                path: '/pagec',
                element: <PageC />,
            },
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
