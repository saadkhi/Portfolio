import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full z-50 flex items-center justify-between animate-fade-in shadow-2xl">
            <div className="font-heading font-bold text-lg tracking-tighter mr-8">Saad.</div>

            <ul className="hidden md:flex gap-6 list-none items-center">
                <li>
                    {isHome ? <a href="#home" className="text-text-primary text-xs font-semibold uppercase tracking-widest transition-colors duration-200">Home</a> : <Link to="/" className="text-text-secondary text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:text-text-primary">Home</Link>}
                </li>
                <li><Link to="/projects" className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:text-text-primary ${location.pathname === '/projects' ? 'text-text-primary' : 'text-text-secondary'}`}>Work</Link></li>
                <li>
                    {isHome ? <a href="#about" className="text-text-secondary text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:text-text-primary">About</a> : <Link to="/#about" className="text-text-secondary text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:text-text-primary">About</Link>}
                </li>
                <li>
                    <a href="#contact" className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-primary-accent hover:shadow-[0_0_20px_rgba(255,138,0,0.3)] active:scale-95">Connect</a>
                </li>
            </ul>

            {/* Mobile menu could be added here, but keeping it simple for now as requested */}
            <div className="md:hidden">
                <a href="#contact" className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white text-black">Connect</a>
            </div>
        </nav>
    );
};

export default Navbar;
