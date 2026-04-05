import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/Images/image 24.png";
import image2 from "../../assets/Images/Untitled design (9) 1.png";
import image3 from "../../assets/Images/code.png";
import image4 from "../../assets/Images/react.png";
import Container from "../Common/Container";

const TRAIL_THRESHOLD = 120;
const IMAGE_LIFETIME = 1.5;

const TRAIL_IMAGES = [
  { src: image, width: 140, height: 140, borderRadius: "8%" },
  { src: image2, width: 120, height: 120, borderRadius: "10%" },
  { src: image3, width: 100, height: 100, borderRadius: "0%" },
  { src: image4, width: 160, height: 160, borderRadius: "20%" },
];

export default function FramerCursorTrails() {
  const [trailImages, setTrailImages] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null); // ref to the section

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only spawn image if mouse is inside the section
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const distance = Math.hypot(x - lastPosition.x, y - lastPosition.y);
      if (distance > TRAIL_THRESHOLD) {
        const id = Date.now();
        const randomImage =
          TRAIL_IMAGES[Math.floor(Math.random() * TRAIL_IMAGES.length)];

        setTrailImages((prev) => [
          ...prev,
          {
            id,
            x,
            y,
            ...randomImage,
          },
        ]);
        setLastPosition({ x, y });

        setTimeout(() => {
          setTrailImages((prev) => prev.filter((img) => img.id !== id));
        }, IMAGE_LIFETIME * 1000);
      }
    };

    const section = sectionRef.current;
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [lastPosition]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[500px] bg-black overflow-hidden"
    >
      <Container className="relative w-full h-full">
        {/* 🔹 Center Text (Always on top) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-white text-5xl font-bold">Amsterdam</p>
        </div>

        {/* 🔹 Cursor Trail Images */}
        <AnimatePresence>
          {trailImages.map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt="trail"
              className="absolute z-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                x: img.x - img.width / 2,
                y: img.y - img.height / 2,
                width: img.width,
                height: img.height,
                borderRadius: img.borderRadius,
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </AnimatePresence>
      </Container>
    </div>
  );
}
