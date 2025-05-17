import { useEffect } from 'react';

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
      
      // Make sure the data-text attribute stays in sync with the new split structure
      // This ensures proper glitch effect on the entire text
      element.setAttribute('data-text', originalText);
      
      if (words.length === 1) {
        // If it's a single word, split it in the middle
        const midPoint = Math.ceil(originalText.length / 2);
        
        // Create first half span (blue)
        const firstHalf = document.createElement('span');
        firstHalf.className = 'blue-half';
        firstHalf.textContent = originalText.substring(0, midPoint);
        firstHalf.setAttribute('data-text', originalText.substring(0, midPoint));
        
        // Create a thin spacer for single words split in the middle
        const spacer = document.createElement('span');
        spacer.className = 'word-spacer'; // Use the same class for consistency
        spacer.style.display = 'inline-block';
        spacer.style.width = '0.02em'; // Thinner spacer for single words
        spacer.innerHTML = '&nbsp;';
        
        // Create second half span (purple)
        const secondHalf = document.createElement('span');
        secondHalf.className = 'purple-half';
        secondHalf.textContent = originalText.substring(midPoint);
        secondHalf.setAttribute('data-text', originalText.substring(midPoint));
        
        // Add both halves back to the element with a small spacer
        element.appendChild(firstHalf);
        element.appendChild(spacer);
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
          firstSentence.setAttribute('data-text', naturalBreakMatch[1]);
          
          // Create a non-breaking space element to maintain proper spacing
          const spacer = document.createElement('span');
          spacer.className = 'word-spacer';
          spacer.style.display = 'inline-block';
          spacer.style.width = '0.3em';
          spacer.innerHTML = '&nbsp;';
          
          const secondSentence = document.createElement('span');
          secondSentence.className = 'purple-half';
          secondSentence.textContent = naturalBreakMatch[2];
          secondSentence.setAttribute('data-text', naturalBreakMatch[2]);
          
          // Add all parts with proper spacing
          element.appendChild(firstSentence);
          element.appendChild(spacer);
          element.appendChild(secondSentence);
        } 
        else {
          // If no natural break, try to split roughly in the middle of the words
          const midPoint = Math.ceil(words.length / 2);
          
          // Create first part span (blue)
          const firstPart = document.createElement('span');
          firstPart.className = 'blue-half';
          firstPart.textContent = words.slice(0, midPoint).join(' ');
          firstPart.setAttribute('data-text', words.slice(0, midPoint).join(' '));
          
          // Create a non-breaking space element with fixed width to maintain proper word spacing
          const spacer = document.createElement('span');
          spacer.className = 'word-spacer';
          spacer.innerHTML = '\u00A0'; // Non-breaking space
          spacer.setAttribute('aria-hidden', 'true');
          
          // Create second part span (purple)
          const secondPart = document.createElement('span');
          secondPart.className = 'purple-half';
          secondPart.textContent = words.slice(midPoint).join(' ');
          secondPart.setAttribute('data-text', words.slice(midPoint).join(' '));
          
          // Add all parts back to the element with proper spacing
          element.appendChild(firstPart);
          element.appendChild(spacer);
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
