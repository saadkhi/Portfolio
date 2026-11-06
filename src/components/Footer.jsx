import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ data }) => {
    if (!data) return null;

    const col = "text-sm text-white/65 hover:text-white transition-colors link-draw";

    return (
        <footer className="bg-ink text-white">
            <div className="wrap py-16 md:py-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="font-heading text-3xl md:text-4xl font-semibold leading-tight max-w-sm">
                        AI and software, built to ship.
                    </p>
                    <a href={`mailto:${data.contact.email}`} className="inline-block mt-6 text-primary-accent font-semibold link-draw">
                        {data.contact.email}
                    </a>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-1">Pages</p>
                    <Link to="/#home" className={col}>Home</Link>
                    <Link to="/#about" className={col}>About</Link>
                    <Link to="/#projects" className={col}>Projects</Link>
                    <Link to="/#experience" className={col}>Experience</Link>
                    <Link to="/#contact-form" className={col}>Contact</Link>
                    <Link to="/resume" className={col}>Resume</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-1">Elsewhere</p>
                    <a href="https://github.com/saadkhi" target="_blank" rel="noopener noreferrer" className={col}>GitHub</a>
                    <a href="https://www.linkedin.com/in/saadkhi/" target="_blank" rel="noopener noreferrer" className={col}>LinkedIn</a>
                </div>
            </div>
            <div className="wrap pb-8">
                <p className="text-xs text-white/35 border-t border-white/10 pt-6 !text-left">
                    © {new Date().getFullYear()} Saad Ali. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
