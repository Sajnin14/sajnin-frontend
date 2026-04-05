import FloatingTargetComponents from "@/components/Animations/FloatingTargetComponents";
import Certificates from "@/components/HomePageComponents/Certificates";
import HeroSction from "@/components/HomePageComponents/HeroSction";
import ScrollPath from "@/components/HomePageComponents/ScrollPath";
import SimpleAboutSection from "@/components/HomePageComponents/SimpleAboutSection";
import TechMarqueeSection from "@/components/HomePageComponents/TechMarqueeSection";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSction />
      <SimpleAboutSection />
      <TechMarqueeSection />
      <FloatingTargetComponents />
      <Certificates />
      <ScrollPath />
    </div>
  );
}
