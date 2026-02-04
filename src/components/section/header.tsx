import React, { useState, useEffect } from 'react'
import { MoonIcon, SunIcon, MessageIcon } from '../Icons'
import { LeftIcons } from '../Left-icons'

type HeadProps = {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const Head: React.FC<HeadProps> = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 right-0 p-8 pr-12 z-[1000] flex items-center gap-8 max-md:p-6 max-md:pr-8 max-md:gap-4 transition-all duration-300 ${
          scrolled ? 'glass-effect rounded-bl-2xl' : ''
        }`}
      >
        <div className="flex gap-8 max-md:gap-4">
          <a
            href="#about"
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group`}
          >
            <span className="relative z-10">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#projects"
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group`}
          >
            <span className="relative z-10">Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#contact"
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] max-md:text-xs relative group`}
          >
            <span className="relative z-10">Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-[10%] relative max-w-[1600px] mx-auto max-xl:px-[5%] max-md:px-[5%] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-highlight/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <LeftIcons isDarkMode={isDarkMode} />

        <div className="flex-1 max-w-[800px] text-center relative z-10">
          <div className="space-y-6">
            <p 
              className={`text-hi-text text-base font-['JetBrains_Mono'] font-normal tracking-widest uppercase animate-fade-in-up`}
              style={{ animationFillMode: 'forwards' }}
            >
              Hi, my name is
            </p>
            
            <h1 
              className={`text-[5rem] font-['Syne'] font-bold ${isDarkMode ? 'text-name-text' : 'text-[#F0F4FF]'} mb-2 leading-tight max-xl:text-[4rem] max-md:text-[3rem] max-sm:text-[2.5rem] animate-fade-in-up`}
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
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
              className={`text-[4rem] font-['Syne'] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-[#F0F4FF]'} mb-6 leading-tight max-xl:text-[3rem] max-md:text-[2.5rem] max-sm:text-[2rem] animate-fade-in-up`}
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Eat, Sleep, Learn,  {' '}
              <span className="relative inline-block">
                <span className="text-gradient">Code</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,4 Q25,0 50,4 T100,4" stroke="#5EEEFF" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>

            <p 
              className={`text-xl font-['DM_Sans'] ${isDarkMode ? 'text-body-text' : 'text-[#1DD0A7]'} max-w-[650px] mx-auto leading-relaxed animate-fade-in-up`}
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              I'm a{' '}
              <span className="text-highlight font-medium relative inline-block group">
                curious
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>{' '}
              programmer who invests time learning a lot and creating.
            </p>

            {/* CTA Button */}
            <div 
              className="pt-8 animate-fade-in-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <a
                href="#about"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-['JetBrains_Mono'] text-sm tracking-wider transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-highlight/10 text-highlight border-2 border-highlight/50 hover:bg-highlight hover:text-dark-bg'
                    : 'bg-[#1DD0A7]/10 text-[#1DD0A7] border-2 border-[#1DD0A7]/50 hover:bg-[#1DD0A7] hover:text-white'
                } hover:scale-105 hover:shadow-lg hover:shadow-highlight/30`}
              >
                Explore My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div 
          className="absolute right-8 flex items-center justify-center max-md:right-4 max-sm:hidden animate-fade-in-up" 
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
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