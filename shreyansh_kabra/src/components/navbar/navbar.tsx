import { useState, useEffect, useContext } from "react";
import "./navbar.scss";
import logoImg from "../../assets/logo.png";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../context/themeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experiences" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#technical" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLinkClick = () => setMenuOpen(false);

  // Change nav background on scroll & track active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find the active section
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean) as Element[];

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          current = `#${section.id}`;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navContainer ${scrolled ? "scrolled" : ""}`}>
      <nav>
        <a href="#hero" className="logo" onClick={handleLinkClick}>
          <img src={logoImg} alt="Logo" className="logo-image" loading="lazy" />
          <span className="logoText">SK</span>
        </a>

        <div className={`navLinks ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <a
              href={link.href}
              onClick={handleLinkClick}
              className={activeSection === link.href ? "active" : ""}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          {/* Theme toggle button */}
          <button
            aria-label="Toggle Theme"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburger menu toggle */}
          <div className="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
