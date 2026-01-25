import React, { useState, useRef } from 'react'

interface ProfileImageProps {
  isDarkMode: boolean
  imageSrc?: string
  imageAlt?: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  isDarkMode,
  imageSrc = 'src/assets/images/Meseum1.png',
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
      className={`relative w-[290px] h-[370px] rounded-lg flex items-center justify-center transition-all duration-300`}
      style={{
        background: isDarkMode
          ? isHovering
            ? 'linear-gradient(to bottom right, rgba(136,146,176,0.7), rgba(136,146,176,0.3))'
            : 'linear-gradient(to bottom right, rgba(136,146,176,0.2), transparent)'
          : isHovering
            ? 'linear-gradient(to bottom right, rgba(10,43,47,0.4), rgba(10,43,47,0.2))'
            : 'linear-gradient(to bottom right, rgba(10,43,47,0.1), transparent)',
        border: isHovering
          ? isDarkMode
            ? '2px solid rgb(136,146,176)'
            : '2px solid rgb(225,232,255)'
          : isDarkMode
            ? '1px solid rgba(136,146,176,0.2)'
            : '1px solid rgba(10,43,47,0.1)',
        boxShadow: isHovering
          ? isDarkMode
            ? '0 0 0 1px rgb(136,146,176), inset 0 0 40px rgba(136,146,176,0.5), inset -40px -40px 60px rgba(136,146,176,0.3), 0 0 30px rgba(136,146,176,0.4)'
            : '0 0 0 1px rgb(225,232,255), inset 0 0 40px rgba(225,232,255,0.5), inset -40px -40px 60px rgba(225,232,255,0.3), 0 0 30px rgba(225,232,255,0.4)'
          : 'none'
      }}
    >
      <img
        className="h-[330px] rounded-lg transition-transform duration-300"
        style={{
          transform: isHovering ? 'scale(1.05)' : 'scale(1)'
        }}
        src={isHovering ? 'src/assets/images/Museum(2).jpg' : 'src/assets/images/Meseum1.png'}
        alt={imageAlt}
      />
    </div>
  )
}

