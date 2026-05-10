import type { ReactNode } from 'react'
import { AdvancedCursorSpotlight } from './AdvancedCursorSpotlight'
import { LocomotiveScrollProvider } from './locomotive-scroll'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'

type LayoutDesignProps = {
  isDarkMode: boolean
  children: ReactNode
}

export function LayoutDesign({ isDarkMode, children }: LayoutDesignProps) {
  useScrollReveal()
  useParallax()

  return (
    <LocomotiveScrollProvider>
      <div
        className={`min-h-screen ${isDarkMode
          ? 'bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] text-body-text'
          : 'bg-gradient-to-br from-[#285B9D] via-[#2a5f9e] to-[#285B9D] text-light-body-text'
          } transition-all duration-700 font-['DM_Sans'] leading-relaxed relative overflow-x-hidden`}
      >
        <AdvancedCursorSpotlight
          isDarkMode={isDarkMode}
          intensity={0.2}
          size={500}
        />

        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]">
          <div
            className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${isDarkMode ? 'bg-highlight/10' : 'bg-[#1DD0A7]/10'
              } animate-float`}
            style={{ animationDuration: '20s' }}
            data-parallax="slow"
            data-parallax-speed="1.8"
          ></div>
          <div
            className={`absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] ${isDarkMode ? 'bg-[#8892B0]/5' : 'bg-[#0F9B6E]/10'
              } animate-float`}
            style={{ animationDuration: '25s', animationDelay: '2s' }}
            data-parallax="fast"
            data-parallax-speed="0.6"
          ></div>
        </div>

        <div className="relative z-10" data-scroll-section>
          {children}  

          <footer
            className={`relative z-10 py-12 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}
            data-parallax="slide-up"
            data-parallax-speed="0.6"
          >
            <div className="space-y-4">
              <p className={`font-['JetBrains_Mono'] text-sm ${isDarkMode ? 'text-body-text/60' : 'text-white/60'}`}>
                Designed & Built by Jay Lao
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://github.com/JayLao27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'}`}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jaylao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'}`}
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:laocjay697@gmail.com"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${isDarkMode ? 'text-body-text hover:text-highlight' : 'text-white hover:text-[#1DD0A7]'}`}
                >
                  Email
                </a>
              </div>
              <p className={`text-xs font-['JetBrains_Mono'] mt-4 ${isDarkMode ? 'text-body-text/40' : 'text-white/40'}`}>
                © 2026 Jay Lao. All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`scroll-top-button fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 ${isDarkMode
            ? 'bg-highlight/10 border-2 border-highlight/30 text-highlight hover:bg-highlight/20'
            : 'bg-[#1DD0A7]/10 border-2 border-[#1DD0A7]/30 text-[#1DD0A7] hover:bg-[#1DD0A7]/20'
            }`}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </LocomotiveScrollProvider>
  )
}
