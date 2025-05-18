import React from 'react';
import '../styles/HighlightedText.css';

// A component that adds special styling effects to text
const HighlightedText = ({ children, className = '', effect = 'neon' }) => {
  return (
    <span className={`highlighted-text ${effect} ${className}`}>
      {children}
    </span>
  );
};

export default HighlightedText;
