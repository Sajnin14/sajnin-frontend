import React, { useEffect, useState } from "react";
import Container from "@/components/Common/Container";
import { motion } from "motion/react";
import CircularText from "../Animations/CircularText";

export default function HeroSction() {
  const [scrollY, setScrollY] = useState(0); //for text

  useEffect(() => {
    const handleText = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleText);

    return () => {
      window.removeEventListener("scroll", handleText);
    };
  }, []);

  const [isMove, setIsMove] = useState(false); //for image movement
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMove(true);
    });
  }, []);

  return (
    <div className="w-full bg-primary pt-12 pb-24">
      <Container>
        <div>
          {/* <LetterPullUpText
            text="Welcome to EldoraUI"
            className="text-blue-600"
          /> */}
          <div
            data-aos="fade-down"
            className="mt-10 flex items-center gap-4 text-7xl font-bold text-white"
          >
            <p
              className={`transition-transform duration-500 ${
                scrollY > 0 ? "-translate-x-20" : "translate-x-0"
              }`}
            >
              {/* Frontend */} Wolf
            </p>
            <p>—</p>
            <p
              className={`transition-transform duration-500 ${
                scrollY > 0 ? "translate-x-20" : "translate-x-0"
              }`}
            >
              {/* Developer */} Marketing
            </p>
          </div>

          {/* circular text */}
          <div className="mt-20 w-full relative flex items-start justify-start">
            <div className="w-fit">
              <CircularText
                // text="sajnin*akhter*saima*"
                text="wolf*marketing*h9x*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
              />
            </div>
          </div>
        </div>

        {/* image */}
        {/* <div
          className={`w-full transition-transform duration-700 ease-in-out ${isMove ? "translate-x-11/12" : "translate-x-1/4"} `}
        >
          <div className={`w-20 h-20 bg-gray-700 rounded-lg `}></div>
        </div> */}

        <motion.div
          initial={{ opacity: 1, x: 200 }}
          animate={{ opacity: 1, x: "100%" }}
          transition={{
            delay: 0.5, // ⏱ stays centered for 1 second
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // ✨ ultra-smooth
          }}
          className="w-full text-left -mt-20"
        >
          <div className={`w-20 h-20 bg-gray-700 rounded-lg `}></div>
        </motion.div>
      </Container>
    </div>
  );
}
