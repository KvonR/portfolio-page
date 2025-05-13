import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2025 Kev R. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="social-links">
        <a href="https://github.com/kvonr" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/kvonr" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {/* Add other social media links here */}
      </div>
    </footer>
  );
};

export default Footer;
