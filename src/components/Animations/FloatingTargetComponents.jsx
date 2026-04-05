import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CircularText from "./CircularText";
import { div } from "framer-motion/client";

export default function FloatingTargetComponents() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotate = useTransform([springX, springY], ([x, y]) => (x + y) * 0.05);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // mouse position relative to container center
      let x = e.clientX - rect.left - rect.width / 2;
      let y = e.clientY - rect.top - rect.height / 2;

      // 👇 circle size (same as your CircularText approx size)
      const limitX = rect.width / 2 - 80; // adjust if needed
      const limitY = rect.height / 2 - 80;

      // 👇 clamp values so it NEVER goes outside text
      x = Math.max(-limitX, Math.min(x, limitX));
      y = Math.max(-limitY, Math.min(y, limitY));

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full py-20 bg-[#071014] flex items-center justify-center">
      <div className="relative w-fit overflow-hidden">
        {/* TEXT CONTAINER */}
        <div ref={containerRef} className="relative inline-block">
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            {/* Rotating Circular Text */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className=""
            > 
              <CircularText text="SEE MORE • SEE MORE •" spinDuration={20} className="text-base! font-normal!" />
            </motion.div>

            {/* Hover Content */}
            <div className="absolute inset-0 flex items-center bg-transparent justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="w-24 h-24  rounded-full bg-white text-black flex items-center justify-center text-xs">
                View
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
