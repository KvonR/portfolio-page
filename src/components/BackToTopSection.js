import React from 'react';
import './BackToTopSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { handleSmoothScroll } from '../utils/scrollUtils';
import { Parallax } from 'react-scroll-parallax';

const BackToTopSection = () => {
  return (
    <section className="back-to-top-section">
      <div className="cyberpunk-divider"></div>
      <Parallax speed={-5} className="back-to-top-section-content">
        <a href="#home" onClick={handleSmoothScroll} className="section-back-to-top">
          <span className="back-to-top-text">Back to Top</span>
          <FontAwesomeIcon icon={faArrowUp} className="back-to-top-icon" />
        </a>
      </Parallax>
      <div className="cyberpunk-divider"></div>
    </section>
  );
};

export default BackToTopSection;
