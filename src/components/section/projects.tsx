import React, { useRef, useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  category: string
  image: string
}

const projectsData: Project[] = [
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

export const Projects: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px 0px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-projects min-h-screen pt-32 px-[10%] pb-20 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`} style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className={`mb-16 text-center relative z-10 scroll-animate ${isVisible ? 'show' : ''}`}>
        <div className="inline-block">
          <div className="relative">
            <h2
              className={`font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} text-[5rem] font-bold mb-4 max-md:text-[3.5rem] leading-none`}
            >
              Featured
              <span className="block text-gradient">Projects</span>
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-20 h-1 bg-highlight"></div>
              <div className="w-12 h-1 bg-highlight/50"></div>
              <div className="w-6 h-1 bg-highlight/30"></div>
            </div>
          </div>
        </div>

        <p className={`mt-8 text-lg font-['DM_Sans'] ${isDarkMode ? 'text-body-text' : 'text-white/80'} max-w-2xl mx-auto`}>
          A collection of projects showcasing my expertise in machine learning, web development, and IoT solutions.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full font-['JetBrains_Mono'] text-sm tracking-wide transition-all duration-300 ${
                activeFilter === category
                  ? isDarkMode
                    ? 'bg-highlight text-dark-bg border-2 border-highlight shadow-lg shadow-highlight/30'
                    : 'bg-[#1DD0A7] text-white border-2 border-[#1DD0A7] shadow-lg shadow-[#1DD0A7]/30'
                  : isDarkMode
                    ? 'bg-transparent text-nav-text border-2 border-nav-text/30 hover:border-highlight hover:text-highlight'
                    : 'bg-transparent text-white border-2 border-white/30 hover:border-[#1DD0A7] hover:text-[#1DD0A7]'
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
        className={`project-scroll overflow-x-auto pb-8 scrollbar-hide relative z-10 scroll-animate scroll-animate-delay-1 ${isVisible ? 'show' : ''}`}
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex gap-8 min-w-max px-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card perspective-card flex-shrink-0 w-[420px] p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                isDarkMode
                  ? 'glass-effect hover:bg-white/5'
                  : 'bg-gradient-to-br from-white/10 to-transparent border border-white/20 hover:bg-white/15'
              }`}
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-highlight/10 to-transparent'
                  : 'bg-gradient-to-br from-[#1DD0A7]/10 to-transparent'
              }`}></div>

              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] ${
                isDarkMode
                  ? 'bg-highlight/20 text-highlight border border-highlight/30'
                  : 'bg-[#1DD0A7]/20 text-[#1DD0A7] border border-[#1DD0A7]/30'
              }`}>
                {project.category}
              </div>

              {/* Project Icon */}
              <div className={`project-image relative w-full h-[220px] rounded-xl mb-6 overflow-hidden flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-highlight/10 to-transparent' 
                  : 'bg-gradient-to-br from-[#1DD0A7]/10 to-transparent'
              }`} id={`project-image-${project.id}`}>
                <img 
                src={project.image}
                  className="w-full h-full object-cover"
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Project Content */}
              <div className="relative z-10">
                <h3
                  className={`text-2xl font-['Syne'] font-bold mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-highlight group-hover:text-[#5EEEFF]' : 'text-[#E1E8FF] group-hover:text-[#1DD0A7]'
                  }`}
                >
                  {project.title}
                </h3>
                
                <p
                  className={`text-sm font-['DM_Sans'] mb-6 leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-white/80'}`}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] transition-all duration-300 hover:scale-110 ${
                        isDarkMode
                          ? 'bg-[rgba(136,146,176,0.15)] text-[rgba(136,146,176,0.9)] border border-[rgba(136,146,176,0.2)]'
                          : 'bg-white/10 text-white/90 border border-white/20'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-['JetBrains_Mono'] font-medium transition-all duration-300 group/link ${
                      isDarkMode ? 'text-highlight hover:text-[#5EEEFF]' : 'text-[#1DD0A7] hover:text-[#0F9B6E]'
                    }`}
                  >
                    View Project
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="transform group-hover/link:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-10 relative z-10">
        <div className="inline-flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight' : 'bg-[#1DD0A7]'} animate-pulse`}></div>
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight/60' : 'bg-[#1DD0A7]/60'} animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-highlight/30' : 'bg-[#1DD0A7]/30'} animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className={`text-sm font-['JetBrains_Mono'] ${isDarkMode ? 'text-nav-text' : 'text-white/60'}`}>
            Scroll horizontally or use mouse wheel →
          </p>
        </div>
      </div>
    </section>
  )
}