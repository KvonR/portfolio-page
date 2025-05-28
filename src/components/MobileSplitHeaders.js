import { useEffect, useState } from 'react';

const MobileSplitHeaders = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile detection
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    // Find all section headers except home page
    const sectionHeaders = document.querySelectorAll('.section-header.glitch:not(#home .section-header):not(.mobile-split-applied)');
    
    const applySplitEffect = (element) => {
      const originalText = element.textContent.trim();
      const words = originalText.split(' ');
      
      if (words.length >= 2) {
        // Store original text
        element.setAttribute('data-original-mobile-text', originalText);
        
        // Remove the glitch animation by removing ::before and ::after pseudo-elements
        // By setting these classes and modifying the content directly
        element.classList.add('no-glitch-mobile');
        
        // Add class to disable all interactive effects for ALL headers on non-home pages
        element.classList.add('mobile-static-my-header');
        
        // Create first word span (blue) - static styling for all headers
        const firstWord = document.createElement('span');
        firstWord.className = 'mobile-blue-word-static';
        firstWord.textContent = words[0];
        
        // Create spacer
        const spacer = document.createElement('span');
        spacer.className = 'mobile-word-spacer';
        spacer.innerHTML = '&nbsp;';
        
        // Create remaining words span (purple) - static styling for all headers
        const remainingWords = document.createElement('span');
        remainingWords.className = 'mobile-purple-words-static';
        remainingWords.textContent = words.slice(1).join(' ');
        
        // Clear element and add new structure
        element.innerHTML = '';
        element.appendChild(firstWord);
        element.appendChild(spacer);
        element.appendChild(remainingWords);
        
        // Mark as processed
        element.classList.add('mobile-split-applied');
      }
    };

    // Apply split effect to all section headers
    sectionHeaders.forEach(header => {
      applySplitEffect(header);
      const headerText = header.textContent.trim();
      console.log(`Applied static split effect to: ${headerText}`);
    });

    // Log the total number of headers processed
    console.log(`Mobile split-color effect applied to ${sectionHeaders.length} section headers`);

    // Cleanup function
    return () => {
      if (isMobile) {
        const processedHeaders = document.querySelectorAll('.section-header.glitch.mobile-split-applied');
        processedHeaders.forEach(header => {
          const originalText = header.getAttribute('data-original-mobile-text');
          if (originalText) {
            header.innerHTML = originalText;
            header.removeAttribute('data-original-mobile-text');
            header.classList.remove('mobile-split-applied');
            header.classList.remove('no-glitch-mobile');
            header.classList.remove('mobile-static-my-header');
          }
        });
      }
    };
  }, [isMobile]);

  return null; // This component doesn't render anything
};

export default MobileSplitHeaders;