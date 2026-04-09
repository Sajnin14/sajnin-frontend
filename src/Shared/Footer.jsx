import React from "react";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
    {
        label: "Twitter",
        icon: Twitter,
        href: "#",
    },
    {
        label: "Instagram",
        icon: Instagram,
        href: "#",
    },
    {
        label: "LinkedIn",
        icon: Linkedin,
        href: "#",
    },
    {
        label: "YouTube",
        icon: Youtube,
        href: "#",
    },
];

function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-primary dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-between gap-4 lg:flex-row">

                {/* Left Text */}
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                        pagedone
                    </span>
                    . All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                aria-label={link.label}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 dark:bg-gray-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300"
                            >
                                <Icon size={18} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}

export default Footer;