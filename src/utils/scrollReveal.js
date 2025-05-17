import { useEffect, useRef } from 'react';

/**
 * Custom hook to apply reveal animations on scroll
 * @param {Object} options - Configuration options
 * @param {string} options.threshold - Visibility threshold (0 to 1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {string} options.className - Class to add when element is visible
 * @returns {Object} - The ref to attach to the element
 */
export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    className = 'reveal-visible'
  } = options;
  
  const ref = useRef(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            
            // Once animation is applied, we can stop observing
            if (!options.repeat) {
              observer.unobserve(entry.target);
            }
          } else if (options.repeat) {
            // If repeat is enabled, remove class when out of view
            entry.target.classList.remove(className);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [className, options.repeat, rootMargin, threshold]);
  
  return ref;
};

/**
 * Custom hook to set up scroll reveal animations for elements with specific classes
 * Use this hook in your App component
 */
export const useScrollRevealEffects = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            
            // For elements that should only animate once
            if (!entry.target.classList.contains('reveal-repeat')) {
              observer.unobserve(entry.target);
            }
          } else if (entry.target.classList.contains('reveal-repeat')) {
            // For elements that should repeat their animation
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
};

/**
 * Setup function for scroll reveal animations
 * This function sets up IntersectionObserver to handle reveal animations
 * for elements with the 'reveal' class
 */
export const setupScrollRevealAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          
          // For elements that should only animate once
          if (!entry.target.classList.contains('reveal-repeat')) {
            observer.unobserve(entry.target);
          }
        } else if (entry.target.classList.contains('reveal-repeat')) {
          // For elements that should repeat their animation
          entry.target.classList.remove('reveal-visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px'
    }
  );
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
  
  // Return a cleanup function that can be called if needed
  return () => {
    revealElements.forEach(element => {
      observer.unobserve(element);
    });
  };
};
