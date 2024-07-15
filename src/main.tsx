import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/custom_bootstrap/custom_bootstrap.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestComponent from './components/TestComponent';
import LoginPage from './pages/LoginPage';
import AdminRootPage from './pages/AdminRootPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AdminProjectPage from './pages/AdminProjectPage';
import ProjectInfoPage from './pages/ProjectInfoPage';

const router = createBrowserRouter([
    {
        path: "/test",
        element: <TestComponent />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/admin",
        element: <AdminRootPage />,
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
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
