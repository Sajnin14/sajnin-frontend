import { createBrowserRouter } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../AllPages/HomePage";
import AboutPage from "@/AllPages/AboutPage";
import ProjectPage from "@/AllPages/ProjectPage";
import ContactPage from "@/AllPages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage/>
      },
      {
        path: '/project',
        element: <ProjectPage/>,
      },
      {
        path: '/contact',
        element: <ContactPage/>,
      },
    ],
  },
]);

export default router;
