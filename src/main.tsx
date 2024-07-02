import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/custom_bootstrap/custom_bootstrap.css'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import TestComponent from './components/TestComponent';

const router = createBrowserRouter([
  {
    path: "/test",
    element: <TestComponent />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
