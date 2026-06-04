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
  const getCardBorderHoverClass = () => {
    switch (theme) {
      case 'cream': return 'hover:border-[#0F9B6E]/40'
      case 'dim': return 'hover:border-[#1DD0A7]/30'
      case 'graphite': return 'hover:border-[#0ea5e9]/30'
      default: return 'hover:border-highlight/30'
    }
  }

  const getCardShadowHoverClass = () => {
    switch (theme) {
      case 'cream': return 'hover:shadow-[#0F9B6E]/10 hover:shadow-xl'
      case 'dim': return 'hover:shadow-[#1DD0A7]/10 hover:shadow-2xl'
      case 'graphite': return 'hover:shadow-[#0ea5e9]/10 hover:shadow-2xl'
      default: return 'hover:shadow-highlight/10 hover:shadow-2xl'
    }
  }

  const getGlowGradClass = () => {
    switch (theme) {
      case 'cream': return 'bg-[radial-gradient(circle_at_center,rgba(15,155,110,0.1),transparent_70%)]'
      case 'dim': return 'bg-[radial-gradient(circle_at_center,rgba(29,208,167,0.12),transparent_70%)]'
      case 'graphite': return 'bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_70%)]'
      default: return 'bg-[radial-gradient(circle_at_center,rgba(94,238,255,0.15),transparent_70%)]'
    }
  }

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
      className="section-projects min-h-screen pt-32 px-[10%] pb-20 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#0F9B6E]/5'} animate-float`} style={{ animationDelay: '1s' }} data-parallax="slow" data-parallax-speed="2"></div>
      </div>

      {/* Header */}
      <div className="mb-20 text-center relative z-10 scroll-animate" data-parallax="scale" data-parallax-delay="0.1">
        {/* Connecting Line Receiver */}
        <div className={`absolute left-[10%] top-[-8rem] w-[2px] h-32 bg-gradient-to-t ${isDarkMode ? 'from-highlight/50 to-transparent' : 'from-[#0F9B6E]/50 to-transparent'
          } max-md:hidden`}></div>

        <div className="inline-block relative">
          <div className={`absolute -inset-4 blur-2xl opacity-20 ${isDarkMode ? 'bg-highlight' : 'bg-[#0F9B6E]'}`}></div>
          <h2
            className={`relative font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'} text-[6rem] font-bold mb-4 max-md:text-[3.5rem] leading-none tracking-tight`}
          >
            Featured
            <span className="block text-gradient">Projects</span>
          </h2>
        </div>

        <p className={`mt-8 text-xl font-['DM_Sans'] ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} max-w-2xl mx-auto leading-relaxed`}>
          A collection of projects showcasing my curiosity in machine learning, web development, and IoT solutions.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-10" data-parallax="fade" data-parallax-delay="0.2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-300 ${activeFilter === category
                ? isDarkMode
                  ? 'bg-highlight text-dark-bg border-2 border-highlight shadow-lg shadow-highlight/30'
                  : 'bg-[#0F9B6E] text-white border-2 border-[#0F9B6E] shadow-lg shadow-[#0F9B6E]/20'
                : isDarkMode
                  ? 'bg-transparent text-nav-text border-2 border-nav-text/30 hover:border-highlight hover:text-highlight'
                  : 'bg-transparent text-light-body-text border-2 border-slate-300 hover:border-[#0F9B6E] hover:text-[#0F9B6E]'
                } hover:scale-105`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/Scroll Container */}
      <div
        ref={scrollContainerRef}
        className={`project-scroll overflow-x-auto pb-8 scrollbar-hide relative z-10 scroll-animate scroll-animate-delay-1`}
        data-parallax="slide-up"
        data-parallax-delay="0.3"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        data-lenis-prevent
      >
        <div className="flex gap-8 min-w-max px-4 mt-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card perspective-card flex-shrink-0 w-[420px] p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden ${isDarkMode
                ? `bg-white/5 border border-white/10 ${getCardBorderHoverClass()} ${getCardShadowHoverClass()}`
                : 'bg-white border border-slate-200/80 shadow-md hover:border-[#0F9B6E]/40 hover:shadow-xl hover:shadow-slate-300/30'
                } backdrop-blur-md`}
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Hover Glow Gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${getGlowGradClass()}`}></div>

              {/* Category Badge */}
              <div className="absolute top-6 right-6 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] font-bold tracking-wide border backdrop-blur-md ${isDarkMode
                  ? 'bg-black/30 text-highlight border-highlight/30'
                  : 'bg-white/80 text-[#0F9B6E] border-[#0F9B6E]/30'
                  }`}>
                  {project.category}
                </span>
              </div>

              {/* Project Image */}
              <div className="relative w-full h-[240px] rounded-2xl overflow-hidden mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isDarkMode ? 'bg-black/20 group-hover:bg-transparent' : 'bg-transparent group-hover:bg-transparent'
                  }`}></div>
                <img
                  src={project.image}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  alt={project.title}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-2">
                <h3
                  className={`text-2xl font-['Syne'] font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-highlight' : 'text-light-name-text group-hover:text-[#0F9B6E]'
                    }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm font-['DM_Sans'] mb-6 leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-light-body-text/90'}`}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => ( // Showing top 4 to prevent clutter
                    <span
                      key={tech}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border transition-all duration-300 ${isDarkMode
                        ? 'bg-white/5 text-gray-400 border-white/10 group-hover:border-highlight/30 group-hover:text-highlight'
                        : 'bg-slate-100 text-light-body-text border-slate-200 group-hover:border-[#0F9B6E]/30 group-hover:text-[#0F9B6E]'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`text-[10px] px-2 py-1 rounded border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-slate-100 border-slate-200 text-light-body-text/60'}`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-10 relative z-10">
        <div className="inline-flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight' : 'bg-[#0F9B6E]'} animate-pulse`}></div>
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight/60' : 'bg-[#0F9B6E]/60'} animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight/30' : 'bg-[#0F9B6E]/30'} animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className={`text-sm font-['JetBrains_Mono'] ${isDarkMode ? 'text-nav-text' : 'text-light-body-text/70'}`}>
            Scroll horizontally or use mouse wheel →
          </p>
        </div>
      </div>
    </section>
  )
}