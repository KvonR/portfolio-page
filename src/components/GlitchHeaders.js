import React, { useEffect } from 'react';

const GlitchHeaders = () => {
  useEffect(() => {
    // Find all section headers (exclude those that are already handled elsewhere)
    const sectionHeaders = document.querySelectorAll('.section-header.glitch:not(#home .section-header)');
    
    // Create the split text effect for section headers
    const createSplitEffect = (element) => {
      // Get the original text
      const originalText = element.textContent;
      
      // Store original text as data attribute for reverting
      element.setAttribute('data-original-text', originalText);
      
      // Clear the element's content
      element.innerHTML = '';
      
      // For section headers, try to find a natural break point (like a space around the middle)
      // or just color the first word blue and the rest purple
      let words = originalText.split(' ');
      
      if (words.length === 1) {
        // If it's a single word, split it in the middle
        const midPoint = Math.ceil(originalText.length / 2);
        
        // Create first half span (blue)
        const firstHalf = document.createElement('span');
        firstHalf.className = 'blue-half';
        firstHalf.textContent = originalText.substring(0, midPoint);
        
        // Create second half span (purple)
        const secondHalf = document.createElement('span');
        secondHalf.className = 'purple-half';
        secondHalf.textContent = originalText.substring(midPoint);
        
        // Add both halves back to the element
        element.appendChild(firstHalf);
        element.appendChild(secondHalf);
      } 
      else {
        // Try to find a natural break (like a period)
        const fullText = originalText;
        const naturalBreakMatch = fullText.match(/(.*?[.!?])\s*(.*)/);
        
        if (naturalBreakMatch && naturalBreakMatch[1] && naturalBreakMatch[2]) {
          // If there's a natural sentence break, use that
          const firstSentence = document.createElement('span');
          firstSentence.className = 'blue-half';
          firstSentence.textContent = naturalBreakMatch[1];
          
          const secondSentence = document.createElement('span');
          secondSentence.className = 'purple-half';
          secondSentence.textContent = ' ' + naturalBreakMatch[2];
          
          element.appendChild(firstSentence);
          element.appendChild(secondSentence);
        } 
        else {
          // If no natural break, try to split roughly in the middle of the words
          const midPoint = Math.ceil(words.length / 2);
          
          // Create first part span (blue)
          const firstPart = document.createElement('span');
          firstPart.className = 'blue-half';
          firstPart.textContent = words.slice(0, midPoint).join(' ');
          
          // Create second part span (purple)
          const secondPart = document.createElement('span');
          secondPart.className = 'purple-half';
          secondPart.textContent = ' ' + words.slice(midPoint).join(' ');
          
          // Add both parts back to the element
          element.appendChild(firstPart);
          element.appendChild(secondPart);
        }
      }
    };
    
    // Revert to original text
    const revertToOriginal = (element) => {
      const originalText = element.getAttribute('data-original-text');
      element.innerHTML = originalText || element.textContent;
    };
    
    // Event handler functions
    const handleMouseEnter = (e) => {
      // Add glitch hover class
      e.target.classList.add('glitch-hover');
      
      // Apply the split color effect
      createSplitEffect(e.target);
    };
    
    const handleMouseLeave = (e) => {
      // Remove hover class
      e.target.classList.remove('glitch-hover');
      
      // Revert to original text
      revertToOriginal(e.target);
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
