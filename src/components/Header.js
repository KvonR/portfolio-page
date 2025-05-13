import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#about-me">About Me</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
