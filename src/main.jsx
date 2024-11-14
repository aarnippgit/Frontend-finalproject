import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Customer from './components/Customer';
import Training from './components/Training';

const router = createHashRouter([
  {
    basename: import.meta.env.BASE_URL,
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Customer />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "training",
        element: <Training />,
      },
    ]
  }
]);

// Render the app with the RouterProvider
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
