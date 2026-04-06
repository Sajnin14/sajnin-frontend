import React from "react";
import { motion } from "framer-motion";

const strip1 = "JAVASCRIPT ♦ TYPESCRIPT ♦ SOLIDITY ♦ ETHERS.JS ♦ ";
const strip2 =
  "JAVASCRIPT ♦ TYPESCRIPT ♦ REACTJS ♦ NEXTJS ♦ GSAP ♦ FRAMER MOTION ♦ SOLIDITY ♦ ETHERS.JS ♦ ";

const MarqueeRow = ({ text, speed }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="flex min-w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {/* Seamless loop */}
        <span className="flex text-white text-lg font-medium tracking-wide">
          {text.repeat(4)}
        </span>
        <span className="flex text-white text-lg font-medium tracking-wide">
          {text.repeat(4)}
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
      <div className="relative h-52 flex items-center justify-center overflow-hidden">
        {/* Bottom Strip */}
        <div className="absolute w-[180%] left-1/2 -translate-x-1/2 top-[40%] rotate-[4deg] z-10">
          <div className="bg-zinc-800 py-4">
            <MarqueeRow text={strip1} speed={34} />
          </div>
        </div>

        {/* Top Strip */}
        <div className="absolute w-[180%] left-1/2 -translate-x-1/2 top-[36%] -rotate-[4deg] z-20">
          <div className="bg-red-600 py-4">
            <MarqueeRow text={strip2} speed={24} />
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="mt-24 grid grid-cols-3 items-start text-sm">
        {/* Left */}
        <div className="text-gray-400">0/2</div>

        {/* Center */}
        <div className="text-center">
          <h3 className="text-white font-semibold mb-2">Recent Projects</h3>
          <p className="text-gray-400 text-xs max-w-xs mx-auto">
            Most of time is spent building web products and crafting smooth user
            experiences with modern technologies.
          </p>
        </div>

        {/* Right */}
        <div className="text-right text-gray-400">Creative Development</div>
      </div>
    </div>
  );
}
