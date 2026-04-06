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

    const engine = Engine.create();
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
      },
    });

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

    // 💊 create pill
    const createTag = (x, label, color) => {
      const paddingX = 30;
      const height = 50;

      const textWidth = getTextWidth(label);
      const width = textWidth + paddingX * 2;

      return Bodies.rectangle(x, -100, width, height, {
        restitution: 0.6,
        friction: 0.4,
        frictionAir: 0.03,
        density: 0.002,

        chamfer: {
          radius: height / 2, // ✅ perfect pill
        },

        inertia: Infinity, // ✅ prevents rotation (clean UI look)

        render: {
          fillStyle: color,
        },

        label,
      });
    };

    const tags = [
      createTag(200, "React", "#0015ff"),
      createTag(600, "JavaScript", "#ffd726"),
      createTag(320, "TypeScript", "#E794DA"),
      createTag(200, "Next.js", "#0015ff"),
      createTag(500, "Framer Motion", "#1f464d"),
      createTag(700, "Tailwind CSS", "#ff5941"),
      createTag(850, "Node.js", "orange"),
      createTag(500, "GSAP", "#1f464d"),
    ];

    World.add(world, [ground, leftWall, rightWall, ...tags]);

    // 🖱️ mouse (scroll-safe)
    const mouse = Mouse.create(render.canvas);

    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.4,
        damping: 0.1,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    render.canvas.style.touchAction = "auto";

    // ✨ PERFECT TEXT ALIGNMENT
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.save();

      tags.forEach((tag) => {
        const { x, y } = tag.position;
        const angle = tag.angle;

        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px sans-serif";
        ctx.fillStyle = "#fff";

        ctx.fillText(tag.label, 0, 0);

        ctx.rotate(-angle);
        ctx.translate(-x, -y);
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
    <div className="w-full min-h-150 flex flex-col items-center">
      <h2 className="pt-20 text-6xl text-black italic">fancy</h2>
      <p className="pt-4 text-xl text-black">
        components made with:
      </p>


      <div
        ref={sceneRef}
        className="w-full h-100 overflow-hidden"
      />

      <Marquee reverse pauseOnHover className="w-full! bg-gray-200  [--duration:20s]">
        <div className="h-10 bg-gray-200 flex items-center justify-center whitespace-nowrap">
          <p>Skills I have expertise in..</p>
          <p>Skills I have expertise in..</p>
          <p>Skills I have expertise in..</p>
        </div>
      </Marquee>
    </div>
  );
}