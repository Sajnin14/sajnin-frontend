import React from "react";
import Container from "@/components/Common/Container";
import { LetterPullUpText } from "@/components/ui/letter-pull-up-text";

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
         <div>
           <div className="w-20 h-20 bg-gray-700 rounded-lg translate-x-100">
              
           </div>
         </div>
      </Container>
    </div>
  );
}
