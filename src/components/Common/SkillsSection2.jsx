// SkillsSection2.jsx
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Matter, {
  Bodies,
  Common,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from "matter-js";
import decomp from "poly-decomp";

// =========================
// Utility Functions
// =========================
const cn = (...classes) => classes.filter(Boolean).join(" ");

function calculatePosition(value, containerSize, elementSize) {
  if (typeof value === "string" && value.endsWith("%")) {
    return (parseFloat(value) / 100) * containerSize;
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2;
}

// =========================
// Gravity Context
// =========================
const GravityContext = createContext(null);

// =========================
// MatterBody Component
// =========================
export const MatterBody = ({
  children,
  className,
  matterBodyOptions = { friction: 0.1, restitution: 0.2 },
  bodyType = "rectangle",
  x = 0,
  y = 0,
}) => {
  const elementRef = useRef(null);
  const idRef = useRef(Math.random().toString(36).slice(2));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;

    context.registerElement(idRef.current, elementRef.current, {
      matterBodyOptions,
      bodyType,
      x,
      y,
    });

    return () => context.unregisterElement(idRef.current);
  }, [context]);

  return (
    <div ref={elementRef} className={cn("absolute", className)}>
      {children}
    </div>
  );
};

// =========================
// Gravity Component
// =========================
export const Gravity = forwardRef(
  ({ children, gravity = { x: 0, y: 1 }, className }, ref) => {
    const containerRef = useRef(null);
    const engine = useRef(Engine.create());
    const render = useRef(null);
    const runner = useRef(null);
    const bodiesMap = useRef(new Map());

    // Register a new body
    const registerElement = useCallback((id, element, props) => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const rect = containerRef.current.getBoundingClientRect();

      const x = calculatePosition(props.x, rect.width, width);
      const y = calculatePosition(props.y, rect.height, height);

      const body =
        props.bodyType === "circle"
          ? Bodies.circle(x, y, width / 2, props.matterBodyOptions)
          : Bodies.rectangle(x, y, width, height, props.matterBodyOptions);

      World.add(engine.current.world, body);
      bodiesMap.current.set(id, { element, body });
    }, []);

    // Remove a body
    const unregisterElement = useCallback((id) => {
      const item = bodiesMap.current.get(id);
      if (item) {
        World.remove(engine.current.world, item.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    // Sync DOM elements with physics
    const update = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const angle = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${
          y - element.offsetHeight / 2
        }px) rotate(${angle}deg)`;
      });
      requestAnimationFrame(update);
    }, []);

    // Initialize Matter.js
    useEffect(() => {
      if (!containerRef.current) return;

      Common.setDecomp(decomp);

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      render.current = Render.create({
        element: containerRef.current,
        engine: engine.current,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
        },
      });

      // Walls to contain objects
      World.add(engine.current.world, [
        Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true }), // floor
        Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true }), // left
        Bodies.rectangle(width + 20, height / 2, 40, height, {
          isStatic: true,
        }), // right
      ]);

      // Mouse drag
      const mouse = Mouse.create(render.current.canvas);
      const mouseConstraint = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2 },
      });
      World.add(engine.current.world, mouseConstraint);

      Render.run(render.current);
      runner.current = Runner.create();
      Runner.run(runner.current, engine.current);

      update();

      return () => {
        Render.stop(render.current);
        Runner.stop(runner.current);
        World.clear(engine.current.world);
        Engine.clear(engine.current);
      };
    }, []);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={containerRef}
          className={cn("relative w-full h-full", className)}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  },
);

// =========================
// SkillsSection2 Component
// =========================
export default function SkillsSection2() {
  return (
    <div className="w-full h-[600px] relative">
      <Gravity>
        <MatterBody x="30%" y="10%">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full">
            React
          </div>
        </MatterBody>
        <MatterBody x="50%" y="20%">
          <div className="bg-pink-500 text-white px-6 py-3 rounded-full">
            TypeScript
          </div>
        </MatterBody>
        <MatterBody x="70%" y="10%">
          <div className="bg-orange-500 text-white px-6 py-3 rounded-full">
            Tailwind
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
}
