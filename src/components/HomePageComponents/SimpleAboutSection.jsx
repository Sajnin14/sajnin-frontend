import React from "react";
import Container from "../Common/Container";
import BlurScrollText from "../Animations/BlurScrollText";

export default function SimpleAboutSection() {
  return (
    <div id="about" className="w-full bg-primary pt-0 pb-10">
      <Container>
        <div className="space-y-6">
          <BlurScrollText
            className="w-4/5"
            text={
              "I’m a frontend developer who enjoys building practical, well-structured web applications. I work mainly with React and JavaScript to create interfaces that are responsive, consistent, and easy to use. "
            }
          />
          <BlurScrollText
            className="w-4/5"
            text={
              "I focus on writing clean code and building UI that not only looks good but also performs well in real-world use. I like working on products where details matter and user experience is a priority."
            }
          />
        </div>
      </Container>
    </div>
  );
}
