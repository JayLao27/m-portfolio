import React, { useState, useRef } from 'react'

interface ProfileImageProps {
  isDarkMode: boolean
  imageSrc?: string
  imageAlt?: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  isDarkMode,
  imageAlt = 'Profile'
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation based on cursor position
    const rotateX = ((y - centerY) / centerY) * -15 // Limits rotation to ±15deg
    const rotateY = ((x - centerX) / centerX) * 15

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
  }

  const transformStyle = {
    transform: isHovering
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  }

  const glareStyle = {
    background: `radial-gradient(circle at ${50 - rotation.y * 3}% ${50 - rotation.x * 3}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
    opacity: isHovering ? 0.6 : 0,
    transition: 'opacity 0.3s ease-out'
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className=" relative w-[420px] h-[280px] max-md:w-[320px] max-md:h-[213px] flex items-center justify-center cursor-pointer group perspecitve-container"
      style={{ perspective: '1000px' }}
    >
      {/* Main 3D Container */}
      <div
        className={`relative w-full h-full rounded-2xl transition-all duration-300 ${isDarkMode ? 'shadow-2xl shadow-highlight/20' : 'shadow-2xl shadow-[#1DD0A7]/20'
          }`}
        style={{
          ...transformStyle,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Border / Frame Layer */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${isDarkMode
            ? 'border-highlight/30 bg-dark-bg/80'
            : 'border-[#1DD0A7]/30 bg-white/80'
            } backdrop-blur-sm`}
          style={{ transform: 'translateZ(-20px)' }}
        ></div>

        {/* Decorative Grid / Tech Background */}
        <div
          className="absolute inset-2 rounded-xl opacity-30 overflow-hidden"
          style={{ transform: 'translateZ(-10px)' }}
        >
          <div className={`w-full h-full ${isDarkMode
            ? 'bg-[linear-gradient(rgba(94,238,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(94,238,255,0.1)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(29,208,167,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(29,208,167,0.1)_1px,transparent_1px)]'
            }`}
            style={{ backgroundSize: '20px 20px' }}
          ></div>
        </div>

        {/* Image Layer */}
        <div
          className="absolute inset-4 rounded-xl overflow-hidden shadow-lg"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img
            src={isHovering ? '/images/Museum(2).jpg' : '/images/Meseum1.png'}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          {/* Holographic Overlay */}
          <div className={`absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${isDarkMode ? 'bg-gradient-to-tr from-highlight via-purple-500 to-highlight' : 'bg-gradient-to-tr from-[#1DD0A7] via-blue-400 to-[#1DD0A7]'
            }`}></div>
        </div>

        {/* Glare/Shine Effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-overlay"
          style={{
            ...glareStyle,
            transform: 'translateZ(50px)'
          }}
        ></div>

        {/* Floating Corner Accents */}
        <div className={`absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 ${isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'} transition-all duration-300 group-hover:top-[-10px] group-hover:left-[-10px]`} style={{ transform: 'translateZ(30px)' }}></div>
        <div className={`absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 ${isDarkMode ? 'border-highlight' : 'border-[#1DD0A7]'} transition-all duration-300 group-hover:bottom-[-10px] group-hover:right-[-10px]`} style={{ transform: 'translateZ(30px)' }}></div>
      </div>
    </div>
  )
}