import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Marquee } from "@/components/ui/marquee";

export default function SkillsSection() {
  const sceneRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 👀 detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const {
      Engine,
      Render,
      Runner,
      World,
      Bodies,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    // 🔥 FIX: no sleeping (prevents faded/dead physics)
    const engine = Engine.create();

    engine.world.gravity.y = 1;

    // 🔥 stability tuning
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    engine.constraintIterations = 4;

    const world = engine.world;

    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
        showVelocity: false,
        showAngleIndicator: false,
      },
    });

    // ✨ CRISP CANVAS FIX
    render.canvas.style.imageRendering = "crisp-edges";
    render.canvas.style.transform = "translateZ(0)";

    // 🧱 boundaries
    const ground = Bodies.rectangle(width / 2, height + 40, width, 80, {
      isStatic: true,
    });

    const leftWall = Bodies.rectangle(-40, height / 2, 80, height, {
      isStatic: true,
    });

    const rightWall = Bodies.rectangle(width + 40, height / 2, 80, height, {
      isStatic: true,
    });

    // 📏 measure text width
    const getTextWidth = (text) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = "bold 16px sans-serif";
      return ctx.measureText(text).width;
    };

    // 💊 pill tag
    const createTag = (x, label, color) => {
      const paddingX = 28;
      const height = 50;

      const textWidth = getTextWidth(label);
      const width = textWidth + paddingX * 2;

      return Bodies.rectangle(x, -100, width, height, {
        friction: 0.2,
        frictionAir: 0.003, // 🔥 very important (removes faded feel)
        restitution: 0.55, // lively bounce but controlled
        density: 0.002,

        slop: 0.6, // prevents jitter but stays natural

        chamfer: {
          radius: height / 2,
        },

        inertia: Infinity,

        render: {
          fillStyle: color,
        },

        label,
      });
    };

    const tags = [
      // ⚛️ Core Frontend
      createTag(200, "HTML5", "#F97316"),
      createTag(600, "CSS3", "#38BDF8"),
      createTag(320, "JavaScript", "#FBBF24"),
      createTag(200, "TypeScript", "#60A5FA"),

      // ⚛️ React Ecosystem
      createTag(500, "React", "#60A5FA"),
      createTag(700, "Next.js", "#0F172A"),
      createTag(850, "Redux", "#A78BFA"),
      createTag(520, "React Query", "#8B5CF6"),
      createTag(380, "Context API", "#60A5FA"),

      // 🎨 UI / Styling
      createTag(400, "Tailwind CSS", "#38BDF8"),
      createTag(650, "Framer Motion", "#A78BFA"),

      // 🎬 Animation
      createTag(580, "GSAP", "#34D399"),
      createTag(420, "Lottie", "#10B981"),

      // 🧠 Data / Auth
      createTag(610, "REST API", "#34D399"),
      createTag(370, "JWT Auth", "#F97316"),

      // 🛠 Tools
      createTag(480, "Git", "#111827"),
      createTag(520, "GitHub", "#0F172A"),
      createTag(430, "Vite", "#60A5FA"),

      // 🔥 Backend (MERN awareness)
      createTag(800, "Node.js", "#34D399"),
      createTag(860, "MongoDB", "#10B981"),

      // ☁️ Deployment / Cloud
      createTag(900, "Firebase", "#FBBF24"),
      createTag(920, "Vercel", "#0F172A"),
      createTag(940, "Netlify", "#38BDF8"),
    ];

    World.add(world, [ground, leftWall, rightWall, ...tags]);

    // 🖱️ mouse control
    const mouse = Mouse.create(render.canvas);

    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.4,
        damping: 0.12,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    render.canvas.style.touchAction = "auto";

    // ✨ text rendering (clean + sharp)
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.save();

      tags.forEach((tag) => {
        const { x, y } = tag.position;

        ctx.translate(x, y);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px sans-serif";

        // ✨ FIX: remove faded look by adding subtle contrast
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        ctx.fillText(tag.label, 0, 0);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      ctx.restore();
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isVisible]);

  return (
    <div id="skills" className="w-full bg-primary min-h-150 flex flex-col items-center">
      <h2 className="pt-8 text-6xl text-primaryText">Expertise</h2>

      <p className="pt-4 text-xl text-secondaryText">
        The tools, technologies, and skills I use to build modern web experiences
      </p>

      <div ref={sceneRef} className="w-full h-110 overflow-hidden" />

      <Marquee
        reverse
        pauseOnHover
        className="w-full! bg-bgCard [--duration:20s]"
      >
        <div className="h-10 text-highlight flex items-center justify-center whitespace-nowrap">
          <p>Skills I have expertise in...</p>
          <p>Skills I have expertise in...</p>
          <p>Skills I have expertise in...</p>
        </div>
      </Marquee>
    </div>
  );
}