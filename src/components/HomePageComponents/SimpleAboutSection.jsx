import React from "react";
import Container from "../Common/Container";
import BlurScrollText from "../Animations/BlurScrollText";

export default function SimpleAboutSection() {
  return (
    <div className="w-full bg-primary py-10">
      <Container>
        <div className="">
          <BlurScrollText
            className="w-4/5"
            text={
              "By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.By default, Motion will create appropriate transitions for snappy animations based on the type of value being animatedBy default, Motion will create appropriate transitions for snappy animations based on the type of value being animated"
            }
          />
        </div>
      </Container>
    </div>
  );
}
