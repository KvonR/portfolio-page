import React, { useState, useEffect } from 'react';
import './Header.css';
import { handleSmoothScroll } from '../utils/scrollUtils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Effect to detect scroll and update header style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
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
