import FloatingTargetComponents from "@/components/Animations/FloatingTargetComponents";
import SkillsSection2 from "@/components/Common/SkillsSection2";
import Achivements from "@/components/HomePageComponents/Achivements";
import HeroSction from "@/components/HomePageComponents/HeroSction";
import ProjectsSection from "@/components/HomePageComponents/ProjectsSection";
import ScrollPath from "@/components/HomePageComponents/ScrollPath";
import SimpleAboutSection from "@/components/HomePageComponents/SimpleAboutSection";
import SkillsSection from "@/components/HomePageComponents/SkillsSection";
import TechMarqueeSection from "@/components/HomePageComponents/TechMarqueeSection";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSction />
      <SimpleAboutSection />
      <TechMarqueeSection />
      <SkillsSection />
      <SkillsSection2 />
      <FloatingTargetComponents />
      <Achivements />
      <ProjectsSection />
      <ScrollPath />
    </div>
  );
}
