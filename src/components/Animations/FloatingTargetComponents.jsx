import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CircularText from "./CircularText";

export default function FloatingTargetComponents() {
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

  return (
    <div className="w-full py-20 bg-[#071014] flex items-center justify-center">
      <div className="relative w-fit overflow-hidden">
        {/* TEXT CONTAINER */}
        <div
          ref={containerRef}
          className="relative inline-block"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background Text */}
          <h1 className="text-[120px] font-extrabold text-white tracking-wide">
            AMSTERDAM
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
              <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-xs">
                View
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
