import React, { useState, useEffect } from 'react'
import { MessageIcon, EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from '../../ui/Icons'
import { LeftIcons } from '../../ui/Left-icons'

type HeroProps = {
  isDarkMode: boolean
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  setTheme: (theme: 'dark' | 'dim' | 'graphite' | 'cream') => void
  onChatOpen: () => void
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, theme, setTheme, onChatOpen }) => {
  const getGlowClass = () => {
    switch (theme) {
      case 'cream': return 'hover:shadow-[0_20px_40px_rgba(15,155,110,0.4)] shadow-[0_0_20px_rgba(15,155,110,0.2)]'
      case 'dim': return 'hover:shadow-[0_20px_40px_rgba(29,208,167,0.4)] shadow-[0_0_20px_rgba(29,208,167,0.2)]'
      case 'graphite': return 'hover:shadow-[0_20px_40px_rgba(14,165,233,0.4)] shadow-[0_0_20px_rgba(14,165,233,0.2)]'
      default: return 'hover:shadow-[0_20px_40px_rgba(68,139,178,0.4)] shadow-[0_0_20px_rgba(68,139,178,0.2)]'
    }
  }

  const getIconColorClass = () => {
    switch (theme) {
      case 'cream': return 'text-[#0F9B6E]'
      case 'dim': return 'text-[#1DD0A7]'
      case 'graphite': return 'text-[#0ea5e9]'
      default: return 'text-[#448BB2]'
    }
  }

  const getBGGlowColor = (index: 1 | 2 | 3) => {
    switch (theme) {
      case 'cream':
        return index === 3 ? 'bg-[#0F9B6E]/3' : 'bg-[#0F9B6E]/5'
      case 'dim':
        return index === 3 ? 'bg-[#1DD0A7]/3' : 'bg-[#1DD0A7]/5'
      case 'graphite':
        return index === 3 ? 'bg-[#0ea5e9]/3' : 'bg-[#0ea5e9]/5'
      default:
        return index === 3 ? 'bg-highlight/3' : 'bg-highlight/5'
    }
  }

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const [showText1, setShowText1] = useState(false)
  const [showText2, setShowText2] = useState(false)
  const [showText3, setShowText3] = useState(false)
  const [showText4, setShowText4] = useState(false)
  const [showLeftIcons, setShowLeftIcons] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Show header when scrolling up, hide when scrolling down
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  useEffect(() => {
    // Sequential animations after component mounts
    const timer1 = setTimeout(() => setShowHeader(true), 100)
    const timer2 = setTimeout(() => setShowText1(true), 600)
    const timer3 = setTimeout(() => setShowText2(true), 900)
    const timer4 = setTimeout(() => setShowText3(true), 1200)
    const timer5 = setTimeout(() => setShowText4(true), 1500)
    const timer6 = setTimeout(() => setShowLeftIcons(true), 2300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
    }
  }, [])

  return (
    <>
      {/* Header Bar with Glass Effect */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md transition-all duration-500 ease-in-out ${showHeader && visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
        <div className="flex items-center justify-between px-12 py-3 max-md:px-8 max-md:py-4">
          {/* Logo & Name - Left Side */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.03] group text-left cursor-pointer bg-transparent border-none p-0"
            aria-label="Refresh page"
          >
            <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-105">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="jGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#39F1DA" />
                    <stop offset="100%" stopColor="#00B4D8" />
                  </linearGradient>
                  <linearGradient id="lGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CCD6F6" />
                    <stop offset="100%" stopColor="#48CAE4" />
                  </linearGradient>
                  <linearGradient id="jGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F9B6E" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="lGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2D3748" />
                    <stop offset="100%" stopColor="#4A5568" />
                  </linearGradient>
                </defs>

                {/* Hexagon */}
                <path 
                  className={`fill-none transition-colors duration-300 ${
                    isDarkMode 
                      ? 'stroke-[#8892B0]/30 group-hover:stroke-[#39F1DA]/60' 
                      : 'stroke-[#2D3748]/30 group-hover:stroke-[#0F9B6E]/60'
                  }`} 
                  strokeWidth="5" 
                  d="M 100,10 L 173,50 L 173,150 L 100,190 L 27,150 L 27,50 Z" 
                />
                
                {/* J - Ribbon Curve */}
                <path 
                  className="fill-none transition-all duration-300" 
                  style={{
                    filter: `drop-shadow(0 0 0px transparent)`
                  }}
                  stroke={`url(#${isDarkMode ? 'jGradDark' : 'jGradLight'})`}
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M 65,70 C 90,70 90,115 90,120 C 90,140 75,148 60,135" 
                />
                
                {/* L - Geometric Corner */}
                <path 
                  className="fill-none transition-all duration-300" 
                  style={{
                    filter: `drop-shadow(0 0 0px transparent)`
                  }}
                  stroke={`url(#${isDarkMode ? 'lGradDark' : 'lGradLight'})`}
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M 115,70 L 115,140 L 145,140" 
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className={`font-['Syne'] font-extrabold text-lg tracking-wide transition-colors duration-300 ${
                isDarkMode ? 'text-name-text group-hover:text-highlight' : 'text-light-name-text group-hover:text-[#0F9B6E]'
              }`}>
                Jay Lao
              </span>
              <span className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase transition-colors duration-300 mt-1 ${
                isDarkMode ? 'text-body-text/60 group-hover:text-[#39F1DA]/80' : 'text-light-body-text/60 group-hover:text-[#0F9B6E]/80'
              }`}>
                Computer Science
              </span>
            </div>
          </button>

          {/* Navigation - Right Side */}
          <nav className="header-nav flex items-center gap-8 max-md:gap-4">
            <a
              href="#about"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down' : 'opacity-0'}`}
            >
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#projects"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down-delay-1' : 'opacity-0'}`}
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#certifications"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down-delay-2' : 'opacity-0'}`}
            >
              <span className="relative z-10">Certifications</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down-delay-2' : 'opacity-0'}`}
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Multi-Theme Swapper */}
            <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all duration-300 ${
              isDarkMode 
                ? 'border-[rgba(136,146,176,0.15)] bg-black/10' 
                : 'border-slate-200 bg-slate-50/50'
            } ${showHeader ? 'animate-slide-down-delay-2' : 'opacity-0'}`}>
              {[
                { id: 'dark', label: 'Dark Navy', color: 'bg-[#0a192f] border-[#39F1DA]' },
                { id: 'dim', label: 'Dim Blue', color: 'bg-[#15202B] border-[#1DD0A7]' },
                { id: 'graphite', label: 'Graphite', color: 'bg-[#1E2530] border-[#0ea5e9]' },
                { id: 'cream', label: 'Cream Paper', color: 'bg-[#FAF9F5] border-[#0F9B6E]' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as 'dark' | 'dim' | 'graphite' | 'cream')}
                  className={`w-5 h-5 rounded-full border transition-all duration-300 hover:scale-125 cursor-pointer ${t.color} ${
                    theme === t.id 
                      ? 'scale-110 shadow-sm ring-1 ring-offset-1 ' + (isDarkMode ? 'ring-white ring-offset-[#112240]' : 'ring-slate-500 ring-offset-[#FAF9F5]')
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  title={t.label}
                  aria-label={`Switch to ${t.label} theme`}
                />
              ))}
            </div>
          </nav>
        </div>
      </header>

      <section className="hero-section min-h-screen flex items-center justify-center px-[10%] relative max-w-[1600px] mx-auto max-xl:px-[5%] max-md:px-[5%]">
        {/* Animated parallax background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-20 left-10 w-72 h-72 ${getBGGlowColor(1)} rounded-full blur-3xl animate-float`}
            data-parallax="slow"
            data-parallax-speed="1.5"
          ></div>
          <div
            className={`absolute bottom-20 right-10 w-96 h-96 ${getBGGlowColor(2)} rounded-full blur-3xl animate-float`}
            style={{ animationDelay: '2s' }}
            data-parallax="slow"
            data-parallax-speed="2"
          ></div>
          <div
            className={`absolute top-1/3 left-1/2 w-64 h-64 ${getBGGlowColor(3)} rounded-full blur-3xl animate-float`}
            style={{ animationDelay: '4s' }}
            data-parallax="fast"
            data-parallax-speed="0.5"
          ></div>
        </div>

        <LeftIcons theme={theme} showIcons={showLeftIcons} />

        <div className="flex-1 max-w-[800px] text-center relative z-10">
          <div className="space-y-6">
            <div className="inline-block">
              <p
                className={`text-base font-['JetBrains_Mono'] font-normal tracking-widest uppercase transition-all duration-700 ease-out ${
                  isDarkMode ? 'text-highlight' : 'text-[#0F9B6E]'
                } ${showText1 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
              >
                Welcome, I'm
              </p>
            </div>

            <h1
              className={`text-[5rem] font-['Syne'] font-bold ${isDarkMode ? 'text-name-text' : 'text-light-name-text'} mb-2 leading-tight max-xl:text-[4rem] max-md:text-[3rem] max-sm:text-[2.5rem] transition-all duration-700 ease-out ${showText2 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                }`}
              data-parallax="slow"
              data-parallax-speed="0.3"
            >
              Jay Lao<span className="relative inline-block text-highlight animate-pulse">.</span>
            </h1>

            <h2
              className={`text-[2rem] font-['Syne'] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'} mb-6 leading-tight max-xl:text-[2.5rem] max-md:text-[2rem] max-sm:text-[1.5rem] transition-all duration-700 ease-out ${showText3 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}
              data-parallax="slow"
              data-parallax-speed="0.2"
            >Computer Science Student.
            </h2>

            {/* CTA Button */}
            <div
              className={`pt-8 transition-all duration-700 ease-out ${showText4 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                }`}
            >
              <a
                href="#projects"
                className={`hero-cta inline-flex items-center gap-3 px-8 py-4 rounded-full font-['JetBrains_Mono'] text-sm tracking-wider transition-all duration-500 ${isDarkMode
                  ? 'bg-highlight/10 text-highlight border-2 border-highlight/50 hover:bg-highlight hover:text-dark-bg'
                  : 'bg-[#0F9B6E]/10 text-[#0F9B6E] border-2 border-[#0F9B6E]/30 hover:bg-[#0F9B6E] hover:text-white'
                  } hover:scale-105 hover:shadow-lg ${isDarkMode ? 'hover:shadow-highlight/30' : 'hover:shadow-[#0F9B6E]/20'}`}
              >
                Explore My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* Social Icons for Mobile */}
              <div className="flex justify-center gap-6 mt-8 md:hidden">
                <a
                  href="mailto:laocjay697@gmail.com"
                  aria-label="Email"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-[#0F9B6E]'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <EmailIcon />
                </a>
                <a
                  href="https://www.instagram.com/xjay_lao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-[#0F9B6E]'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/jaylao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-[#0F9B6E]'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com/JayLao27"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-[#0F9B6E]'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute right-8 flex items-center justify-center max-md:right-4 max-sm:hidden transition-all duration-700 ease-out ${showText4 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
            }`}
        >
          <button
            onClick={onChatOpen}
            className={`rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:scale-110 focus:outline-none ${getGlowClass()}`}
            style={{ background: 'transparent', padding: 0 }}
            aria-label="Chatbot"
          >
            <MessageIcon className={`${getIconColorClass()} drop-shadow-lg`} />
          </button>
        </div>
      </section>
    </>
  )
}