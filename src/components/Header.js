import React from 'react';
import './Header.css';
import { handleSmoothScroll } from '../utils/scrollUtils';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
          <li><a href="#experience" onClick={handleSmoothScroll}>Experience</a></li>
          <li><a href="#projects" onClick={handleSmoothScroll}>Projects</a></li>
          <li><a href="#skills" onClick={handleSmoothScroll}>Skills</a></li>
          <li><a href="#about-me" onClick={handleSmoothScroll}>About Me</a></li>
          <li><a href="#contact" onClick={handleSmoothScroll}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
