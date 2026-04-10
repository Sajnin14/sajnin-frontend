"use client";

import React, { useEffect, useRef, useState } from "react";
import EyeBall from "./EyeBall";
import Pupil from "./Pupil";

export default function AnimatedCharacters() {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const purpleRef = useRef(null);
    const blackRef = useRef(null);
    const yellowRef = useRef(null);
    const orangeRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouseX(e.clientX);
            setMouseY(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const calculatePosition = (ref) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        return {
            faceX: Math.max(-15, Math.min(15, deltaX / 20)),
            faceY: Math.max(-10, Math.min(10, deltaY / 30)),
            bodySkew: Math.max(-6, Math.min(6, -deltaX / 120)),
        };
    };

    const purplePos = calculatePosition(purpleRef);
    const blackPos = calculatePosition(blackRef);
    const yellowPos = calculatePosition(yellowRef);
    const orangePos = calculatePosition(orangeRef);

    return (
        <div className="relative w-[550px] h-[400px]">

            {/* ================= PURPLE ================= */}
            <div
                ref={purpleRef}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                    left: "70px",
                    width: "180px",
                    height: "400px",
                    backgroundColor: "#6C3FF5",
                    borderRadius: "10px 10px 0 0",
                    transform: `skewX(${purplePos.bodySkew}deg)`,
                }}
            >
                <div
                    className="absolute flex gap-6"
                    style={{
                        left: `${45 + purplePos.faceX}px`,
                        top: `${40 + purplePos.faceY}px`,
                    }}
                >
                    <EyeBall size={18} pupilSize={7} />
                    <EyeBall size={18} pupilSize={7} />
                </div>
            </div>

            {/* ================= BLACK ================= */}
            <div
                ref={blackRef}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                    left: "240px",
                    width: "120px",
                    height: "310px",
                    backgroundColor: "#2D2D2D",
                    borderRadius: "8px 8px 0 0",
                    transform: `skewX(${blackPos.bodySkew}deg)`,
                }}
            >
                <div
                    className="absolute flex gap-4"
                    style={{
                        left: `${26 + blackPos.faceX}px`,
                        top: `${32 + blackPos.faceY}px`,
                    }}
                >
                    <EyeBall size={16} pupilSize={6} />
                    <EyeBall size={16} pupilSize={6} />
                </div>
            </div>

            {/* ================= ORANGE ================= */}
            <div
                ref={orangeRef}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                    left: "0px",
                    width: "240px",
                    height: "200px",
                    backgroundColor: "#FF9B6B",
                    borderRadius: "120px 120px 0 0",
                    transform: `skewX(${orangePos.bodySkew}deg)`,
                }}
            >
                <div
                    className="absolute flex gap-6"
                    style={{
                        left: `${82 + orangePos.faceX}px`,
                        top: `${90 + orangePos.faceY}px`,
                    }}
                >
                    <Pupil size={12} />
                    <Pupil size={12} />
                </div>
            </div>

            {/* ================= YELLOW ================= */}
            <div
                ref={yellowRef}
                className="absolute bottom-0 transition-all duration-700 ease-in-out"
                style={{
                    left: "310px",
                    width: "140px",
                    height: "230px",
                    backgroundColor: "#E8D754",
                    borderRadius: "70px 70px 0 0",
                    transform: `skewX(${yellowPos.bodySkew}deg)`,
                }}
            >
                <div
                    className="absolute flex gap-5"
                    style={{
                        left: `${52 + yellowPos.faceX}px`,
                        top: `${40 + yellowPos.faceY}px`,
                    }}
                >
                    <Pupil size={12} />
                    <Pupil size={12} />
                </div>

                {/* mouth */}
                <div
                    className="absolute w-16 h-1 bg-black rounded-full"
                    style={{
                        left: `${40 + yellowPos.faceX}px`,
                        top: "88px",
                    }}
                />
            </div>
        </div>
    );
}