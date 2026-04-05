import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/Images/image 24.png";
import image2 from "../../assets/Images/Untitled design (9) 1.png";
import image3 from "../../assets/Images/code.png";
import image4 from "../../assets/Images/react.png";

const TRAIL_THRESHOLD = 50;
const IMAGE_LIFETIME = 1.5;

// Images with individual sizes
const TRAIL_IMAGES = [
  { src: image, width: 80, height: 80, borderRadius: "2%" },
  { src: image2, width: 70, height: 70, borderRadius: "5%" },
  { src: image3, width: 40, height: 40, borderRadius: "0%" },
  { src: image4, width: 100, height: 100, borderRadius: "30%" },
];

export default function FramerCursorTrails() {
  const [trailImages, setTrailImages] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current || !textRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // mouse position relative to section
      const x = e.clientX - sectionRect.left;
      const y = e.clientY - sectionRect.top;

      // Avoid spawning inside the text area
      const padding = 20; // extra padding around text
      if (
        e.clientX > textRect.left - padding &&
        e.clientX < textRect.right + padding &&
        e.clientY > textRect.top - padding &&
        e.clientY < textRect.bottom + padding
      ) {
        return; // skip spawning inside text
      }

      // Only spawn image if inside the section
      if (x < 0 || y < 0 || x > sectionRect.width || y > sectionRect.height)
        return;

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
      className="relative w-full h-[500px] bg-primary overflow-hidden flex items-center justify-center"
    >
      {/* Fixed center text */}
      <p
        ref={textRef}
        className="absolute text-center text-5xl font-bold z-10 pointer-events-none"
      >
        Amstardam
      </p>

      {/* Trail images behind the text */}
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
    </div>
  );
}
