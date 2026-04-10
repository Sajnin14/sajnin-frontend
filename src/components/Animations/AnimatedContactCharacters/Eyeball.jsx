"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Pupil({ size = 12, pupilColor = "black" }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calc = () => {
    if (!ref.current) return { x: 0, y: 0 };

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouseX - cx;
    const dy = mouseY - cy;

    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 6);
    const angle = Math.atan2(dy, dx);

    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    };
  };

  const pos = calc();

  return (
    <div
      ref={ref}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}