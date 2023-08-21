import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/pages/Root.tsx";
import HomePage from "./components/pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/course/:id",
        element: <h1>Course</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
