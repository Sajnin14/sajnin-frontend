const { default: gsap } = require("gsap");

function buildTimeline() {
  ctx && ctx.revert(); // If the context exists, revert it and rebuild so the FLIP animations are recalculated on resize and reflect the new layout
  
  // collect all of our animations in a GSAP context
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 2
      }
    });
    
  });
}

addEventListener("resize", () => {
  buildTimeline();
});