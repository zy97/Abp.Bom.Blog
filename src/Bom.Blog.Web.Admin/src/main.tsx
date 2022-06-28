import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'virtual:windi.css'
import 'antd/dist/antd.css';
import { routerConfig } from './router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageA from './pages/PageA'
import PageB from './pages/PageB'
import PageC from './pages/PageC'
function RouteWithSubRoutes(key: any, route: any) {
  return (

    < Route{...route} key={key}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="pagea" element={<PageA />} />
        <Route path="pageb" element={<PageB />} />
        <Route path="pagec" element={<PageC />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
