import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';

export default function MainLayout() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
