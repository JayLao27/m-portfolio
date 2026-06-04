import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 4000 
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [glowOut, setGlowOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Trigger glow outro when complete
      setGlowOut(true);
      if (onLoadingComplete) {
        setTimeout(() => onLoadingComplete(), 900);
      }
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className={`logo-container ${glowOut ? 'glow-out' : ''}`}>
        {/* Hexagon */}
        <svg className="hexagon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path className="hex-path" d="M 100,10 L 173,50 L 173,150 L 100,190 L 27,150 L 27,50 Z"/>
        </svg>

        {/* JL Logo */}
        <svg className="j-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* J */}
          <path className="j-path" d="M 65,70 C 90,70 90,115 90,120 C 90,140 75,148 60,135"/>
          {/* L */}
          <path className="l-path" d="M 115,70 L 115,140 L 145,140"/>
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
