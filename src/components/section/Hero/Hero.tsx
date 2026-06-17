import React, { useState, useEffect, useRef } from 'react'
import { MessageIcon, EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from '../../ui/Icons'
import { LeftIcons } from '../../ui/Left-icons'
import { useLocomotiveScroll } from '../../effects/locomotive-scroll'

type HeroProps = {
  isDarkMode: boolean
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  setTheme: (theme: 'dark' | 'dim' | 'graphite' | 'cream') => void
  onChatOpen: () => void
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, theme, setTheme, onChatOpen }) => {
  const scroll = useLocomotiveScroll()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (scroll) {
      scroll.scrollTo(href)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
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


  const getAccentColor = () => {
    switch (theme) {
      case 'cream': return '#0F9B6E'
      case 'dim': return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      default: return '#39F1DA'
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
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
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

  const accent = getAccentColor()

  return (
    <>
      {/* ─── Header Bar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md transition-all duration-500 ease-in-out ${
          showHeader && visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-12 py-3 max-md:px-8 max-md:py-4">
          {/* Logo & Name */}
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
                <path
                  className={`fill-none transition-colors duration-300 ${
                    isDarkMode
                      ? 'stroke-[#8892B0]/30 group-hover:stroke-[#39F1DA]/60'
                      : 'stroke-[#2D3748]/30 group-hover:stroke-[#0F9B6E]/60'
                  }`}
                  strokeWidth="5"
                  d="M 100,10 L 173,50 L 173,150 L 100,190 L 27,150 L 27,50 Z"
                />
                <path
                  className="fill-none transition-all duration-300"
                  style={{ filter: `drop-shadow(0 0 0px transparent)` }}
                  stroke={`url(#${isDarkMode ? 'jGradDark' : 'jGradLight'})`}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 65,70 C 90,70 90,115 90,120 C 90,140 75,148 60,135"
                />
                <path
                  className="fill-none transition-all duration-300"
                  style={{ filter: `drop-shadow(0 0 0px transparent)` }}
                  stroke={`url(#${isDarkMode ? 'lGradDark' : 'lGradLight'})`}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 115,70 L 115,140 L 145,140"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span
                className={`font-['Syne'] font-extrabold text-lg tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-name-text group-hover:text-highlight' : 'text-light-name-text group-hover:text-[#0F9B6E]'
                }`}
              >
                Jay Lao
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase transition-colors duration-300 mt-1 ${
                  isDarkMode ? 'text-body-text/60 group-hover:text-[#39F1DA]/80' : 'text-light-body-text/60 group-hover:text-[#0F9B6E]/80'
                }`}
              >
                Computer Science
              </span>
            </div>
          </button>

          {/* Navigation — frosted glass pill around the links only */}
          <nav className="header-nav flex items-center gap-3 max-md:gap-2">
            {/* Nav links pill */}
            <div
              className={`flex items-center gap-6 px-6 py-2.5 rounded-full border transition-all duration-300 max-md:hidden ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 backdrop-blur-xl'
                  : 'bg-white/60 border-slate-200/60 backdrop-blur-xl shadow-sm'
              }`}
            >
              {[
                { href: '#about', label: 'About', delay: 'animate-slide-down' },
                { href: '#projects', label: 'Projects', delay: 'animate-slide-down-delay-1' },
                { href: '#certifications', label: 'Certifications', delay: 'animate-slide-down-delay-2' },
                { href: '#contact', label: 'Contact', delay: 'animate-slide-down-delay-2' },
              ].map(({ href, label, delay }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`${
                    isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'
                  } no-underline text-sm font-['JetBrains_Mono'] tracking-wider transition-all duration-300 hover:translate-y-[-2px] relative group ${
                    showHeader ? delay : 'opacity-0'
                  }`}
                >
                  <span className="relative z-10">{label}</span>
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full rounded-full"
                    style={{ background: accent }}
                  />
                </a>
              ))}
            </div>

            {/* Mobile nav links (no pill) */}
            <div className="hidden max-md:flex items-center gap-4">
              {[
                { href: '#about', label: 'About' },
                { href: '#projects', label: 'Projects' },
                { href: '#contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`${
                    isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-[#1DD0A7]'
                  } no-underline text-xs font-['JetBrains_Mono'] tracking-wider transition-all duration-300`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Multi-Theme Swapper */}
            <div
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all duration-300 ${
                isDarkMode
                  ? 'border-[rgba(136,146,176,0.15)] bg-black/10'
                  : 'border-slate-200 bg-slate-50/50'
              } ${showHeader ? 'animate-slide-down-delay-2' : 'opacity-0'}`}
            >
              {[
                { id: 'dark', label: 'Dark Navy', color: 'bg-[#0a192f] border-[#39F1DA]' },
                { id: 'dim', label: 'Dim Blue', color: 'bg-[#15202B] border-[#1DD0A7]' },
                { id: 'graphite', label: 'Graphite', color: 'bg-[#1E2530] border-[#0ea5e9]' },
                { id: 'cream', label: 'Cream Paper', color: 'bg-[#FAF9F5] border-[#0F9B6E]' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as 'dark' | 'dim' | 'graphite' | 'cream')}
                  className={`w-5 h-5 rounded-full border transition-all duration-300 hover:scale-125 cursor-pointer ${t.color} ${
                    theme === t.id
                      ? 'scale-110 shadow-sm ring-1 ring-offset-1 ' +
                        (isDarkMode ? 'ring-white ring-offset-[#112240]' : 'ring-slate-500 ring-offset-[#FAF9F5]')
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

      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="hero-section min-h-screen flex items-center px-[10%] relative max-w-[1600px] mx-auto max-xl:px-[5%] max-md:px-[5%] overflow-hidden"
      >

        {/* ── Layer 2: Mouse-tracking aurora spotlight ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 55% 55% at ${mouse.x}% ${mouse.y}%, rgba(${
              theme === 'cream' ? '15,155,110' :
              theme === 'dim' ? '29,208,167' :
              theme === 'graphite' ? '14,165,233' : '57,241,218'
            },0.08), transparent 70%)`,
          }}
        />

        {/* ── Layer 3: Static aurora blobs (large, blurred) ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left primary blob */}
          <div
            className="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full blur-[100px] animate-float"
            style={{
              background: `rgba(${theme === 'cream' ? '15,155,110' : theme === 'dim' ? '29,208,167' : theme === 'graphite' ? '14,165,233' : '57,241,218'},0.10)`,
              animationDuration: '14s',
            }}
          />
          {/* Bottom-right secondary blob */}
          <div
            className="absolute -bottom-24 -right-24 w-[700px] h-[700px] rounded-full blur-[120px] animate-float"
            style={{
              background: `rgba(${theme === 'cream' ? '5,100,50' : theme === 'dim' ? '15,100,80' : theme === 'graphite' ? '56,100,200' : '100,80,230'},0.08)`,
              animationDuration: '18s',
              animationDelay: '2s',
            }}
          />
          {/* Center accent blob */}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(250,249,245,0.4)'})`,
          }}
        />

        <LeftIcons theme={theme} showIcons={showLeftIcons} />

        {/* ─── Editorial Split Layout ─── */}
        <div className="flex-1 flex items-center justify-between gap-16 relative z-10 max-lg:flex-col max-lg:text-center max-lg:gap-12 w-full">

          {/* LEFT: Typography */}
          <div className="flex-1 space-y-6 max-lg:flex max-lg:flex-col max-lg:items-center">

            <div className={`transition-all duration-700 ease-out ${showText1 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
              <p
                className={`text-base font-['JetBrains_Mono'] font-normal tracking-widest uppercase ${
                  isDarkMode ? 'text-highlight' : 'text-[#0F9B6E]'
                }`}
              >
                Welcome, I'm
              </p>
            </div>

            <h1
              className={`text-[5.5rem] font-['Syne'] font-bold leading-[0.95] ${
                isDarkMode ? 'text-name-text' : 'text-light-name-text'
              } max-xl:text-[4rem] max-md:text-[3rem] max-sm:text-[2.5rem] transition-all duration-700 ease-out ${
                showText2 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
              }`}
              data-parallax="slow"
              data-parallax-speed="0.3"
            >
              Jay Lao<span className="relative inline-block text-highlight animate-pulse">.</span>
            </h1>

            <h2
              className={`text-[2rem] font-['Syne'] font-semibold ${
                isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'
              } leading-tight max-xl:text-[1.75rem] max-md:text-[1.5rem] max-sm:text-[1.25rem] transition-all duration-700 ease-out ${
                showText3 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
              }`}
              data-parallax="slow"
              data-parallax-speed="0.2"
            >
              Computer Science Student.
            </h2>

            {/* CTA + mobile socials */}
            <div
              className={`pt-4 transition-all duration-700 ease-out ${
                showText4 ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
              }`}
            >
              {/* Premium shimmer CTA button */}
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className={`hero-cta group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-['JetBrains_Mono'] text-sm tracking-wider overflow-hidden transition-all duration-500 border-2 ${
                  isDarkMode
                    ? 'text-highlight border-highlight/50 hover:text-dark-bg'
                    : 'text-[#0F9B6E] border-[#0F9B6E]/30 hover:text-white'
                } hover:scale-105 hover:shadow-lg ${isDarkMode ? 'hover:shadow-highlight/30' : 'hover:shadow-[#0F9B6E]/20'}`}
                style={{
                  background: 'transparent',
                }}
              >
                {/* Hover fill layer */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accent }}
                />
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)`,
                    backgroundSize: '250% 100%',
                    animation: 'hero-shimmer 1.4s ease infinite',
                  }}
                />
                <span className="relative z-10">Explore My Work</span>
                <svg className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* Social Icons — mobile only */}
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

          {/* RIGHT: Terminal / Code Card + Chatbot button */}
          <div
            className={`relative flex flex-col items-end gap-8 transition-all duration-700 ease-out max-lg:items-center ${
              showText4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Floating Terminal Card */}
            <div
              className={`relative w-[420px] max-md:w-full rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl max-lg:w-[380px] ${
                isDarkMode
                  ? 'bg-[#0d1829]/90 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
                  : 'bg-white/80 border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl'
              }`}
              style={{
                boxShadow: isDarkMode
                  ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)`
                  : `0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)`,
              }}
            >
              {/* Terminal title bar */}
              <div
                className={`flex items-center gap-2 px-4 py-3 border-b ${
                  isDarkMode ? 'bg-white/[0.04] border-white/[0.07]' : 'bg-slate-50 border-slate-200/70'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-90" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-90" />
                <span className="w-3 h-3 rounded-full bg-[#28C840] opacity-90" />
                <span
                  className={`ml-3 font-['JetBrains_Mono'] text-[11px] tracking-widest ${
                    isDarkMode ? 'text-white/30' : 'text-slate-400'
                  }`}
                >
                  jay.config.ts
                </span>
              </div>

              {/* Code content */}
              <div className="p-5 font-['JetBrains_Mono'] text-[13px] leading-relaxed">
                <div className="space-y-1">
                  <div>
                    <span style={{ color: isDarkMode ? '#7C8CB8' : '#94a3b8' }}>{'// CS internship candidate'}</span>
                  </div>
                  <div className="mt-2">
                    <span style={{ color: accent }}>const</span>
                    <span className={isDarkMode ? ' text-white' : ' text-slate-700'}> jay </span>
                    <span style={{ color: isDarkMode ? '#7C8CB8' : '#94a3b8' }}>=</span>
                    <span className={isDarkMode ? ' text-white' : ' text-slate-700'}> {'{'}</span>
                  </div>
                  <div className="pl-5">
                    <span style={{ color: isDarkMode ? '#9EC8F5' : '#3b82f6' }}>role</span>
                    <span className={isDarkMode ? ' text-white/60' : ' text-slate-400'}>: </span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"CS Student"</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>,</span>
                  </div>
                  <div className="pl-5">
                    <span style={{ color: isDarkMode ? '#9EC8F5' : '#3b82f6' }}>focus</span>
                    <span className={isDarkMode ? ' text-white/60' : ' text-slate-400'}>: </span>
                    <span className={isDarkMode ? ' text-white/80' : ' text-slate-600'}>{'['}</span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"ML"</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>, </span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"Cybersecurity"</span>
                    <span className={isDarkMode ? ' text-white/80' : ' text-slate-600'}>{']'}</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>,</span>
                  </div>
                  <div className="pl-5">
                    <span style={{ color: isDarkMode ? '#9EC8F5' : '#3b82f6' }}>openTo</span>
                    <span className={isDarkMode ? ' text-white/60' : ' text-slate-400'}>: </span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"2026 Internships"</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>,</span>
                  </div>
                  <div className="pl-5">
                    <span style={{ color: isDarkMode ? '#9EC8F5' : '#3b82f6' }}>stack</span>
                    <span className={isDarkMode ? ' text-white/60' : ' text-slate-400'}>: </span>
                    <span className={isDarkMode ? ' text-white/80' : ' text-slate-600'}>{'['}</span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"Python"</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>, </span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"React"</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>, </span>
                    <span style={{ color: isDarkMode ? '#F1C27D' : '#f59e0b' }}>"Java"</span>
                    <span className={isDarkMode ? ' text-white/80' : ' text-slate-600'}>{']'}</span>
                    <span className={isDarkMode ? ' text-white/50' : ' text-slate-400'}>,</span>
                  </div>
                  <div>
                    <span className={isDarkMode ? ' text-white' : ' text-slate-700'}>{'}'}</span>
                    <span style={{ color: accent }}> ✓</span>
                  </div>
                  {/* blinking cursor */}
                  <div className="mt-2 flex items-center gap-1">
                    <span className={isDarkMode ? 'text-white/30' : 'text-slate-300'}>$</span>
                    <span
                      className="inline-block w-2 h-4 ml-1 rounded-sm animate-pulse"
                      style={{ background: accent, opacity: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              {/* Subtle accent glow at card bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
              />
            </div>

            {/* Chatbot button — below the card, desktop only */}
            <div className="max-sm:hidden">
              <button
                onClick={onChatOpen}
                className={`rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:scale-110 focus:outline-none ${getGlowClass()}`}
                style={{ background: 'transparent', padding: 0 }}
                aria-label="Chatbot"
              >
                <MessageIcon className={`${getIconColorClass()} drop-shadow-lg`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes hero-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .hero-cta span[style*="hero-shimmer"] {
          background-size: 250% 100%;
        }
      `}</style>
    </>
  )
}
