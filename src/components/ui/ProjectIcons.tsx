import React from 'react'

// Machine Learning / Real Estate Icon
export const MLIcon: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isDarkMode ? '#8892B0' : '#1DD0A7'} />
        <stop offset="100%" stopColor={isDarkMode ? '#5B6B8F' : '#0F9B6E'} />
      </linearGradient>
    </defs>
    
    {/* Grid background */}
    <rect x="30" y="30" width="140" height="140" stroke="url(#mlGradient)" strokeWidth="1" opacity="0.3" />
    
    {/* Data points */}
    <circle cx="60" cy="60" r="4" fill="url(#mlGradient)" />
    <circle cx="100" cy="70" r="4" fill="url(#mlGradient)" />
    <circle cx="140" cy="50" r="4" fill="url(#mlGradient)" />
    <circle cx="70" cy="100" r="4" fill="url(#mlGradient)" />
    <circle cx="130" cy="110" r="4" fill="url(#mlGradient)" />
    <circle cx="80" cy="140" r="4" fill="url(#mlGradient)" />
    <circle cx="140" cy="130" r="4" fill="url(#mlGradient)" />
    
    {/* Connection lines */}
    <line x1="60" y1="60" x2="100" y2="70" stroke="url(#mlGradient)" strokeWidth="1.5" opacity="0.5" />
    <line x1="100" y1="70" x2="140" y2="50" stroke="url(#mlGradient)" strokeWidth="1.5" opacity="0.5" />
    <line x1="70" y1="100" x2="130" y2="110" stroke="url(#mlGradient)" strokeWidth="1.5" opacity="0.5" />
    <line x1="80" y1="140" x2="140" y2="130" stroke="url(#mlGradient)" strokeWidth="1.5" opacity="0.5" />
    
    {/* Center circle */}
    <circle cx="100" cy="100" r="25" stroke="url(#mlGradient)" strokeWidth="2" />
    <circle cx="100" cy="100" r="15" fill="url(#mlGradient)" opacity="0.3" />
  </svg>
)

// Motion Detection / IoT Icon
export const MotionIcon: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="motionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isDarkMode ? '#8892B0' : '#1DD0A7'} />
        <stop offset="100%" stopColor={isDarkMode ? '#5B6B8F' : '#0F9B6E'} />
      </linearGradient>
    </defs>
    
    {/* Device body */}
    <rect x="70" y="50" width="60" height="100" rx="8" stroke="url(#motionGradient)" strokeWidth="2" />
    
    {/* Screen */}
    <rect x="80" y="60" width="40" height="50" rx="4" fill="url(#motionGradient)" opacity="0.2" />
    
    {/* Sensor dot */}
    <circle cx="100" cy="75" r="3" fill="url(#motionGradient)" />
    
    {/* Motion waves */}
    <path
      d="M 120 90 Q 130 85 135 95"
      stroke="url(#motionGradient)"
      strokeWidth="2"
      opacity="0.7"
    />
    <path
      d="M 120 105 Q 130 100 140 110"
      stroke="url(#motionGradient)"
      strokeWidth="2"
      opacity="0.5"
    />
    
    {/* Antenna */}
    <line x1="100" y1="50" x2="100" y2="35" stroke="url(#motionGradient)" strokeWidth="2" />
    <circle cx="100" cy="35" r="3" fill="url(#motionGradient)" />
    
    {/* Text label */}
    <text x="100" y="140" textAnchor="middle" fontSize="10" fill="url(#motionGradient)" opacity="0.6">
      MOTION
    </text>
  </svg>
)

// Inventory Management Icon
export const InventoryIcon: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="inventoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isDarkMode ? '#8892B0' : '#1DD0A7'} />
        <stop offset="100%" stopColor={isDarkMode ? '#5B6B8F' : '#0F9B6E'} />
      </linearGradient>
    </defs>
    
    {/* Stack boxes */}
    <g>
      {/* Bottom box */}
      <rect x="50" y="110" width="50" height="40" stroke="url(#inventoryGradient)" strokeWidth="2" />
      <path
        d="M 50 110 L 60 100 L 110 100 L 100 110 Z"
        fill="url(#inventoryGradient)"
        opacity="0.2"
      />
      
      {/* Middle box */}
      <rect x="60" y="75" width="50" height="40" stroke="url(#inventoryGradient)" strokeWidth="2" />
      <path
        d="M 60 75 L 70 65 L 120 65 L 110 75 Z"
        fill="url(#inventoryGradient)"
        opacity="0.3"
      />
      
      {/* Top box */}
      <rect x="70" y="40" width="50" height="40" stroke="url(#inventoryGradient)" strokeWidth="2" />
      <path
        d="M 70 40 L 80 30 L 130 30 L 120 40 Z"
        fill="url(#inventoryGradient)"
        opacity="0.4"
      />
    </g>
    
    {/* Checkmark */}
    <path
      d="M 140 55 L 145 60 L 155 45"
      stroke="url(#inventoryGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Audio Library Icon
export const AudioIcon: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="audioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isDarkMode ? '#8892B0' : '#1DD0A7'} />
        <stop offset="100%" stopColor={isDarkMode ? '#5B6B8F' : '#0F9B6E'} />
      </linearGradient>
    </defs>
    
    {/* Sound waves */}
    <circle cx="100" cy="100" r="20" stroke="url(#audioGradient)" strokeWidth="2" />
    <circle cx="100" cy="100" r="35" stroke="url(#audioGradient)" strokeWidth="2" opacity="0.5" />
    <circle cx="100" cy="100" r="50" stroke="url(#audioGradient)" strokeWidth="2" opacity="0.3" />
    
    {/* Speaker dot */}
    <circle cx="100" cy="100" r="8" fill="url(#audioGradient)" />
    
    {/* Music note */}
    <g transform="translate(140, 60)">
      <circle cx="0" cy="0" r="5" fill="url(#audioGradient)" />
      <line x1="0" y1="5" x2="0" y2="20" stroke="url(#audioGradient)" strokeWidth="2" />
      <path
        d="M 0 20 Q 10 22 15 15"
        stroke="url(#audioGradient)"
        strokeWidth="2"
        fill="none"
      />
    </g>
    
    {/* Second music note */}
    <g transform="translate(60, 70)">
      <circle cx="0" cy="0" r="4" fill="url(#audioGradient)" opacity="0.7" />
      <line x1="0" y1="4" x2="0" y2="18" stroke="url(#audioGradient)" strokeWidth="1.5" opacity="0.7" />
    </g>
  </svg>
)
