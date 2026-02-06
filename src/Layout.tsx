import { useState, useEffect } from 'react'
import './App.css'
import { AboutMe } from './components/section/aboutMe'
import { Head } from './components/section/header'
import { Projects } from './components/section/projects'
import { Contact } from './components/section/contact'
import { AdvancedCursorSpotlight } from './components/AdvancedCursorSpotlight'
import LoadingScreen from './components/LoadingScreen'

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} duration={4000} />
  }

  return (
    <div 
      className={`min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] text-body-text' 
          : 'bg-gradient-to-br from-[#285B9D] via-[#2a5f9e] to-[#285B9D] text-light-body-text'
      } transition-all duration-700 font-['DM_Sans'] leading-relaxed relative overflow-x-hidden`}
    >
      {/* Cursor Spotlight Effect */}
     <AdvancedCursorSpotlight 
  isDarkMode={isDarkMode}
  intensity={0.2}
  size={500}
/>

      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[1]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${isDarkMode ? '#5EEEFF' : '#1DD0A7'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#5EEEFF' : '#1DD0A7'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Grain texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-[2]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]">
        <div 
          className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDarkMode ? 'bg-highlight/10' : 'bg-[#1DD0A7]/10'
          } animate-float`}
          style={{ animationDuration: '20s' }}
        ></div>
        <div 
          className={`absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] ${
            isDarkMode ? 'bg-[#8892B0]/5' : 'bg-[#0F9B6E]/10'
          } animate-float`}
          style={{ animationDuration: '25s', animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Head isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <AboutMe isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />

        {/* Footer */}
        <footer className={`relative z-10 py-12 text-center border-t ${
          isDarkMode ? 'border-white/5' : 'border-white/10'
        }`}>
          <div className="space-y-4">
            <p className={`font-['JetBrains_Mono'] text-sm ${
              isDarkMode ? 'text-body-text/60' : 'text-white/60'
            }`}>
              Designed & Built by Jay Lao
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/JayLao27" 
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'
                }`}
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/jaylao" 
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'
                }`}
              >
                LinkedIn
              </a>
              <a 
                href="mailto:laocjay697@gmail.com"
                className={`text-sm transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'
                }`}
              >
                Email
              </a>
            </div>
            <p className={`text-xs font-['JetBrains_Mono'] mt-4 ${
              isDarkMode ? 'text-body-text/40' : 'text-white/40'
            }`}>
              © 2026 Jay Lao. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 ${
          isDarkMode
            ? 'bg-highlight/10 border-2 border-highlight/30 text-highlight hover:bg-highlight/20'
            : 'bg-[#1DD0A7]/10 border-2 border-[#1DD0A7]/30 text-[#1DD0A7] hover:bg-[#1DD0A7]/20'
        }`}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </div>
  )
}

export default Layout