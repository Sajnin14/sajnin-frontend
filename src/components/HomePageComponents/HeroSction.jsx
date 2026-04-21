import React, { useEffect, useState } from "react";
import Container from "@/components/Common/Container";
import { motion } from "motion/react";
import CircularText from "../Animations/CircularText";
import { Download } from "lucide-react";
import { AllPhotos } from "../Common/AllPhotos";

export default function HeroSction() {
  const [scrollY, setScrollY] = useState(0); //for text
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleText = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleText);

    return () => {
      window.removeEventListener("scroll", handleText);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // 👉 put your resume in public folder
    link.download = "Sajnin_Saima_Resume.pdf";
    link.click();
  };

  const [isMove, setIsMove] = useState(false); //for image movement
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMove(true);
    });
  }, []);

  return (
    <div className="w-full bg-primary relative z-10 pt-12 pb-18 overflow-hidden">
      <Container>
        <div>
          <div
            data-aos="fade-down"
            className="mt-10 flex flex-col gap-4 text-7xl font-bold text-primaryText"
          >
            <div className="flex items-center gap-4">
              <p
                className={`transition-transform duration-500 ${scrollY > 0 ? "-translate-x-20" : "translate-x-0"
                  }`}
              >
                Frontend
              </p>
              <p>—</p>
              <p
                className={`transition-transform duration-500 ${scrollY > 0 ? "translate-x-20" : "translate-x-0"
                  }`}
              >
                Developer
              </p>
            </div>

            {/* <h2 data-aos="fade-down" className="">Developer</h2> */}
          </div>

          {/* circular text */}
          {/* <div className="mt-14 w-full relative flex items-start justify-start">
            <div className="w-fit">
              <CircularText
                text="sajnin*akhter*saima*"
                // text="wolf*marketing*h9x*"
                onHover="speedUp"
                spinDuration={20}
                className="custom-class"
              />
            </div>
          </div> */}

          <div className="mt-14 w-full flex items-start justify-start">
            <div
              className="relative w-fit"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Circular Text (always clean) */}
              <div className="relative z-0">
                <CircularText
                  text="sajnin*akhter*saima*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="transition-none"
                />
              </div>

              {/* Hover Overlay (ONLY foreground layer) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
                  }`}
              >
                {/* IMPORTANT: no full dark overlay covering text */}
                <div className="absolute inset-0 m-8 bg-bgCard rounded-full" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <p className="text-white text-sm mb-2">My Resume</p>

                  <button
                    onClick={handleDownload}
                    className="px-4 py-1.5 text-xs bg-sky-400 hover:bg-sky-500 text-black rounded-full font-semibold transition"
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>


        <motion.div
          initial={{ opacity: 1, x: 200 }}
          animate={{ opacity: 1, x: "94%" }}
          transition={{
            delay: 0.5, // ⏱ stays centered for 1 second
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // ✨ ultra-smooth
          }}
          className="w-full text-left -mt-24"
        >
          <div className={`w-20 h-20 rounded-lg overflow-hidden relative`}>
            <img src={AllPhotos?.self} alt="sajnin" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-bgCard/40"/>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
