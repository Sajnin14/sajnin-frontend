import React from "react";
import Container from "@/components/Common/Container";
import { SOCIAL_LINKS } from "@/components/Lib/Data";
import { Github, Linkedin, Facebook } from "lucide-react";

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
};

function Footer() {
  return (
    <footer className="w-full py-12 bg-darkPrimary border-t border-border/30">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-2xl font-semibold italic text-primaryText">
              Sajnin
            </h2>
            <p className="text-sm text-secondaryText">
              © {new Date().getFullYear()} Sajnin Akhter Saima. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICON_MAP[link.name.toLowerCase()] || Github;
              const href = link.url.startsWith("http") ? link.url : `https://${link.url}`;
              return (
                <a
                  key={link.name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className="text-secondaryText hover:text-highlight transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Optional: Built with line */}
        <div className="mt-12 pt-8 border-t border-border/10 text-center">
          <p className="text-xs text-secondaryText/40 uppercase tracking-widest">
            Built with React & Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;