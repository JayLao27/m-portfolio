import React, { useState, useRef } from 'react'

interface ProfileImageProps {
  isDarkMode: boolean
  imageAlt?: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  isDarkMode,
  imageAlt = 'Profile'
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div
      ref={imageContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[320px] h-[400px] rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer overflow-hidden group`}
      style={{
        background: isDarkMode
          ? isHovering
            ? 'linear-gradient(135deg, rgba(94,238,255,0.2), rgba(136,146,176,0.1))'
            : 'linear-gradient(135deg, rgba(136,146,176,0.1), transparent)'
          : isHovering
            ? 'linear-gradient(135deg, rgba(29,208,167,0.2), rgba(10,43,47,0.1))'
            : 'linear-gradient(135deg, rgba(10,43,47,0.05), transparent)',
        border: isHovering
          ? isDarkMode
            ? '2px solid rgba(94,238,255,0.5)'
            : '2px solid rgba(29,208,167,0.5)'
          : isDarkMode
            ? '1px solid rgba(136,146,176,0.2)'
            : '1px solid rgba(10,43,47,0.1)',
        boxShadow: isHovering
          ? isDarkMode
            ? '0 0 0 4px rgba(94,238,255,0.1), 0 20px 60px rgba(94,238,255,0.3), inset 0 0 80px rgba(94,238,255,0.1)'
            : '0 0 0 4px rgba(29,208,167,0.1), 0 20px 60px rgba(29,208,167,0.3), inset 0 0 80px rgba(29,208,167,0.1)'
          : isDarkMode
            ? '0 10px 40px rgba(0,0,0,0.3)'
            : '0 10px 40px rgba(0,0,0,0.2)'
      }}
    >
      {/* Animated border effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: isDarkMode
            ? 'linear-gradient(45deg, transparent 30%, rgba(94,238,255,0.3) 50%, transparent 70%)'
            : 'linear-gradient(45deg, transparent 30%, rgba(29,208,167,0.3) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: isHovering ? 'shimmer 3s ease-in-out infinite' : 'none'
        }}
      ></div>

      {/* Corner accents */}
      <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 transition-all duration-500 ${
        isHovering 
          ? isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'
          : 'border-transparent'
      }`}></div>
      <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 transition-all duration-500 ${
        isHovering 
          ? isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'
          : 'border-transparent'
      }`}></div>
      <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 transition-all duration-500 ${
        isHovering 
          ? isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'
          : 'border-transparent'
      }`}></div>
      <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 transition-all duration-500 ${
        isHovering 
          ? isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'
          : 'border-transparent'
      }`}></div>

      {/* Image */}
      <img
        className="h-[360px] rounded-2xl transition-all duration-700 object-cover relative z-10"
        style={{
          transform: isHovering ? 'scale(1.08) rotate(2deg)' : 'scale(1)',
          filter: isHovering ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
        }}
        src={isHovering ? 'src/assets/images/Museum(2).jpg' : 'src/assets/images/Meseum1.png'}
        alt={imageAlt}
      />

      {/* Overlay gradient on hover */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isDarkMode
            ? 'linear-gradient(to top, rgba(94,238,255,0.15), transparent)'
            : 'linear-gradient(to top, rgba(29,208,167,0.15), transparent)'
        }}
      ></div>

      {/* Scan line effect */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${isDarkMode ? 'rgba(94,238,255,0.03)' : 'rgba(29,208,167,0.03)'} 2px,
            ${isDarkMode ? 'rgba(94,238,255,0.03)' : 'rgba(29,208,167,0.03)'} 4px
          )`
        }}
      ></div>
    </div>
  )
}