import React from "react";
import { motion } from "motion/react";
import Container from "../Common/Container";
import { AllPhotos } from "../Common/AllPhotos";

import sectionFlower from "../../assets/SVG/section-flower.svg";

// Experience data
const experiences = [
    {
        title: "Frontend Developer",
        officeName: "Softvence Agency",
        duration: "May — Present",
        url: "https://softvence.com/"
    },
];

const ExperiencesSection = () => {
    return (
        <section className="w-full bg-primary py-24 md:py-32 relative overflow-hidden" id="my-experience">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-6">
                            {/* Spinning Flower */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 flex items-center justify-center"
                            >
                                <img src={sectionFlower} alt="flower" className="w-full h-full object-contain" />
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none flex items-center gap-4 bg-clip-text text-transparent bg-linear-to-r from-primaryText via-primaryText to-highlight">
                                <span>My</span>
                                <span>Experience.</span>
                            </h2>
                        </div>
                        <p className="text-secondaryText text-lg md:text-xl max-w-lg mt-4 ml-0 md:ml-20">
                            Building modern digital experiences through a journey of continuous learning and professional growth.
                        </p>
                    </motion.div>

                    {/* Experiences List */}
                    <div className="flex flex-col border-t border-white/5">
                        {experiences.map((exp, index) => (
                            <ExperienceItem key={index} {...exp} index={index} />
                        ))}
                    </div>
                </div>
            </Container>

            {/* Decorative background element */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-150 h-150 bg-highlight/5 rounded-full blur-[140px] pointer-events-none" />
        </section>
    );
};

const ExperienceItem = ({ title, officeName, duration, url, index }) => {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 transition-all duration-500 ease-in-out cursor-pointer px-4 md:px-8 -mx-4 md:-mx-8 rounded-xl overflow-hidden block"
        >
            {/* Bottom Border */}
            <div className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-30 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-700" />

            {/* Hover Background */}
            <div className="absolute inset-0 bg-white/3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />

            <div className="flex flex-col gap-1 relative z-10">
                <span className="text-highlight/80 font-mono text-sm tracking-[0.2em] uppercase group-hover:text-highlight transition-colors duration-300">
                    {duration}
                </span>
                <h3 className="text-4xl md:text-6xl font-bold text-primaryText group-hover:text-highlight transition-colors duration-300 tracking-tight">
                    {title}
                </h3>
            </div>

            <div className="flex flex-col md:items-end mt-6 md:mt-0 gap-2 relative z-10">
                <span className="text-2xl md:text-3xl text-secondaryText font-medium tracking-tight group-hover:text-white transition-colors duration-300">
                    {officeName}
                </span>
                <div className="flex items-center gap-2 md:justify-end">
                    <div className="w-8 h-px bg-border/30 group-hover:w-16 group-hover:bg-highlight transition-all duration-300" />
                    <span className="text-xs text-secondaryText group-hover:text-highlight transition-colors duration-300 uppercase tracking-wider font-semibold">
                        Frontend Mastery
                    </span>
                </div>
            </div>

            {/* Link Arrow */}
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden lg:block">
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-highlight"
                >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
        </motion.a>
    );
};

export default ExperiencesSection;