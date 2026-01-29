import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollPath = () => {
  const mainRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const box = boxRef.current;
      const boxStartRect = box.getBoundingClientRect();

      const containers = gsap.utils.toArray(
        ".container:not(.initial)"
      );

      const points = containers.map((container) => {
        const marker =
          container.querySelector(".marker") || container;
        const r = marker.getBoundingClientRect();

        return {
          x:
            r.left +
            r.width / 2 -
            (boxStartRect.left + boxStartRect.width / 2),
          y:
            r.top +
            r.height / 2 -
            (boxStartRect.top + boxStartRect.height / 2)
        };
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".initial",
          start: "top center",
          endTrigger: ".sixth",
          end: "top center",
          scrub: 1
        }
      }).to(box, {
        duration: 1,
        ease: "none",
        motionPath: {
          path: points,
          curviness: 1.5
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      {/* Spacer */}
      <div className="h-[20vh] flex items-center justify-center">
        Scroll Down
      </div>

      {/* Main */}
      <div className="relative h-[300vh]">
        {/* Initial */}
        <div className="container initial absolute left-[60%] top-[5%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div
            ref={boxRef}
            className="box w-[100px] h-[100px] rounded-lg 
              bg-no-repeat bg-contain"
            style={{
              backgroundImage:
                "url(https://assets.codepen.io/16327/flair-26.png)"
            }}
          />
        </div>

        {/* Second */}
        <div className="container absolute left-[10%] top-[25%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" />
        </div>

        {/* Third */}
        <div className="container absolute right-[10%] top-[45%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" />
        </div>

        {/* Fourth */}
        <div className="container absolute left-[20%] top-[65%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" />
        </div>

        {/* Fifth */}
        <div className="container absolute left-[60%] top-[80%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" />
        </div>

        {/* Sixth */}
        <div className="container sixth absolute left-[15%] top-[95%] 
          w-[140px] h-[140px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center">
          <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ScrollPath;
