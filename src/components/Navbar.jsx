import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../utils/scrollTo";

// Everything lives on one page, so these scroll to a section. Resume is its own page.
const sections = [
  { id: "about", n: "01", label: "Profile" },
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
    `label relative py-1 transition-opacity ${on ? "" : "opacity-55 hover:opacity-100"} ${on ? "after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-ink" : ""}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-ink">
      <nav className="wrap flex items-center justify-between h-12">
        <Link to="/#home" onClick={() => setIsOpen(false)} className="font-heading font-black text-xl italic">
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
            className="label hidden md:inline-flex !text-paper bg-ink border border-ink px-4 py-2 transition-colors hover:bg-transparent hover:!text-ink"
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

      <div className={`md:hidden border-t border-ink bg-paper ${isOpen ? "block" : "hidden"}`}>
        <div className="wrap flex flex-col">
          {sections.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="flex items-baseline gap-4 py-4 border-b border-line text-left font-heading text-3xl font-bold"
            >
              <span className="text-[11px] font-semibold text-ink-soft w-6">{l.n}</span>
              {l.label}
            </button>
          ))}
          <NavLink to="/resume" onClick={() => setIsOpen(false)} className="flex items-baseline gap-4 py-4 border-b border-line font-heading text-3xl font-bold">
            <span className="text-[11px] font-semibold text-ink-soft w-6">&rarr;</span>Resume
          </NavLink>
          <button onClick={() => goTo("contact-form")} className="btn my-4 w-full">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
