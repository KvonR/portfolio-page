import React, { useState, useEffect } from 'react';
import './Header.css';
import { handleSmoothScroll } from '../utils/scrollUtils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  const handleMobileMenuClick = (e) => {
    handleSmoothScroll(e);
    setMobileMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={mobileMenuOpen ? 'mobile-menu-open' : ''}>
          <li><a href="#home" onClick={handleMobileMenuClick}>Home</a></li>
          <li><a href="#experience" onClick={handleMobileMenuClick}>Experience</a></li>
          <li><a href="#projects" onClick={handleMobileMenuClick}>Projects</a></li>
          <li><a href="#skills" onClick={handleMobileMenuClick}>Skills</a></li>
          <li><a href="#about-me" onClick={handleMobileMenuClick}>About Me</a></li>
          <li><a href="#contact" onClick={handleMobileMenuClick}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
