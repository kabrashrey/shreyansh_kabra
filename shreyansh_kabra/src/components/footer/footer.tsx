import React from "react";
import "./footer.scss";
import { FiArrowUp } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Shreyansh Kabra. All rights reserved.
        </p>
        <a href="#home" className="footer-top" aria-label="Back to top">
          Back to top <FiArrowUp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
