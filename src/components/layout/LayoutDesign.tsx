import { useState, useEffect, type ReactNode } from 'react'
import { AdvancedCursorSpotlight } from '../effects/AdvancedCursorSpotlight'
import { useLocomotiveScroll } from '../effects/locomotive-scroll'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useParallax } from '../../hooks/useParallax'

type LayoutDesignProps = {
  isDarkMode: boolean
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  children: ReactNode
}

export function LayoutDesign({ isDarkMode, theme, children }: LayoutDesignProps) {
  useScrollReveal()
  useParallax()
  const scroll = useLocomotiveScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = window.scrollY / totalHeight
        setScrollProgress(progress)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Run once initially to capture page state
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scroll])

  const getBgClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] text-body-text'
      case 'dim':
        return 'bg-gradient-to-br from-[#15202B] via-[#192734] to-[#15202B] text-body-text'
      case 'graphite':
        return 'bg-gradient-to-br from-[#1E2530] via-[#121620] to-[#1E2530] text-[#94A3B8]'
      case 'cream':
        return 'bg-gradient-to-br from-[#FAF9F5] via-[#EFEFEA] to-[#FAF9F5] text-light-body-text'
    }
  }

  const getBorderClass = () => {
    return theme === 'cream' ? 'border-slate-200' : 'border-white/5'
  }

  const getFooterTextClass = () => {
    switch (theme) {
      case 'cream':
        return 'text-light-body-text/60'
      case 'graphite':
        return 'text-[#94A3B8]/60'
      default:
        return 'text-body-text/60'
    }
  }

  const getFooterLinkClass = () => {
    switch (theme) {
      case 'cream':
        return 'text-light-body-text hover:text-[#0F9B6E]'
      case 'dim':
        return 'text-body-text hover:text-[#1DD0A7]'
      case 'graphite':
        return 'text-[#94A3B8] hover:text-[#0ea5e9]'
      default:
        return 'text-body-text hover:text-highlight'
    }
  }

  const getCopyrightClass = () => {
    switch (theme) {
      case 'cream':
        return 'text-light-body-text/40'
      case 'graphite':
        return 'text-[#94A3B8]/40'
      default:
        return 'text-body-text/40'
    }
  }

  const getScrollBtnClass = () => {
    switch (theme) {
      case 'cream':
        return 'bg-[#0F9B6E]/10 border-2 border-[#0F9B6E]/30 text-[#0F9B6E] hover:bg-[#0F9B6E]/20'
      case 'dim':
        return 'bg-[#1DD0A7]/10 border-2 border-[#1DD0A7]/30 text-[#1DD0A7] hover:bg-[#1DD0A7]/20'
      case 'graphite':
        return 'bg-[#0ea5e9]/10 border-2 border-[#0ea5e9]/30 text-[#0ea5e9] hover:bg-[#0ea5e9]/20'
      default:
        return 'bg-highlight/10 border-2 border-highlight/30 text-highlight hover:bg-highlight/20'
    }
  }

  const getBlurColor = (index: 1 | 2) => {
    if (index === 1) {
      switch (theme) {
        case 'cream': return 'bg-[#0F9B6E]/10'
        case 'graphite': return 'bg-[#0ea5e9]/10'
        case 'dim': return 'bg-[#1DD0A7]/10'
        default: return 'bg-highlight/10'
      }
    } else {
      switch (theme) {
        case 'cream': return 'bg-[#0F9B6E]/5'
        case 'graphite': return 'bg-[#0ea5e9]/5'
        case 'dim': return 'bg-[#1DD0A7]/5'
        default: return 'bg-[#8892B0]/5'
      }
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

  return (
    <div
      className={`${getBgClass()} transition-all duration-700 font-['DM_Sans'] leading-relaxed relative overflow-x-hidden min-h-screen`}
    >
        {/* Sleek Scroll Progress Bar */}
        <div 
          className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left transition-transform duration-75 ease-out"
          style={{
            background: `linear-gradient(to right, rgba(${getAccentRgb()}, 0.4), rgba(${getAccentRgb()}, 1))`,
            transform: `scaleX(${scrollProgress})`,
            boxShadow: `0 0 10px rgba(${getAccentRgb()}, 0.5)`
          }}
        />

        <AdvancedCursorSpotlight
          theme={theme}
          intensity={0.2}
          size={500}
        />

        {/* ── Global Dot-Grid Background ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ── Global Vertical Guide Lines ── */}
        <div className="absolute inset-y-0 left-0 right-0 max-w-[1600px] mx-auto pointer-events-none z-[2] px-[10%] max-xl:px-[5%] max-md:px-[5%]">
          <div className="relative h-full w-full">
            {/* Left dashed grid guide */}
            <div className="absolute inset-y-0 left-0 w-[1px]"
              style={{
                borderLeft: `1px dashed ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`
              }}
            />
            {/* Right dashed grid guide */}
            <div className="absolute inset-y-0 right-0 w-[1px]"
              style={{
                borderRight: `1px dashed ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`
              }}
            />
          </div>
        </div>

        {/* ── Global Diagonal Light Beams ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          <div
            className="absolute top-[5%] left-[25%] w-[1px] h-[35%] origin-top"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${getAccentRgb()},0.12) 30%, transparent 70%)`,
              transform: 'rotate(-25deg) scaleX(50)',
              opacity: 0.4,
            }}
          />
          {/* Middle Beam (slices about-projects transition) */}
          <div
            className="absolute top-[35%] right-[20%] w-[1px] h-[35%] origin-top"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${getAccentRgb()},0.08) 30%, transparent 70%)`,
              transform: 'rotate(-25deg) scaleX(50)',
              opacity: 0.3,
            }}
          />
          {/* Bottom Beam (slices certs-contact transition) */}
          <div
            className="absolute top-[68%] left-[18%] w-[1px] h-[28%] origin-top"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${getAccentRgb()},0.1) 30%, transparent 70%)`,
              transform: 'rotate(-25deg) scaleX(50)',
              opacity: 0.35,
            }}
          />
        </div>

        {/* ── Global Floating Accent Rings ── */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          {/* Ring 1 - upper section */}
          <div
            className="absolute top-[12%] right-[10%] w-32 h-32 rounded-full animate-float"
            style={{
              border: `1px dashed rgba(${getAccentRgb()},0.15)`,
              animationDuration: '12s',
            }}
          />
          {/* Ring 2 - mid section */}
          <div
            className="absolute top-[42%] left-[6%] w-48 h-48 rounded-full animate-float"
            style={{
              border: `1px solid rgba(${getAccentRgb()},0.06)`,
              animationDuration: '18s',
              animationDelay: '1s',
            }}
          />
          {/* Ring 3 - lower section */}
          <div
            className="absolute top-[75%] right-[8%] w-40 h-40 rounded-full animate-float"
            style={{
              border: `1px dashed rgba(${getAccentRgb()},0.08)`,
              animationDuration: '15s',
              animationDelay: '2s',
            }}
          />
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]">
          <div
            className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${getBlurColor(1)} animate-float`}
            style={{ animationDuration: '20s' }}
            data-parallax="slow"
            data-parallax-speed="1.8"
          ></div>
          <div
            className={`absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] ${getBlurColor(2)} animate-float`}
            style={{ animationDuration: '25s', animationDelay: '2s' }}
            data-parallax="fast"
            data-parallax-speed="0.6"
          ></div>
        </div>

        <div className="relative z-10" data-scroll-section>
          {children}  

          <footer
            className={`relative z-10 py-12 text-center border-t ${getBorderClass()}`}
            data-parallax="slide-up"
            data-parallax-speed="0.6"
          >
            <div className="space-y-4">
              <p className={`font-['JetBrains_Mono'] text-sm ${getFooterTextClass()}`}>
                Designed & Built by Jay Lao
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://github.com/JayLao27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${getFooterLinkClass()}`}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jaylao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${getFooterLinkClass()}`}
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:laocjay697@gmail.com"
                  className={`text-sm transition-all duration-300 hover:-translate-y-1 ${getFooterLinkClass()}`}
                >
                  Email
                </a>
              </div>
              <p className={`text-xs font-['JetBrains_Mono'] mt-4 ${getCopyrightClass()}`}>
                © 2026 Jay Lao. All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        <button
          onClick={() => {
            if (scroll) {
              scroll.scrollTo(0)
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className={`scroll-top-button fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 ${getScrollBtnClass()}`}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
  )
}
