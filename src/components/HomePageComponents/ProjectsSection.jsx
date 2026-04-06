import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      color: "#000000",
      title: "Freight Transportation",
    },
    {
      color: "#8C8C8C",
      title: "Last-Mile Delivery",
    },
    {
      color: "#EFE8D3",
      title: "Supply Chain Optimization",
    },
    {
      color: "#706D63",
      title: "24/7 Customer Support",
    },
  ];

  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className="py-16 overflow-hidden bg-[#f9f9f9]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex justify-between">
          <h2 className="text-6xl font-semibold">Services.</h2>
          <p className="max-w-md text-neutral-500">
            Our solutions are tailored to meet the unique challenges of modern
            supply chains, providing speed, reliability, and flexibility at
            every stage of the journey.
          </p>
        </div>

        <div className="flex h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                key={index}
                index={index}
                title={project.title}
                setModal={setModal}
              />
            ))}
          </div>

          <Modal modal={modal} projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Project({ index, title, setModal }) {
  return (
    <div
      className="group flex w-full cursor-pointer items-center justify-between border-t border-gray-300 px-10 py-10 transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="text-4xl transition-all duration-300 group-hover:translate-x-3">
        {title}
      </h2>
      <p className="transition-all duration-300 group-hover:translate-x-3">
        Design & Development
      </p>
    </div>
  );
}

function Modal({ modal, projects }) {
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;

      xMoveContainer(pageX);
      yMoveContainer(pageY);

      xMoveCursor(pageX);
      yMoveCursor(pageY);

      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Modal Image */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-white"
      >
        <div
          className="absolute h-full w-full transition-all duration-500"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <img
                src={`https://images.cnippet.dev/image/upload/v1770400411/img_1700${idx + 1}.jpg`}
                alt="project"
                className="w-[300px] object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-50 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white"
      />

      {/* Cursor Label */}
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none absolute z-50 flex h-20 w-20 items-center justify-center text-white"
      >
        View
      </motion.div>
    </>
  );
}
