import AnimatedCharacters from "@/components/Animations/AnimatedContactCharacters/AnimatedCharacters";
import FloatingTargetComponents from "@/components/Animations/FloatingTargetComponents";
import SkillsSection2 from "@/components/Common/SkillsSection2";
import Achivements from "@/components/HomePageComponents/Achivements";
import ContactSection from "@/components/HomePageComponents/ContactSection";
import FaqSection from "@/components/HomePageComponents/FaqSection";
import HeroSction from "@/components/HomePageComponents/HeroSction";
import ProjectsSection from "@/components/HomePageComponents/ProjectsSection";
import ScrollPath from "@/components/HomePageComponents/ScrollPath";
import SimpleAboutSection from "@/components/HomePageComponents/SimpleAboutSection";
import SkillsSection from "@/components/HomePageComponents/SkillsSection";
import SkillsTagCloud from "@/components/HomePageComponents/SkillsTagCloud";
import TechMarqueeSection from "@/components/HomePageComponents/TechMarqueeSection";

import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSction />
      <SimpleAboutSection />
      <TechMarqueeSection />
      <SkillsSection />
      <SkillsTagCloud />
      <FloatingTargetComponents />
      <Achivements />
      <ProjectsSection />
      <ContactSection />
      <FaqSection />
      {/* <ScrollPath /> */}
    </div>
  );
}
