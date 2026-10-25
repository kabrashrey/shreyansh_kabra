import React from "react";
import "./footer.scss";
import { FiArrowUp } from "react-icons/fi";
import { profile } from "../../data/profile";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Year may differ between build-time prerender and the visitor's clock */}
        <p className="footer-copy" suppressHydrationWarning>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a href="#home" className="footer-top" aria-label="Back to top">
          Back to top <FiArrowUp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
