import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import { DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ScrollPath = () => {
  const mainRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const box = boxRef.current;
      const boxStartRect = box.getBoundingClientRect();

      const containers = gsap.utils.toArray(".container:not(.initial)");

      const points = containers.map((container) => {
        const marker = container.querySelector(".marker") || container;
        const r = marker.getBoundingClientRect();

        return {
          x:
            r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
          y:
            r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2),
        };
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".initial",
            start: "top center",
            endTrigger: ".sixth",
            end: "top center",
            scrub: 1,
          },
        })
        .to(box, {
          duration: 1,
          ease: "none",
          motionPath: {
            path: points,
            curviness: 1.5,
          },
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
        <div
          className="container initial absolute left-[60%] top-[5%] 
          w-[500px] h-[500px] p-6 border-2 border-dashed border-gray-400 bg-linear-to-r from-indigo-300 to-indigo-100
          rounded-lg flex items-center justify-center"
        >
          <div>
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
          {/* <div
            ref={boxRef}
            className="box w-[100px] h-[100px] rounded-lg 
              bg-no-repeat bg-contain"
            style={{
              backgroundImage:
                "url(https://assets.codepen.io/16327/flair-26.png)",
            }}
          /> */}

          {/* <div
            ref={boxRef}
            className="absolute w-[160px] h-[110px]
  rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-200
  shadow-[0_40px_80px_rgba(0,0,0,0.45)]
  flex flex-col justify-between p-4
  transform-gpu"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="text-xs text-black/70">Wallet</p>
            <p className="text-xl font-bold text-[#F59E0B]">$720</p>
            <div className="text-[10px] text-black/50">Project Preview</div>
          </div> */}

          <div
            ref={boxRef}
            className="absolute w-[120px] h-[120px] transform-gpu"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Body */}
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A5B4FC" />
                </linearGradient>

                <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>

              {/* Rocket body */}
              <ellipse cx="100" cy="90" rx="28" ry="50" fill="url(#bodyGrad)" />

              {/* Window */}
              <circle cx="100" cy="80" r="10" fill="#0F172A" />
              <circle cx="100" cy="80" r="6" fill="#38BDF8" />

              {/* Left fin */}
              <path d="M72 120 L50 145 L72 145 Z" fill="#EC4899" />

              {/* Right fin */}
              <path d="M128 120 L150 145 L128 145 Z" fill="#8B5CF6" />

              {/* Fire */}
              <path
                d="M100 145 C85 170, 115 170, 100 195"
                fill="url(#fireGrad)"
                id="rocket-fire"
              />
            </svg>
          </div>
        </div>

        {/* Second */}
        <div
          className="container absolute left-[10%] top-[25%] 
          w-[500px] h-[500px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center"
        >
          {/* <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" /> */}
          <div className="w-100 h-100 bg-linear-to-r from-indigo-300 to-indigo-100">
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
        </div>

        {/* Third */}
        <div
          className="container absolute right-[10%] top-[45%] 
          w-[500px] h-[500px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center"
        >
          {/* <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" /> */}
          <div className="w-100 h-100 bg-linear-to-r from-indigo-300 to-indigo-100">
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
        </div>

        {/* Fourth */}
        <div
          className="container absolute left-[20%] top-[65%] 
          w-[500px] h-[500px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center"
        >
          {/* <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" /> */}
          <div className="w-100 h-100 bg-linear-to-r from-indigo-300 to-indigo-100">
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
        </div>

        {/* Fifth */}
        <div
          className="container absolute left-[60%] top-[80%] 
          w-[500px] h-[500px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center"
        >
          {/* <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" /> */}
          <div className="w-100 h-100 bg-linear-to-r from-indigo-300 to-indigo-100">
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
        </div>

        {/* Sixth */}
        <div
          className="container sixth absolute left-[15%] top-[95%] 
          w-[500px] h-[500px] border-2 border-dashed border-gray-400 
          rounded-lg flex items-center justify-center"
        >
          {/* <div className="marker w-[100px] h-[100px] rounded-lg bg-gray-200" /> */}
          <div className="w-100 h-100 bg-linear-to-r from-indigo-300 to-indigo-100">
            <div className="flex items-start justify-between">
              <p className="text-sm">Wallet Balance</p>
              <p className="w-fit p-3 rounded-lg bg-amber-200">
                <DollarSign />
              </p>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">$720</p>
            <p>Deposit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPath;
