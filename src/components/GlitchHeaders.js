import React, { useEffect } from 'react';

const GlitchHeaders = () => {
  useEffect(() => {
    // Find all section headers
    const sectionHeaders = document.querySelectorAll('.section-header.glitch');
    
    // Event handler functions
    const handleMouseEnter = (e) => {
      // Add purple glow on hover
      e.target.style.color = '#ff00ff';
      e.target.style.textShadow = '0 0 15px rgba(255, 0, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.6)';
      e.target.classList.add('glitch-hover');
    };
    
    const handleMouseLeave = (e) => {
      // Restore default style
      e.target.style.color = 'white';
      e.target.style.textShadow = '';
      e.target.classList.remove('glitch-hover');
    };
    
    // Add event listeners for each header
    sectionHeaders.forEach(header => {
      header.addEventListener('mouseenter', handleMouseEnter);
      header.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Cleanup function
    return () => {
      sectionHeaders.forEach(header => {
        header.removeEventListener('mouseenter', handleMouseEnter);
        header.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default GlitchHeaders;
