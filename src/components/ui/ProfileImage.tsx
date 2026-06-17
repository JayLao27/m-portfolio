import React, { useState } from 'react'

interface ProfileImageProps {
  isDarkMode: boolean
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  imageSrc?: string
  imageAlt?: string
  onHoverChange?: (hovered: boolean) => void
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  theme,
  imageAlt = 'Profile',
  onHoverChange
}) => {
  const [isHovering, setIsHovering] = useState(false)

  const getAccentColor = () => {
    switch (theme) {
      case 'cream': return '#0F9B6E'
      case 'dim': return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      default: return '#39F1DA'
    }
  }

  const getAccentRgb = () => {
    switch (theme) {
      case 'cream': return '15, 155, 110'
      case 'dim': return '29, 208, 167'
      case 'graphite': return '14, 165, 233'
      default: return '57, 241, 218'
    }
  }

  const accentColor = getAccentColor()
  const accentRgb = getAccentRgb()

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true)
        if (onHoverChange) onHoverChange(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        if (onHoverChange) onHoverChange(false)
      }}
      className="relative w-[420px] h-[280px] max-md:w-[320px] max-md:h-[213px] cursor-pointer group"
    >
      {/* Image Card Container */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovering 
            ? `0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(${accentRgb}, 0.25)` 
            : `0 15px 35px -10px rgba(0, 0, 0, 0.3)`,
          transform: isHovering ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        {/* Outer Border Outline */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 transition-all duration-500 z-20 pointer-events-none"
          style={{
            borderColor: isHovering 
              ? accentColor 
              : theme === 'cream' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
            boxShadow: isHovering ? `inset 0 0 15px rgba(${accentRgb}, 0.2)` : 'none'
          }}
        />

        {/* Image Display */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent opacity-60 z-10" />
          
          {/* Default Image */}
          <img
            src="/images/Meseum1.png"
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            style={{
              opacity: isHovering ? 0 : 1,
            }}
          />

          {/* Hover Image */}
          <img
            src="/images/Museum(2).jpg"
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            style={{
              opacity: isHovering ? 1 : 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}