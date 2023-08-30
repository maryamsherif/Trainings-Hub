import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Root from "./components/pages/Root.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import CourseProvider from "./context/CourseContext.tsx";
import CoursePage, {
  loader as courseLoader,
} from "./components/pages/CoursePage.tsx";
import BulkInsert from "./components/pages/BulkInsert.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "course/:courseId",
        element: <CoursePage></CoursePage>,
        loader: courseLoader,
      },
      {
        path: "bulkInsert",
        element: <BulkInsert></BulkInsert>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CourseProvider>
      <RouterProvider router={router} />
    </CourseProvider>
  </React.StrictMode>
);
