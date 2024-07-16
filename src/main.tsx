import ReactDOM from 'react-dom/client'
import './assets/custom_bootstrap/custom_bootstrap.css'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import AdminRootPage from './pages/AdminRootPage';
import AdminProjectPage from './pages/AdminProjectPage';
import ProjectInfoPage from './pages/ProjectInfoPage';
import NotFoundErrorPage from './pages/errorPages/NotFoundErrorPage';
import InternalServerErrorPage from './pages/errorPages/InternalServerErrorPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HomePage from './pages/HomePage';
import PrivateAuthProvider from './Auth/PrivateAuthProvider';
import AdminAuthProvider from './Auth/AdminAuthProvider';
import React from 'react';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateAuthProvider />,
        children: [
            { index: true, element: <HomePage /> },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <InternalServerErrorPage />,
    },
    {
        element: <AdminAuthProvider />,
        children: [
            {
                path: "/admin",
                element: <AdminRootPage />,
                children: [
                    { index: true, element: <Navigate replace to="projects" /> },
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
        ],
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
    <React.StrictMode>
        <RouterProvider router={router} />,
    </React.StrictMode>
)
