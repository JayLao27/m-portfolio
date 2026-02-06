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
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      // Immediately trigger zoom out when complete
      setZoomOut(true);
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
      <div className={`logo-container ${zoomOut ? 'zoom-out' : ''}`}>
        {/* Hexagon */}
        <svg className="hexagon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path className="hex-path" d="M 100,10 L 173,50 L 173,150 L 100,190 L 27,150 L 27,50 Z"/>
        </svg>

        {/* J Logo */}
        <svg className="j-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* J */}
          <path className="j-path" d="M 80,60 L 120,60 L 120,130 Q 120,150 100,150 Q 80,150 80,130"/>
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
