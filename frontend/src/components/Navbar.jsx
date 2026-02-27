import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItem =
    "text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200";

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

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-full z-50 flex items-center justify-between">

      {/* Logo */}
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
          <a href="/#intro" className={navItem}>
            Intro
          </a>
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
          <a href="/#contact" className={navItem}>
            Book
          </a>
        </li>

        <li>
          <a
            href="/#contact-form"
            className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors duration-200"
          >
            Connect
          </a>
        </li>
      </ul>

      {/* Hamburger Button (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[92%] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl py-6 flex flex-col items-center gap-6 md:hidden">

          <button onClick={handleHomeClick} className={navItem}>
            Home
          </button>

          <a
            href="/#intro"
            onClick={handleCloseMenu}
            className={navItem}
          >
            Intro
          </a>

          <Link
            to="/projects"
            onClick={handleCloseMenu}
            className={navItem}
          >
            Projects
          </Link>

          <Link
            to="/about"
            onClick={handleCloseMenu}
            className={navItem}
          >
            About
          </Link>

          <a
            href="/#contact"
            onClick={handleCloseMenu}
            className={navItem}
          >
            Book
          </a>

          <a
            href="/#contact-form"
            onClick={handleCloseMenu}
            className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/80"
          >
            Connect
          </a>

        </div>
      )}
    </nav>
  );
};

export default Navbar;