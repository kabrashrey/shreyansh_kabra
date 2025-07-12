import React from "react";
import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Shreyansh Kabra. All rights reserved.
    </footer>
  );
};

export default Footer;
