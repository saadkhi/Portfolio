import React from 'react';
import logo from '../assets/portfolio_logo.png';

const Footer = ({ data }) => {
    if (!data) return null;

    return (
        <footer className="py-12 md:py-20 px-6 md:px-8 border-t border-glass-border">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center text-center gap-10">

                {/* Column 1: Logo & Title */}
                <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <img src={logo} alt="Saad Ali" className="h-8 md:h-10 w-auto" />
                        <div className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-widest text-text-secondary">
                            SWE & AI Engineer
                        </div>
                    </div>
                </div>

                {/* Column 2: Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <a
                        href="https://github.com/saadkhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold"
                    >
                        Github
                    </a>
                    <a
                        href="https://www.linkedin.com/in/saadkhi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold"
                    >
                        LinkedIn
                    </a>
                    <a
                        href={`mailto:${data.contact.email}`}
                        className="text-text-secondary hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold"
                    >
                        Email
                    </a>
                </div>

                {/* Column 3: Copyright */}
                <div className="flex justify-center">
                    <p className="text-text-secondary text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-30">
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
