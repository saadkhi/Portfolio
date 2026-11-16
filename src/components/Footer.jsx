import React from 'react';
import { Link } from 'react-router-dom';

// Colophon: the closing block of the paper.
const Footer = ({ data }) => {
    if (!data) return null;

    const col = "text-lg link-draw self-start";

    return (
        <footer className="wrap pb-10">
            <div className="sec-rule"></div>
            <div className="py-10 md:py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="nameplate text-5xl md:text-6xl">{data.hero.name}</p>
                    <p className="mt-4 font-heading italic text-xl text-ink-soft !font-bold">AI and software, built to ship.</p>
                    <a href={`mailto:${data.contact.email}`} className="inline-block mt-5 text-lg link-draw">
                        {data.contact.email}
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="label pb-2 mb-2 border-b-2 border-ink">Sections</p>
                    <Link to="/#about" className={col}>Profile</Link>
                    <Link to="/#projects" className={col}>Work</Link>
                    <Link to="/#experience" className={col}>Experience</Link>
                    <Link to="/#skills" className={col}>Skills</Link>
                    <Link to="/#contact-form" className={col}>Letters</Link>
                    <Link to="/resume" className={col}>Resume</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="label pb-2 mb-2 border-b-2 border-ink">Elsewhere</p>
                    <a href="https://github.com/saadkhi" target="_blank" rel="noopener noreferrer" className={col}>GitHub</a>
                    <a href="https://www.linkedin.com/in/saadkhi/" target="_blank" rel="noopener noreferrer" className={col}>LinkedIn</a>
                </div>
            </div>
            <p className="label opacity-60 border-t border-ink pt-4">
                © {new Date().getFullYear()} {data.hero.name}. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
