import React from "react";
import { motion } from "framer-motion";

const strip1 =
  "JAVASCRIPT ♦ TYPESCRIPT ♦ SOLIDITY ♦ ETHERS.JS ♦ ";
const strip2 =
  "JAVASCRIPT ♦ TYPESCRIPT ♦ REACTJS ♦ NEXTJS ♦ GSAP & FRAMER MOTION ♦ SOLIDITY ♦ ETHERS.JS ♦ ";

const MarqueeRow = ({ text, className, speed = 20 }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {/* duplicate for seamless loop */}
        <span className="text-white text-lg font-medium tracking-wide">
          {text.repeat(2)}
        </span>
        <span className="text-white text-lg font-medium tracking-wide">
          {text.repeat(2)}
        </span>
      </motion.div>
    </div>
  );
};

export default function TechMarqueeSection() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center">

      {/* Top Label */}
      <p className="text-gray-500 text-xs tracking-widest mb-10">
        VARIOUS TECHNOLOGIES I USE
      </p>

      {/* Marquee Container */}
      <div className="relative h-49 flex items-center justify-center overflow-hidden">

        {/* Bottom Strip */}
        <div className="absolute w-[160%] right-[-10%] top-[35%] rotate-[4deg] z-10">
          <div className="bg-zinc-800 py-4 shadow-lg">
            <MarqueeRow text={strip1} speed={25} />
          </div>
        </div>

        {/* Top Strip */}
        <div className="absolute w-[160%] right-[-10%] top-[35%] -rotate-[4deg] z-20">
          <div className="bg-red-600 py-4 shadow-2xl">
            <MarqueeRow text={strip2} speed={25} />
          </div>
        </div>

      </div>

      {/* Bottom Content */}
      <div className="mt-24 grid grid-cols-3 items-start text-sm">

        {/* Left */}
        <div className="text-gray-400">0/2</div>

        {/* Center */}
        <div className="text-center">
          <h3 className="text-white font-semibold mb-2">
            Recent Projects
          </h3>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Most of time is spent building web products and crafting smooth user experiences with modern technologies.
          </p>
        </div>

        {/* Right */}
        <div className="text-right text-gray-400">
          Creative Development
        </div>
      </div>
    </div>
  );
}