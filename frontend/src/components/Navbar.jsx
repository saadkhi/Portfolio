import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px]  bg-black/70 backdrop-blur-[20px] border border-white/60 px-6 py-3 rounded-full z-50 flex items-center justify-between animate-enter">
            <div className="font-heading font-bold text-xl tracking-tighter flex-1">Saad.</div>

            <ul className="hidden md:flex gap-8 list-none justify-center">
                <li>
                    {isHome ? <a href="#home" className="text-text-primary text-sm font-medium transition-colors duration-200">Home</a> : <Link to="/" className="text-text-secondary text-sm font-medium transition-colors duration-200 hover:text-text-primary">Home</Link>}
                </li>
                <li><Link to="/projects" className={`text-sm font-medium transition-colors duration-200 hover:text-text-primary ${location.pathname === '/projects' ? 'text-text-primary' : 'text-text-secondary'}`}>Projects</Link></li>
                <li>
                    {isHome ? <a href="#work" className="text-text-secondary text-sm font-medium transition-colors duration-200 hover:text-text-primary">Work</a> : <Link to="/#work" className="text-text-secondary text-sm font-medium transition-colors duration-200 hover:text-text-primary">Work</Link>}
                </li>
                <li>
                    {isHome ? <a href="#about" className="text-text-secondary text-sm font-medium transition-colors duration-200 hover:text-text-primary">About</a> : <Link to="/#about" className="text-text-secondary text-sm font-medium transition-colors duration-200 hover:text-text-primary">About</Link>}
                </li>
            </ul>

            <div className="flex-1 flex justify-end">
                <a href="#contact" className="inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer font-heading bg-text-primary text-bg-dark hover:bg-primary-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(185,255,0,0.2)]">Let's Talk</a>
            </div>
        </nav>
    );
};

export default Navbar;
