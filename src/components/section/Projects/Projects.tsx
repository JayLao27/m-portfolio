/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useEffect, useState } from 'react'

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  category: string
  image: string
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Real Estate Pricing Prediction',
    description: 'Utilizing machine learning for real estate pricing prediction using Gradient Boosting, while comparing performance with other models to achieve optimal accuracy.',
    technologies: ['Python', 'Jupyter Notebook', 'Streamlit', 'Scikit-learn', 'Gradient Boosting'],
    link: 'https://github.com/JayLao27/realestate-pricing-prediction',
    category: 'Machine Learning',
    image: '/images/Real-estate.png'
  },
  {
    id: 2,
    title: 'Text Messaging Motion Detection',
    description: 'IoT-based motion detection system that sends real-time text message alerts. Built with embedded systems programming for efficient sensor monitoring.',
    technologies: ['C++', 'IoT', 'GSM Module', 'PIR'],
    link: 'https://github.com/JayLao27/PirMotion-GSMSim800L',
    category: 'IoT & Embedded',
    image: '/images/arduino.jpg'
  },
  {
    id: 3,
    title: 'Wood Inventory Management System',
    description: 'A comprehensive system designed for resource management companies to efficiently track stock and transactions. Features detailed reporting, sustainable inventory management, and organized record-keeping.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Vite'],
    link: 'https://github.com/JayLao27/wood-inventory-management',
    category: 'Web Application',
    image: '/images/Inventory.png'
  },
  {
    id: 4,
    title: 'Audio Library Platform',
    description: 'A feature-rich music platform where users can browse, purchase, and stream music from artists. Includes playlist management, personal library features, and seamless audio playback.',
    technologies: ['Java', 'JavaFX', 'CSS', 'MySQL'],
    link: 'https://github.com/JayLao27/AudioLibrary',
    category: 'Desktop Application',
    image: '/images/AudioLib.png'
  },
  {
    id: 5,
    title: 'GameForge E-commerce',
    description: 'A Gaming Accessories E-commerce Platform: An online platform for browsing and purchasing gaming accessories. Built primarily with HTML, CSS, and JavaScript, it currently uses a local module for product management.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Tailwindcss'],
    link: 'https://github.com/JayLao27/AudioLibrary',
    category: 'Web Application',
    image: '/images/Gameforge.png'
  }
]

export const Projects: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ isDarkMode, theme }) => {

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
      case 'cream': return '15,155,110'
      case 'dim': return '29,208,167'
      case 'graphite': return '14,165,233'
      default: return '57,241,218'
    }
  }

  const getActivePillClass = () => {
    switch (theme) {
      case 'cream': return 'bg-[#0F9B6E] text-white border-[#0F9B6E] shadow-[0_0_18px_rgba(15,155,110,0.35)]'
      case 'dim': return 'bg-[#1DD0A7] text-[#15202B] border-[#1DD0A7] shadow-[0_0_18px_rgba(29,208,167,0.35)]'
      case 'graphite': return 'bg-[#0ea5e9] text-[#121620] border-[#0ea5e9] shadow-[0_0_18px_rgba(14,165,233,0.35)]'
      default: return 'bg-[#39F1DA] text-[#0D1117] border-[#39F1DA] shadow-[0_0_18px_rgba(57,241,218,0.35)]'
    }
  }

  const getInactivePillClass = () => {
    if (isDarkMode) {
      switch (theme) {
        case 'dim': return 'bg-transparent text-gray-400 border-white/20 hover:border-[#1DD0A7] hover:text-[#1DD0A7]'
        case 'graphite': return 'bg-transparent text-gray-400 border-white/20 hover:border-[#0ea5e9] hover:text-[#0ea5e9]'
        default: return 'bg-transparent text-gray-400 border-white/20 hover:border-[#39F1DA] hover:text-[#39F1DA]'
      }
    }
    switch (theme) {
      case 'cream': return 'bg-transparent text-slate-500 border-slate-300 hover:border-[#0F9B6E] hover:text-[#0F9B6E]'
      default: return 'bg-transparent text-slate-500 border-slate-300 hover:border-slate-500 hover:text-slate-700'
    }
  }

  const getBadgeClass = () => {
    switch (theme) {
      case 'cream': return 'bg-[#0F9B6E]/90 text-white border-transparent'
      case 'dim': return 'bg-[#1DD0A7]/90 text-[#0a1a14] border-transparent'
      case 'graphite': return 'bg-[#0ea5e9]/90 text-[#0a1520] border-transparent'
      default: return 'bg-[#39F1DA]/90 text-[#0D1117] border-transparent'
    }
  }

  const accentRgb = getAccentRgb()
  const accentColor = getAccentColor()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const categories = ['All', 'Machine Learning', 'IoT & Embedded', 'Web Application', 'Desktop Application']

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }
    container.addEventListener('wheel', handleWheel)
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <section
      id="projects"
      data-scroll
      data-scroll-reveal
      className="section-projects min-h-screen pt-32 px-[10%] pb-20 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-float"
          style={{ background: `rgba(${accentRgb},0.05)`, animationDelay: '1s' }}
          data-parallax="slow"
          data-parallax-speed="2"
        />
      </div>

      {/* Header */}
      <div className="mb-16 relative bottom-10 z-[20] scroll-animate" style={{ isolation: 'isolate' }} data-parallax="scale" data-parallax-delay="0.1">
        {/* Connecting Line Receiver */}
        <div
          className="absolute left-[10%] top-[-8rem] w-[2px] h-32 max-md:hidden"
          style={{ backgroundImage: `linear-gradient(to top, rgba(${accentRgb},0.5), transparent)` }}
        />

        {/* Editorial label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px]" style={{ background: accentColor }} />
          <span
            className="font-['JetBrains_Mono'] text-xs tracking-[0.25em] uppercase"
            style={{ color: accentColor }}
          >
            Portfolio
          </span>
        </div>

        <h2 className={`font-['Syne'] font-bold leading-none tracking-tight text-[5.5rem] max-md:text-[3.2rem] ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'}`}>
          Featured
          <span className="block text-gradient">Projects.</span>
        </h2>

        <p className={`mt-5 text-lg font-['DM_Sans'] max-w-xl leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-light-body-text'}`}>
          A curated selection of work spanning machine learning, IoT, web, and desktop � each built to solve real problems.
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2.5 mt-8" data-parallax="fade" data-parallax-delay="0.2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full font-['JetBrains_Mono'] text-xs tracking-wide border transition-all duration-300 hover:scale-105 ${
                activeFilter === category ? getActivePillClass() : getInactivePillClass()
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="project-scroll overflow-x-auto pb-6 pt-4 relative z-10 scroll-animate scroll-animate-delay-1"
        data-parallax="slide-up"
        data-parallax-delay="0.3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}
        data-lenis-prevent
      >
        <div className="flex gap-7 min-w-max px-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
              accentColor={accentColor}
              accentRgb={accentRgb}
              badgeClass={getBadgeClass()}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-10 relative z-10">
        <div className="inline-flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor, opacity: 0.6, animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor, opacity: 0.3, animationDelay: '0.4s' }} />
          </div>
          <p className={`text-sm font-['JetBrains_Mono'] ${isDarkMode ? 'text-nav-text' : 'text-light-body-text/70'}`}>
            Scroll horizontally or use mouse wheel ?
          </p>
        </div>
      </div>

      {/* Connecting Line to Next Section */}
      <div
        className="absolute left-[10%] bottom-[-5rem] w-[2px] h-32 max-md:hidden z-0"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(${accentRgb},0.5), transparent)` }}
      />
    </section>
  )
}

// --- Project Card sub-component to avoid hook rules issues ------------------

interface ProjectCardProps {
  project: Project
  index: number
  isDarkMode: boolean
  accentColor: string
  accentRgb: string
  badgeClass: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isDarkMode, accentColor, accentRgb, badgeClass }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group flex-shrink-0 w-[460px] rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer relative ${
        isDarkMode
          ? 'bg-white/[0.04] border border-white/10'
          : 'bg-white border border-slate-200/80 shadow-md'
      }`}
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px rgba(${accentRgb},0.18), 0 0 0 1.5px rgba(${accentRgb},0.45)` : 'none',
        borderColor: hovered
          ? `rgba(${accentRgb},0.5)`
          : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(203,213,225,0.8)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <img
          src={project.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={project.title}
        />

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(${accentRgb},0.75) 0%, rgba(0,0,0,0.4) 45%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* CTA buttons */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2.5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {project.link && (
            <>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-['JetBrains_Mono'] tracking-wider font-bold bg-white text-[#0D1117] hover:opacity-90 transition-opacity duration-200 shadow-lg"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Project
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-['JetBrains_Mono'] tracking-wider font-bold bg-black/50 text-white border border-white/30 hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </>
          )}
        </div>

        {/* Category badge � top-left */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-['JetBrains_Mono'] font-bold tracking-widest uppercase border backdrop-blur-md ${badgeClass}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="text-[1.35rem] font-['Syne'] font-bold mb-2.5 leading-snug transition-colors duration-300"
          style={{ color: hovered ? accentColor : isDarkMode ? '#ffffff' : '' }}
        >
          {project.title}
        </h3>

        <p className={`text-sm font-['DM_Sans'] leading-relaxed line-clamp-3 mb-5 ${isDarkMode ? 'text-gray-400' : 'text-light-body-text/80'}`}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={`text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border font-['JetBrains_Mono'] transition-all duration-300 ${
                isDarkMode
                  ? 'bg-white/5 text-gray-400 border-white/10 group-hover:border-white/20'
                  : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:border-slate-300'
              }`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={`text-[9px] px-2.5 py-1 rounded-md border font-['JetBrains_Mono'] ${
              isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
