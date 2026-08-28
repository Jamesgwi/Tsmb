import React from 'react';

interface LogoProps {
  size?: number;
  color?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 40, 
  color = '#ffffff',
  className = ''
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="54" 
        stroke={color} 
        strokeWidth="3.5"
        fill="none"
      />

      {/* Top curved swoosh - starts from left, curves up and right */}
      <path 
        d="M 28 54 
           C 28 54, 35 36, 55 33 
           C 70 30, 82 35, 86 40 
           C 86 40, 72 36, 56 40 
           C 42 43, 36 54, 36 54 
           L 28 54 Z"
        fill={color}
      />

      {/* Bottom curved swoosh - starts from left, curves down and right */}
      <path 
        d="M 36 60 
           C 36 60, 42 50, 56 46 
           C 72 42, 86 46, 86 46 
           C 82 52, 70 58, 55 55 
           C 35 52, 28 60, 28 60 
           L 36 60 Z"
        fill={color}
      />
    </svg>
  );
};

export default Logo;
