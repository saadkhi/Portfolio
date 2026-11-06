import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollTo";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const item = ({ isActive }) =>
    `px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 ${isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white"}`;

  const goTo = (id) => {
    scrollToSection(id, navigate, location.pathname);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-50">
      <nav className="flex items-center justify-between bg-ink/90 backdrop-blur-xl border border-white/10 pl-6 pr-2 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <Link to="/" onClick={() => setIsOpen(false)} className="font-heading font-bold text-white text-base tracking-tight">
          Saad Ali
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={item}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo("#contact-form")}
            className="hidden md:inline-flex bg-white text-ink text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-zinc-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Contact
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="relative w-5 h-3.5 block">
              <span className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "top-1.5 rotate-45" : "top-0"}`}></span>
              <span className={`absolute left-0 top-1.5 w-5 h-0.5 bg-white transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "top-1.5 -rotate-45" : "top-3"}`}></span>
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden mt-2 bg-ink/95 backdrop-blur-xl border border-white/10 rounded-3xl p-3 transition-all duration-300 origin-top ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
      >
        <div className="flex flex-col">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setIsOpen(false)} className={({ isActive }) => `px-5 py-4 rounded-2xl text-base font-medium ${isActive ? "bg-white/10 text-white" : "text-white/70"}`}>
              {l.label}
            </NavLink>
          ))}
          <button onClick={() => goTo("#contact-form")} className="mt-2 bg-white text-ink font-semibold py-4 rounded-2xl">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
