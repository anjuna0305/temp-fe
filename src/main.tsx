import ReactDOM from 'react-dom/client'
import './assets/custom_bootstrap/custom_bootstrap.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import AdminRootPage from './pages/AdminRootPage';
import AdminProjectPage from './pages/AdminProjectPage';
import ProjectInfoPage from './pages/ProjectInfoPage';
import NotFoundErrorPage from './pages/errorPages/NotFoundErrorPage';
import InternalServerErrorPage from './pages/errorPages/InternalServerErrorPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <InternalServerErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <InternalServerErrorPage />,
    },
    {
        path: "/admin",
        element: <AdminRootPage />,
        errorElement: <InternalServerErrorPage />,
        children: [
            {
                path: "projects",
                element: <AdminProjectPage />
            },
            {
                path: "projects/:id",
                element: <ProjectInfoPage />
            }
        ]
    },
    {
        path: "/change-password",
        element: <ChangePasswordPage />,
        errorElement: <InternalServerErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
