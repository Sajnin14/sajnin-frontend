import React from "react";
import Container from "../components/Common/Container";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    {
      title: "projects",
      id: "projects",
    },
    {
      title: "skills",
      id: "skills",
    },
    {
      title: "experience",
      id: "experience",
    },
    {
      title: "about me",
      id: "aboutMe",
    },
    {
      title: "education",
      id: "education",
    },
    {
      title: "contact",
      id: "contact",
    },
    {
      title: "certificates",
      id: "certificates",
    },
    {
      title: "blogs",
      id: "blogs",
    },
  ];

  const navClass = "text-text capitalize font-medium text-lg";
  return (
    <nav className="w-full bg-primary text-text py-3">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <p>Sajnin</p>
          </div>

          <div className="flex items-center gap-6">
            {navLinks?.map((data, idx) => (
              <button key={idx}>
                <NavLink
                  className={({ isActive }) =>
                    `${navClass} ${isActive ? "" : ""}`
                  }
                >
                  {data?.title}
                </NavLink>
              </button>
            ))}
          </div>

          <div>
            <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 50%;
          filter: blur(15px);
          background-image: conic-gradient(from 0deg, #9B7CFF, #a78bfa, #9B7CFF);
          animation: rotate 3s linear infinite;
        }

        .rainbow::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(127, 90, 240, 0.6) 0%, transparent 70%);
          border-radius: 9999px;
        }
      `}</style>
            <div className="flex items-center">
              <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 cursor-pointer">
                <button className="px-8 py-3 text-xl text-text rounded-full font-medium bg-card backdrop-blur cursor-pointer">
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
