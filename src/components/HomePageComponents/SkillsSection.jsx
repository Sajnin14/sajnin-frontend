import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function SkillsSection() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
      Matter;

    const engine = Engine.create();
    const world = engine.world;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // boundaries
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, {
      isStatic: true,
    });

    // skill bubbles
    const createBubble = (x, y, label, color) => {
      return Bodies.circle(x, y, 60, {
        restitution: 0.6,
        friction: 0.3,
        render: {
          fillStyle: color,
        },
        label,
      });
    };

    const bubbles = [
      createBubble(200, 100, "React", "#0015ff"),
      createBubble(300, 50, "TypeScript", "#E794DA"),
      createBubble(400, 80, "Motion", "#1f464d"),
      createBubble(600, 50, "Tailwind", "#ff5941"),
      createBubble(700, 100, "Drei", "orange"),
      createBubble(500, 50, "Matter.js", "#ffd726"),
    ];

    World.add(world, [ground, leftWall, rightWall, ...bubbles]);

    // mouse control (drag)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

    World.add(world, mouseConstraint);

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
  }, []);

  return (
    <div className="w-full min-h-[600px] flex flex-col items-center">
      <h2 className="pt-20 text-6xl text-black italic">fancy</h2>
      <p className="pt-4 text-xl text-black">components made with:</p>

      {/* Physics canvas */}
      <div ref={sceneRef} className="w-full h-[500px]" />
    </div>
  );
}
