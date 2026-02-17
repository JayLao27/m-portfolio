import React, { useState, useEffect } from 'react'
import { MoonIcon, SunIcon, MessageIcon, EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from '../Icons'
import { LeftIcons } from '../Left-icons'

type HeadProps = {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const Head: React.FC<HeadProps> = ({ isDarkMode, toggleTheme }) => {
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
          {/* Logo - Left Side */}
          <button
            onClick={() => window.location.reload()}
            className="relative transition-all duration-300 hover:scale-110 group"
            aria-label="Refresh page"
          >
            <div className={`relative w-14 h-14 transition-colors duration-300 ${isDarkMode ? 'text-nav-text group-hover:text-highlight' : 'text-[#FFFFFF] group-hover:text-highlight'
              }`}>
              <svg className="absolute inset-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-none stroke-current" strokeWidth="4" d="M 100,10 L 173,50 L 173,150 L 100,190 L 27,150 L 27,50 Z" />
              </svg>
              <svg className="absolute inset-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" d="M 80,60 L 120,60 L 120,130 Q 120,150 100,150 Q 80,150 80,130" />
              </svg>
            </div>
          </button>

          {/* Navigation - Right Side */}
          <nav className="header-nav flex items-center gap-8 max-md:gap-4">
            <a
              href="#about"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down' : 'opacity-0'}`}
            >
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#projects"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down-delay-1' : 'opacity-0'}`}
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group ${showHeader ? 'animate-slide-down-delay-2' : 'opacity-0'}`}
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      <section className="hero-section min-h-screen flex items-center justify-center px-[10%] relative max-w-[1600px] mx-auto max-xl:px-[5%] max-md:px-[5%] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-highlight/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <LeftIcons isDarkMode={isDarkMode} showIcons={showLeftIcons} />

        <div className="flex-1 max-w-[800px] text-center relative z-10">
          <div className="space-y-6">
            <div className="inline-block">
              <p
                className={`text-hi-text text-base font-['JetBrains_Mono'] font-normal tracking-widest uppercase ${showText1 ? 'typing-text' : 'opacity-0'
                  }`}
              >
                Hi, my name is
              </p>
            </div>

            <h1
              className={`text-[5rem] font-['Syne'] font-bold ${isDarkMode ? 'text-name-text' : 'text-[#F0F4FF]'} mb-2 leading-tight max-xl:text-[4rem] max-md:text-[3rem] max-sm:text-[2.5rem] transition-all duration-700 ease-out ${showText2 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                }`}
            >
              Jay La
              <button
                onClick={toggleTheme}
                className={`inline-flex ml-4 bg-transparent border ${isDarkMode ? 'border-[rgba(136,146,176,0.2)] text-nav-text hover:bg-[rgba(136,146,176,0.2)]' : 'border-[rgba(10,43,47,0.1)] text-light-nav-text hover:bg-[rgba(10,43,47,0.1)]'} px-3 py-2 rounded-xl cursor-pointer text-xl transition-all duration-500 hover:scale-110 hover:rotate-12 align-middle`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <MoonIcon /> : <SunIcon />}
              </button>
              <span className="relative inline-block text-highlight animate-pulse">.</span>
            </h1>

            <h2
              className={`text-[2rem] font-['Syne'] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-[#F0F4FF]'} mb-6 leading-tight max-xl:text-[3rem] max-md:text-[2.5rem] max-sm:text-[2rem] transition-all duration-700 ease-out ${showText3 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>Sleep, Eat, Create.  <span className="relative inline-block">
              </span>
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
                  : 'bg-[#1DD0A7]/10 text-[#1DD0A7] border-2 border-[#1DD0A7]/50 hover:bg-[#1DD0A7] hover:text-white'
                  } hover:scale-105 hover:shadow-lg hover:shadow-highlight/30`}
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
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <EmailIcon />
                </a>
                <a
                  href="https://www.instagram.com/xjay_lao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/jaylao"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com/JayLao27"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
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
          <a
            href="#contact"
            className="rounded-full bg-[#448BB2] border-none text-white cursor-pointer flex items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(68,139,178,0.4)] hover:scale-110 animate-glow"
            aria-label="Contact"
          >
            <MessageIcon className="text-white" />
          </a>
        </div>
      </section>
    </>
  )
}