import React from 'react';
import './ScrollIndicator.css';
import { scrollToSection } from '../utils/scrollUtils';

const ScrollIndicator = ({ targetSectionId }) => {
  const handleClick = (e) => {
    e.preventDefault();
    scrollToSection(targetSectionId, 80);
  };

  return (
    <div className="scroll-indicator-container">
      <div className="scroll-indicator" onClick={handleClick}>
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
