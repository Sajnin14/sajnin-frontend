import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CircularText from "../Animations/CircularText";
import { Link } from "react-router-dom";
import { AllPhotos } from "../Common/AllPhotos";

export default function ProjectsSection() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 });

  const rotate = useTransform([springX, springY], ([x, y]) => (x + y) * 0.05);

  // 👇 Move only inside container
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();

    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;

    const limitX = rect.width / 2 - 80;
    const limitY = rect.height / 2 - 80;

    x = Math.max(-limitX, Math.min(x, limitX));
    y = Math.max(-limitY, Math.min(y, limitY));

    mouseX.set(x);
    mouseY.set(y);
  };

  // 👇 Reset when leaving
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const projects = [
    {
      color: "#000000",
      title: "KTA+ (LMS Project)",
      image: AllPhotos.kale,
      liveLink: "https://kalekneale-react-frontend.vercel.app/auth/register",
    },
    {
      color: "#8C8C8C",
      title: "e-Lesson Academy",
      image: AllPhotos.elesson,
      liveLink: "https://elesson.academy/",
    },
    {
      color: "#EFE8D3",
      title: "Carrier Direct",
      image: AllPhotos.carrier,
      liveLink: "https://carrierdirect.io/",
    },
    {
      color: "#706D63",
      title: "Notary Pro",
      image: AllPhotos.notary,
      liveLink: "https://notary-react-frontend.thesyndicates.team/",
    },
  ];

  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div id="selected-projects" className="bg-primary py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex justify-between">
          {/* <h2 className="text-6xl font-semibold">Services.</h2> */}

          {/* moving  */}
          <div className="relative w-fit overflow-hidden">
            {/* TEXT CONTAINER */}
            <div
              ref={containerRef}
              className="relative inline-block"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Text */}
              <h1 className="text-[100px] font-extrabold text-primaryText tracking-wide">
                PROJECTS
              </h1>

              {/* FLOATING CIRCLE */}
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                  rotate,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-none"
              >
                {/* Rotating Circular Text */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  <CircularText
                    text="SEE MORE • SEE MORE •"
                    spinDuration={20}
                    className="text-base font-normal"
                  />
                </motion.div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-auto">
                  <Link
                    to={"https://github.com/Sajnin14"}
                    target="_blank"
                    className="w-24 h-24 rounded-full bg-primaryText text-primary flex items-center justify-center text-xs"
                  >
                    View
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <p className="max-w-md  py-10 text-secondaryText">
            Each project is built to address practical challenges, combining
            clean design, seamless interaction, and modern technologies to
            create fast, scalable, and user-friendly applications.
          </p>
        </div>

        <div className="flex h-screen items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {projects.map((project, index) => (
              <Project
                key={index}
                index={index}
                title={project.title}
                liveLink={project.liveLink}
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

function Project({ index, title, setModal, liveLink }) {
  return (
    <div
      onClick={() => window.open(liveLink, "_blank", "noopener,noreferrer")}
      className="group flex w-full cursor-pointer text-primaryText items-center justify-between border-t border-gray-300 px-10 py-10 transition-all duration-200 last:border-b hover:opacity-50"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <h2 className="text-4xl transition-all duration-300 group-hover:translate-x-3">
        {title}
      </h2>
      <p className="transition-all duration-300 group-hover:translate-x-3 text-secondaryText">
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
        className="pointer-events-none absolute flex h-87.5 w-100 items-center justify-center overflow-hidden bg-primaryText"
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
                src={project?.image}
                alt="project"
                className="w-75 object-contain"
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
        className="pointer-events-none absolute z-50 flex h-20 w-20 items-center justify-center text-primaryText"
      >
        View
      </motion.div>
    </>
  );
}
