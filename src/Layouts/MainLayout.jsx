import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import Footer from "@/Shared/Footer";

export default function MainLayout() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    Aos.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    // If there is no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash, scroll to the element
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash, key]);

  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
