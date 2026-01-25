import React from "react";
import Container from "@/components/Common/Container";
import { LetterPullUpText } from "@/components/ui/letter-pull-up-text";
import { FontWeightText } from "@/components/ui/font-weight-text";

export default function HeroSction() {
  return (
    <div className="w-full bg-primary">
      <Container>
        <div>
          <LetterPullUpText
            text="Welcome to EldoraUI"
            className="text-blue-600"
          />
        </div>
      </Container>
    </div>
  );
}
