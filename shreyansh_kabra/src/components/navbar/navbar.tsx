import { useState, useEffect, useContext } from "react";
import "./navbar.scss";
import logoImg from "../../assets/logo.png";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ThemeContext } from "../../context/themeContext";

const navLinks = [
  { label: "Home", href: "#home" },
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
        <a
          href="#home"
          className="logo"
          onClick={handleLinkClick}
          aria-label="Shreyansh Kabra — home"
        >
          <img src={logoImg} alt="" className="logo-image" loading="lazy" />
          <span className="logoText">SK</span>
        </a>

        <div
          id="primary-nav"
          className={`navLinks ${menuOpen ? "active" : ""}`}
        >
          {navLinks.map((link) => (
            <a
              href={link.href}
              onClick={handleLinkClick}
              className={activeSection === link.href ? "active" : ""}
              aria-current={activeSection === link.href ? "true" : undefined}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          {/* Command palette trigger */}
          <button
            className="cmdk-trigger"
            aria-label="Open command palette"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <FiSearch />
            <span className="cmdk-trigger-keys">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>

          {/* Theme toggle button */}
          <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburger menu toggle */}
          <button
            className="menuToggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
