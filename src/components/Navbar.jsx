import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollTo";

// Everything lives on one page, so these scroll to a section. Resume is its own page.
const sections = [
  { id: "about", n: "01", label: "About" },
  { id: "projects", n: "03", label: "Work" },
  { id: "experience", n: "04", label: "Experience" },
  { id: "skills", n: "05", label: "Skills" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const onResume = location.pathname === "/resume";

  // Mark the section that is under the upper part of the screen.
  useEffect(() => {
    if (location.pathname !== "/") return undefined;
    const ids = ["about", "roles", "projects", "experience", "skills", "contact-form"];
    const spy = () => {
      const mid = window.innerHeight * 0.4;
      let cur = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) cur = id;
      });
      // The disciplines cards sit between About and Work, so they count as About
      if (cur === "roles") cur = "about";
      setActive(cur);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [location.pathname]);

  const goTo = (id) => {
    scrollToSection(id, navigate, location.pathname);
    setIsOpen(false);
  };

  const link = (on) =>
    `relative py-1 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${on ? "text-ink" : "text-ink-soft hover:text-ink"} ${on ? "after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-ink" : ""}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-ink/70">
      <nav className="wrap flex items-center justify-between h-14">
        <Link to="/#home" onClick={() => setIsOpen(false)} className="text-[15px] font-bold tracking-tight">
          Saad Ali
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {sections.map((l) => (
            <li key={l.id}>
              <button onClick={() => goTo(l.id)} className={link(!onResume && active === l.id)}>{l.label}</button>
            </li>
          ))}
          <li>
            <NavLink to="/resume" className={({ isActive }) => link(isActive)}>Resume</NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo("contact-form")}
            className="hidden md:inline-flex bg-ink text-white border border-ink text-[12px] font-semibold uppercase tracking-[0.12em] px-5 py-2.5 transition-colors hover:bg-white hover:text-ink"
          >
            Contact
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="relative w-5 h-3.5 block">
              <span className={`absolute left-0 w-5 h-0.5 bg-ink transition-all duration-300 ${isOpen ? "top-1.5 rotate-45" : "top-0"}`}></span>
              <span className={`absolute left-0 top-1.5 w-5 h-0.5 bg-ink transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`absolute left-0 w-5 h-0.5 bg-ink transition-all duration-300 ${isOpen ? "top-1.5 -rotate-45" : "top-3"}`}></span>
            </span>
          </button>
        </div>
      </nav>

      <div className={`md:hidden border-t border-ink/40 bg-white/80 backdrop-blur-xl ${isOpen ? "block" : "hidden"}`}>
        <div className="wrap flex flex-col">
          {sections.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="flex items-baseline gap-4 py-4 border-b border-line text-left text-2xl font-bold tracking-tight"
            >
              <span className="text-[11px] font-semibold text-ink-soft w-6">{l.n}</span>
              {l.label}
            </button>
          ))}
          <NavLink to="/resume" onClick={() => setIsOpen(false)} className="flex items-baseline gap-4 py-4 border-b border-line text-2xl font-bold tracking-tight">
            <span className="text-[11px] font-semibold text-ink-soft w-6">&rarr;</span>Resume
          </NavLink>
          <button onClick={() => goTo("contact-form")} className="my-4 bg-ink text-white py-4 text-[13px] font-semibold uppercase tracking-[0.12em]">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
