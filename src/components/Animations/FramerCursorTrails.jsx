import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/Images/image 24.png";
import image2 from "../../assets/Images/Untitled design (9) 1.png";
import image3 from "../../assets/Images/code.png";
import image4 from "../../assets/Images/react.png";

const TRAIL_THRESHOLD = 50;
const IMAGE_LIFETIME = 1.5;

// Array of images with custom sizes and border radius
const TRAIL_IMAGES = [
  {
    src: image,
    width: 80,
    height: 80,
    borderRadius: "2%",
  },
  {
    src: image2,
    width: 70,
    height: 70,
    borderRadius: "5%",
  },
  {
    src: image3,
    width: 40,
    height: 40,
    borderRadius: "0%",
  },
  {
    src: image4,
    width: 100,
    height: 100,
    borderRadius: "30%",
  },
];

export default function FramerCursorTrails() {
  const [trailImages, setTrailImages] = useState([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const distance = Math.hypot(
        e.clientX - lastPosition.x,
        e.clientY - lastPosition.y,
      );

      if (distance > TRAIL_THRESHOLD) {
        const id = Date.now();
        // pick a random image from the array
        const randomImage =
          TRAIL_IMAGES[Math.floor(Math.random() * TRAIL_IMAGES.length)];
        setTrailImages((prev) => [
          ...prev,
          {
            id,
            x: e.clientX,
            y: e.clientY,
            ...randomImage, // include src, width, height, borderRadius
          },
        ]);
        setLastPosition({ x: e.clientX, y: e.clientY });

        // remove after lifetime
        setTimeout(() => {
          setTrailImages((prev) => prev.filter((img) => img.id !== id));
        }, IMAGE_LIFETIME * 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lastPosition]);

  return (
    <div className="w-full h-100">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {trailImages.map((img) => (
            <motion.img
              key={img.id}
              src={img.src}
              alt="trail"
              className="absolute"
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
    </div>
  );
}
