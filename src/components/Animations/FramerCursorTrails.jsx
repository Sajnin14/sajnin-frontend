import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/Images/image 24.png";
import image2 from "../../assets/Images/Untitled design (9) 1.png";
import image3 from "../../assets/Images/code.png";
import image4 from "../../assets/Images/react.png";
import Container from "../Common/Container";

const TRAIL_THRESHOLD = 80;
const IMAGE_LIFETIME = 1.5;

const TRAIL_IMAGES = [
  { src: image, width: 140, height: 140, borderRadius: "8%" },
  { src: image2, width: 120, height: 120, borderRadius: "10%" },
  { src: image3, width: 100, height: 100, borderRadius: "0%" },
  { src: image4, width: 160, height: 160, borderRadius: "20%" },
];

export default function FramerCursorTrails() {
  const [trailImages, setTrailImages] = useState([]);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const spawnImage = (x, y, lifetime = IMAGE_LIFETIME) => {
    const id = Date.now() + Math.random();
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

    setTimeout(() => {
      setTrailImages((prev) => prev.filter((img) => img.id !== id));
    }, lifetime * 1000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 🔹 Intersection Observer to spawn images when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = section.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Spawn initial images when it comes into view
            // Making initial ones last a bit longer (3s) for better impact
            spawnImage(centerX - 180, centerY - 120, 3);
            spawnImage(centerX + 180, centerY + 120, 3);
            
            // Disconnect after first trigger if we only want it once
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const distance = Math.hypot(
        x - lastPositionRef.current.x,
        y - lastPositionRef.current.y
      );

      if (distance > TRAIL_THRESHOLD) {
        spawnImage(x, y);
        lastPositionRef.current = { x, y };
      }
    };

    const handleMouseEnter = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnImage(x, y);
      lastPositionRef.current = { x, y };
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      observer.disconnect();
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-125 bg-black overflow-hidden"
    >
      <Container className="relative w-full h-full">
        {/* 🔹 Center Text (Always on top) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-white text-5xl font-bold">ACHIVEMENTS</p>
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
