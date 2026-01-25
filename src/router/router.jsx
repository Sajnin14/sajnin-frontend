import { createBrowserRouter } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../AllPages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
