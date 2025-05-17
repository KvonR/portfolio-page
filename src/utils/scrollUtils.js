/**
 * Utility function for smooth scrolling to page sections
 * @param {string} elementId - The ID of the element to scroll to (without the # prefix)
 * @param {number} offset - Optional offset from the top in pixels (default: 0)
 * @param {number} duration - Animation duration in milliseconds (default: 800)
 */
export const scrollToSection = (elementId, offset = 0, duration = 800) => {
  // Get the target element
  const targetElement = document.getElementById(elementId);
  
  if (!targetElement) {
    console.warn(`Element with id ${elementId} not found`);
    return;
  }

  // Calculate the target position with offset
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function for smooth animation
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Animation function
  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  // Start the animation
  requestAnimationFrame(animation);
};

/**
 * Function to handle anchor link clicks with smooth scrolling
 * @param {Event} e - The click event
 */
export const handleSmoothScroll = (e) => {
  // Check if it's an anchor link
  const href = e.currentTarget.getAttribute('href');
  
  if (href && href.startsWith('#')) {
    e.preventDefault();
    
    // Extract the ID without the # symbol
    const id = href.substring(1);
    
    // Call the smooth scroll function with a small offset for the header
    scrollToSection(id, 80);
  }
};
