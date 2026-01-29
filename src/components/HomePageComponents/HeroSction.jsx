import React, { useEffect, useState } from "react";
import Container from "@/components/Common/Container";
import { motion } from "framer-motion";
import { LetterPullUpText } from "@/components/ui/letter-pull-up-text";
import BlurScrollText from "../Animations/BlurScrollText";

export default function HeroSction() {
  const [isMove, setIsMove] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMove(true);
    });
  }, []);
  return (
    <div className="w-full bg-primary">
      <Container>
        <div>
          {/* <LetterPullUpText
            text="Welcome to EldoraUI"
            className="text-blue-600"
          /> */}
        </div>
        <div
          className={`w-full transition-transform duration-700 ease-in-out  ${isMove ? "translate-x-11/12" : "translate-x-3/4"} `}
        >
          <div className={`w-20 h-20 bg-gray-700 rounded-lg `}></div>
        </div>

        <motion.div
          initial={{ opacity: 1, x: 600 }}
          animate={{ opacity: 1, x: 600 }}
          transition={{
            delay: 0.5, // ⏱ stays centered for 1 second
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // ✨ ultra-smooth
          }}
          className="max-w-xl text-left"
        >
          <div className={`w-20 h-20 bg-gray-700 rounded-lg `}></div>
        </motion.div>

        <div className="my-100">
          <BlurScrollText
            className="w-4/5"
            text={
              "By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.By default, Motion will create appropriate transitions for snappy animations based on the type of value being animatedBy default, Motion will create appropriate transitions for snappy animations based on the type of value being animated"
            }
          />
        </div>
      </Container>
    </div>
  );
}
