import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollTo";
import logo from "../assets/portfolio_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItem =
    "text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200";

  const handleNavClick = (id) => {
    scrollToSection(id, navigate, location.pathname);
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-grey/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-full z-50 flex items-center justify-between">

      <button
        onClick={handleHomeClick}
        className="font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity duration-200"
      >
        Saad A.
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <button onClick={handleHomeClick} className={navItem}>
            Home
          </button>
        </li>

        <li>
          <button onClick={() => handleNavClick("#intro")} className={navItem}>
            Intro
          </button>
        </li>

        <li>
          <Link to="/projects" className={navItem}>
            Projects
          </Link>
        </li>

        <li>
          <Link to="/about" className={navItem}>
            About
          </Link>
        </li>

        <li>
          <Link to="/resume" className={navItem}>
            Resume
          </Link>
        </li>

        <li>
          <button onClick={() => handleNavClick("#contact")} className={navItem}>
            Book
          </button>
        </li>

        <li>
          <button
            onClick={() => handleNavClick("#contact-form")}
            className={navItem}
          // className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors duration-200"
          >
            Connect
          </button>
        </li>
      </ul>

      {/* Hamburger Button (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 flex flex-col items-center justify-center group"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? "rotate-45" : "-translate-y-2"
              }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? "-rotate-45" : "translate-y-2"
              }`}
          ></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-20 left-1/2 -translate-x-1/2 w-[92%] bg-black/90 backdrop-blur-2xl border border-white/20 rounded-3xl py-10 transition-all duration-300 scale-95 origin-top md:hidden ${isOpen ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 -translate-y-4 invisible scale-95"
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          <button
            onClick={handleHomeClick}
            className={`${navItem} text-sm`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick("#intro")}
            className={`${navItem} text-sm`}
          >
            Intro
          </button>

          <Link
            to="/projects"
            onClick={() => setIsOpen(false)}
            className={`${navItem} text-sm`}
          >
            Projects
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`${navItem} text-sm`}
          >
            About
          </Link>

          <Link
            to="/resume"
            onClick={() => setIsOpen(false)}
            className={`${navItem} text-sm`}
          >
            Resume
          </Link>

          <button
            onClick={() => handleNavClick("#contact")}
            className={`${navItem} text-sm`}
          >
            Book
          </button>

          <button
            onClick={() => handleNavClick("#contact-form")}
            className="w-[80%] btn-primary text-xs"
          >
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;