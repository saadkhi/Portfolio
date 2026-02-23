import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItem =
    "text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200";

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // If already on home → just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on another page → navigate then scroll
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl
      bg-white/10 backdrop-blur-xl border border-white/20
      px-8 py-3 rounded-full z-50
      flex items-center justify-between">

      {/* Logo */}
      <button
        onClick={handleHomeClick}
        className="font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity duration-200"
      >
        Saad.
      </button>

      <ul className="hidden md:flex items-center gap-8">
        <li>
          <button onClick={handleHomeClick} className={navItem}>
            Home
          </button>
        </li>

        <li>
          <Link to="/projects" className={navItem}>
            Projects
          </Link>
        </li>

        <li>
          <a href="/#about" className={navItem}>
            About
          </a>
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

      <div className="md:hidden">
        <a
          href="/#contact-form"
          className="text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors duration-200"
        >
          Connect
        </a>
      </div>
    </nav>
  );
};

export default Navbar;