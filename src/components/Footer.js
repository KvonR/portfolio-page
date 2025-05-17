import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { handleSmoothScroll } from '../utils/scrollUtils';

const Footer = () => {
  return (
    <footer>
      <ul className="footer-links">
        <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
        <li><a href="#experience" onClick={handleSmoothScroll}>Experience</a></li>
        <li><a href="#projects" onClick={handleSmoothScroll}>Projects</a></li>
        <li><a href="#skills" onClick={handleSmoothScroll}>Skills</a></li>
        <li><a href="#about-me" onClick={handleSmoothScroll}>About Me</a></li>
        <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
      </ul>
      <div className="social-links">
        <a href="https://github.com/kvonr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FontAwesomeIcon icon={faGithub} className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/rkev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
        </a>
        <a href="mailto:kevinrahimi75@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
        </a>
      </div>
      <p className="copyright">&copy; 2025 Kev R. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
