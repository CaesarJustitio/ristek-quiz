import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ristek App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
