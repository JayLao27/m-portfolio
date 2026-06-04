import React, { useState, useRef } from 'react'

interface ProfileImageProps {
  isDarkMode: boolean
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  imageSrc?: string
  imageAlt?: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  theme,
  imageAlt = 'Profile'
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getContainerShadowClass = () => {
    switch (theme) {
      case 'cream': return 'shadow-2xl shadow-[#0F9B6E]/15'
      case 'dim': return 'shadow-2xl shadow-[#1DD0A7]/20'
      case 'graphite': return 'shadow-2xl shadow-[#0ea5e9]/20'
      default: return 'shadow-2xl shadow-highlight/20'
    }
  }

  const getBorderLayerClass = () => {
    switch (theme) {
      case 'cream': return 'border-[#0F9B6E]/30 bg-white/80'
      case 'dim': return 'border-[#1DD0A7]/30 bg-[#15202B]/80'
      case 'graphite': return 'border-[#0ea5e9]/30 bg-[#1E2530]/80'
      default: return 'border-highlight/30 bg-dark-bg/80'
    }
  }

  const getGridBgClass = () => {
    switch (theme) {
      case 'cream': return 'bg-[linear-gradient(rgba(15,155,110,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,155,110,0.1)_1px,transparent_1px)]'
      case 'dim': return 'bg-[linear-gradient(rgba(29,208,167,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(29,208,167,0.1)_1px,transparent_1px)]'
      case 'graphite': return 'bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)]'
      default: return 'bg-[linear-gradient(rgba(94,238,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(94,238,255,0.1)_1px,transparent_1px)]'
    }
  }

  const getHoloOverlayClass = () => {
    switch (theme) {
      case 'cream': return 'bg-gradient-to-tr from-[#0F9B6E] via-blue-400 to-[#0F9B6E]'
      case 'dim': return 'bg-gradient-to-tr from-[#1DD0A7] via-emerald-400 to-[#1DD0A7]'
      case 'graphite': return 'bg-gradient-to-tr from-[#0ea5e9] via-purple-500 to-[#0ea5e9]'
      default: return 'bg-gradient-to-tr from-highlight via-purple-500 to-highlight'
    }
  }

  const getCornerBorderClass = () => {
    switch (theme) {
      case 'cream': return 'border-[#0F9B6E]'
      case 'dim': return 'border-[#1DD0A7]'
      case 'graphite': return 'border-[#0ea5e9]'
      default: return 'border-highlight'
    }
  }

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
        className={`relative w-full h-full rounded-2xl transition-all duration-300 ${getContainerShadowClass()}`}
        style={{
          ...transformStyle,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Border / Frame Layer */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${getBorderLayerClass()} backdrop-blur-sm`}
          style={{ transform: 'translateZ(-20px)' }}
        ></div>

        {/* Decorative Grid / Tech Background */}
        <div
          className="absolute inset-2 rounded-xl opacity-30 overflow-hidden"
          style={{ transform: 'translateZ(-10px)' }}
        >
          <div className={`w-full h-full ${getGridBgClass()}`}
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
          <div className={`absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${getHoloOverlayClass()}`}></div>
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
        <div className={`absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 ${getCornerBorderClass()} transition-all duration-300 group-hover:top-[-10px] group-hover:left-[-10px]`} style={{ transform: 'translateZ(30px)' }}></div>
        <div className={`absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 ${getCornerBorderClass()} transition-all duration-300 group-hover:bottom-[-10px] group-hover:right-[-10px]`} style={{ transform: 'translateZ(30px)' }}></div>
      </div>
    </div>
  )
}