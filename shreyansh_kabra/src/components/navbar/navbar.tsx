import { useState, useEffect, useContext } from "react";
import "./navbar.scss";
import logoImg from "../../assets/logo.png";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../context/themeContext";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Close menu on link click (mobile)
  const handleLinkClick = () => setMenuOpen(false);

  // Change nav background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navContainer ${scrolled ? "scrolled" : ""}`}>
      <nav>
        <a href="" className="logo">
          <img src={logoImg} alt="Logo" className="logo-image" loading="lazy" />
          <span className="logoText">SK</span>
        </a>

        <div className={`navLinks ${menuOpen ? "active" : ""}`}>
          <a href="#about" onClick={handleLinkClick}>
            About
          </a>
          <a href="#experiences" onClick={handleLinkClick}>
            Experience
          </a>
          <a href="#projects" onClick={handleLinkClick}>
            Projects
          </a>
          <a href="#technical" onClick={handleLinkClick}>
            Technical Skills
          </a>
          <a href="#education" onClick={handleLinkClick}>
            Education
          </a>
          <a href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
        </div>

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
          <FaBars />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
