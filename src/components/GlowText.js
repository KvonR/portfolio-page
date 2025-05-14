import React from 'react';

/**
 * GlowText - A component for text with a glowing effect that changes color on hover
 * 
 * @param {Object} props
 * @param {String} props.text - The text to display
 * @param {String} props.defaultColor - The default glow color (hex format)
 * @param {String} props.hoverColor - The hover glow color (hex format)
 * @param {String} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {React.ReactNode} props.children - Alternative to text prop
 */
const GlowText = ({ 
  text, 
  defaultColor = '#00ccff',
  hoverColor = '#ff00ff',
  className = '',
  style = {},
  children,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const glowStyle = {
    fontFamily: "'Orbitron', sans-serif",
    color: '#FFFFFF',
    textShadow: `0 0 10px ${isHovered ? hoverColor : defaultColor}, 
                 0 0 20px ${isHovered ? hoverColor : defaultColor}, 
                 0 0 30px ${isHovered ? hoverColor : defaultColor}`,
    transition: 'text-shadow 0.3s ease',
    cursor: 'pointer',
    ...style
  };
  
  return (
    <span 
      className={`glow-text ${className}`}
      style={glowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {text || children}
    </span>
  );
};

export default GlowText;
