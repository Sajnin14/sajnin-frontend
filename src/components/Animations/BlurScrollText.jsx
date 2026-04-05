import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const BlurScrollText = ({ text, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into characters
    const split = new SplitType(textRef.current, {
      types: "words, chars",
    });

    // GSAP animation
    gsap.fromTo(
      split.chars,
      {
        filter: "blur(10px) brightness(0%)",
        willChange: "filter",
      },
      {
        filter: "blur(0px) brightness(100%)",
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=15%",
          end: "bottom center+=15%",
          scrub: true,
        },
      }
    );

    // Cleanup on unmount
    return () => {
      split.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <p
      ref={textRef}
      className={`text-white text-2xl md:text-4xl font-semibold leading-tight ${className}`}
    >
      {text}
    </p>
  );
};

export default BlurScrollText;
