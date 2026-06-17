import React, { useState } from 'react'
import { ProfileImage } from '../../ui/ProfileImage'

export const AboutMe: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ isDarkMode, theme }) => {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false)
  const getAccent = () => {
    switch (theme) {
      case 'cream': return '#0F9B6E'
      case 'dim': return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      default: return '#39F1DA'
    }
  }

  const accent = getAccent()

  const techCategories = [
    {
      category: 'Languages',
      icon: '{ }',
      borderColor: isDarkMode ? '#39F1DA' : '#0F9B6E',
      items: ['Python', 'Java', 'C++', 'PHP', 'JavaScript', 'HTML / CSS'],
    },
    {
      category: 'Frameworks & Libraries',
      icon: '⚡',
      borderColor: isDarkMode ? '#1DD0A7' : '#059669',
      items: ['React', 'Next.js', 'Laravel', 'Tailwind CSS', 'Bootstrap', 'Scikit-learn', 'JavaFX', 'Streamlit'],
    },
    {
      category: 'Databases & Tools',
      icon: '🗄',
      borderColor: isDarkMode ? '#0ea5e9' : '#0284c7',
      items: ['MySQL', 'Jupyter Notebook', 'Vite'],
    },
  ]

  return (
    <section
      id="about"
      data-scroll
      data-scroll-reveal
      className="section-about min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative"
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow orb */}
        <div
          className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl animate-float ${
            isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'
          }`}
          data-parallax="slow"
          data-parallax-speed="1.5"
        />
        {/* Second glow */}
        <div
          className={`absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full blur-3xl animate-float ${
            isDarkMode ? 'bg-highlight/3' : 'bg-[#0ea5e9]/3'
          }`}
          style={{ animationDelay: '3s' }}
        />
        {/* Subtle connecting line (desktop) */}
        <div
          className={`absolute left-[50%] top-32 w-[1px] h-[80%] max-md:hidden ${
            isDarkMode
              ? 'bg-gradient-to-b from-transparent via-white/[0.06] to-transparent'
              : 'bg-gradient-to-b from-transparent via-slate-300/30 to-transparent'
          }`}
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-20 items-start max-md:grid-cols-1 max-md:gap-12 relative z-10 max-xl:gap-12">

        {/* ── LEFT COLUMN ── */}
        <div className="space-y-6 scroll-animate-subtle" data-parallax="slide-left" data-parallax-speed="0.8" data-parallax-delay="0.1">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-[1.5px] rounded-full" style={{ background: accent }} />
            <span
              className="font-['JetBrains_Mono'] text-[11px] tracking-[0.25em] uppercase font-medium"
              style={{ color: accent }}
            >
              About
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-['Syne'] text-[3.25rem] font-bold leading-tight max-md:text-[2.5rem] ${
              isDarkMode ? 'text-name-text' : 'text-light-name-text'
            }`}
          >
            About Me
            <span className="inline-block ml-1 translate-y-[-4px]" style={{ color: accent }}>.</span>
          </h2>

          {/* Profile image */}
          <div className="relative">
            {/* Decorative border rings */}
            <div
              className="absolute -inset-4 rounded-2xl -z-10 border"
              style={{ borderColor: `${accent}20` }}
            />
            <div
              className="absolute -inset-8 rounded-2xl -z-20 border"
              style={{ borderColor: `${accent}0D` }}
            />
            <div className="flex flex-col items-center text-center">
              <ProfileImage isDarkMode={isDarkMode} theme={theme} onHoverChange={setIsPhotoHovered} />
            </div>
          </div>

          {/* Bio paragraphs */}
          <div className={`space-y-4 text-[1.0625rem] font-['DM_Sans'] leading-relaxed ${isDarkMode ? 'text-body-text/90' : 'text-light-body-text/90'}`}>
            <p>
              Hi, I'm{' '}
              <span className="font-bold" style={{ color: accent }}>Jay Lao</span>
              , a passionate Computer Science student focused on building practical, high-impact solutions. I have a strong interest in{' '}
              <span className="font-semibold" style={{ color: accent }}>Machine Learning</span>{' '}
              and{' '}
              <span className="font-semibold" style={{ color: accent }}>Cybersecurity</span>
              —two fields I see as the backbone of modern digital systems.
            </p>
            <p>
              I enjoy designing systems that are efficient, scalable, and user-focused, continuously growing through hands-on projects and collaborative environments. I'm always looking for ways to bridge the gap between theory and real-world application.
            </p>
          </div>

          {/* Currently seeking badge */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span
              className={`text-[11px] font-['JetBrains_Mono'] tracking-wider uppercase ${
                isDarkMode ? 'text-white/40' : 'text-light-body-text/50'
              }`}
            >
              Currently seeking:
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-['JetBrains_Mono'] font-semibold border transition-all duration-300 hover:scale-105"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                background: `${accent}12`,
                boxShadow: `0 0 12px ${accent}20`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                style={{ background: accent }}
              />
              2026 CS Internships
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-6 scroll-animate relative min-h-[420px]" data-parallax="slide-right" data-parallax-speed="0.8" data-parallax-delay="0.15">
          
          {/* Transition wrapper for default "Tools I Build With" & Focus cards */}
          <div 
            className="transition-all duration-500 ease-in-out space-y-6"
            style={{
              opacity: isPhotoHovered ? 0 : 1,
              transform: isPhotoHovered ? 'translate3d(0, -15px, 0) scale(0.97)' : 'translate3d(0, 0, 0)',
              pointerEvents: isPhotoHovered ? 'none' : 'auto',
              position: isPhotoHovered ? 'absolute' : 'relative',
              visibility: isPhotoHovered ? 'hidden' : 'visible',
              width: '100%'
            }}
          >
            {/* Tools heading */}
            <h3
              className={`font-['Syne'] text-[1.375rem] font-bold ${
                isDarkMode ? 'text-white' : 'text-light-name-text'
              }`}
            >
              Tools I build with:
            </h3>

            {/* Tech category cards */}
            <div className="space-y-3">
              {techCategories.map(({ category, icon, borderColor, items }) => (
                <div
                  key={category}
                  className={`relative pl-5 pr-5 py-4 rounded-xl border-l-[3px] border transition-all duration-300 group ${
                    isDarkMode
                      ? 'bg-white/[0.03] border-t-white/[0.06] border-r-white/[0.06] border-b-white/[0.06] hover:bg-white/[0.055] hover:shadow-lg'
                      : 'bg-white border-t-slate-200/80 border-r-slate-200/80 border-b-slate-200/80 shadow-sm hover:shadow-md hover:bg-slate-50/50'
                  }`}
                  style={{ borderLeftColor: borderColor }}
                >
                  {/* Subtle hover glow on card */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 20px ${borderColor}08`,
                    }}
                  />

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-['JetBrains_Mono'] text-xs font-bold"
                      style={{ color: borderColor }}
                    >
                      {icon}
                    </span>
                    <span
                      className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] font-medium ${
                        isDarkMode ? 'text-white/50' : 'text-light-body-text/60'
                      }`}
                    >
                      {category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-md text-[12px] font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 cursor-default ${
                          isDarkMode
                            ? 'bg-highlight/5 border-highlight/15 text-body-text/70 hover:bg-highlight/15 hover:text-highlight hover:border-highlight/40'
                            : 'bg-white border-slate-200 text-light-body-text hover:bg-[#0F9B6E]/10 hover:text-[#0F9B6E] hover:border-[#0F9B6E]/40'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="space-y-4">
              <h3
                className={`font-['Syne'] text-[1.0625rem] font-semibold ${
                  isDarkMode ? 'text-white/80' : 'text-light-name-text/80'
                }`}
              >
                Here's what I'm working on lately:
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Machine Learning', 'Cybersecurity', 'Computer Science'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-[13px] font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      color: accent,
                      borderColor: `${accent}40`,
                      background: `${accent}10`,
                      boxShadow: `0 0 14px ${accent}18`,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accent}35`
                      ;(e.currentTarget as HTMLElement).style.background = `${accent}1E`
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${accent}18`
                      ;(e.currentTarget as HTMLElement).style.background = `${accent}10`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Background Card */}
            <div
              className={`relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 group hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/[0.08] hover:border-highlight/25 hover:shadow-lg hover:shadow-black/20'
                  : 'bg-white border-slate-200/80 shadow-sm hover:border-[#0F9B6E]/30 hover:shadow-md'
              }`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] opacity-60"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />

              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  🎓
                </div>
                <div>
                  <h4
                    className={`font-['Syne'] text-[1.0625rem] font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-light-name-text'
                    }`}
                  >
                    Academic Background
                  </h4>
                  <p
                    className={`font-['DM_Sans'] text-sm leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-light-body-text/80'
                    }`}
                  >
                    Dedicated to continuous learning, I balance coursework in advanced data structures and algorithms with hands-on development in personal and collaborative projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Google I/O Extended Certificate Card */}
            <div
              className={`relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 group hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/[0.08] hover:border-white/20 hover:shadow-lg hover:shadow-black/20'
                  : 'bg-white border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Google Brand colored accent bar on top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
                style={{ background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 100%)' }}
              />

              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <img src="/Certif/Google_IO_2024.png" alt="Google I/O Extended" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h4
                      className={`font-['Syne'] text-[1.0625rem] font-bold ${
                        isDarkMode ? 'text-white' : 'text-light-name-text'
                      }`}
                    >
                      Google I/O Extended
                    </h4>
                    <span 
                      className="text-[9px] font-['JetBrains_Mono'] px-2 py-0.5 rounded font-bold uppercase tracking-wider border"
                      style={{
                        color: isDarkMode ? '#39F1DA' : '#0F9B6E',
                        borderColor: isDarkMode ? 'rgba(57, 241, 218, 0.3)' : 'rgba(15, 155, 110, 0.3)',
                        background: isDarkMode ? 'rgba(57, 241, 218, 0.06)' : 'rgba(15, 155, 110, 0.06)'
                      }}
                    >
                      Certificate
                    </span>
                  </div>
                  <p
                    className={`font-['DM_Sans'] text-sm leading-relaxed ${
                      isDarkMode ? 'text-gray-400' : 'text-light-body-text/80'
                    }`}
                  >
                    Awarded certificate from Google I/O Extended, recognizing engagement with Google developer ecosystem, Android SDK, and Google AI integration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transition wrapper for "More About Me" Solid Card (Replaces Tools on hover) */}
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{
              opacity: isPhotoHovered ? 1 : 0,
              transform: isPhotoHovered ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 15px, 0) scale(0.97)',
              pointerEvents: isPhotoHovered ? 'auto' : 'none',
              position: isPhotoHovered ? 'relative' : 'absolute',
              visibility: isPhotoHovered ? 'visible' : 'hidden',
              width: '100%',
              top: 0
            }}
          >
            {/* More About Me heading */}
            <h3 className={`font-['Syne'] text-[1.375rem] font-bold ${isDarkMode ? 'text-white' : 'text-light-name-text'}`}>
              More About Me:
            </h3>

            {/* Solid Card Details */}
            <div 
              className={`rounded-2xl p-6 border relative overflow-hidden transition-all duration-300 ${
                theme === 'cream'
                  ? 'bg-[#FFFFFF] border-slate-300 text-slate-800 shadow-xl'
                  : theme === 'dim'
                  ? 'bg-[#15202B] border-white/15 text-white shadow-2xl shadow-black/80'
                  : theme === 'graphite'
                  ? 'bg-[#121620] border-white/15 text-white shadow-2xl shadow-black/80'
                  : 'bg-[#0a192f] border-white/15 text-white shadow-2xl shadow-black/80'
              }`}
            >
              {/* Opaque detailed background graphics */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle, ${theme === 'cream' ? 'black' : 'white'} 1.5px, transparent 1.5px)`,
                  backgroundSize: '18px 18px',
                }}
              />
              <div 
                className="absolute -right-16 -top-16 w-32 h-32 rounded-full pointer-events-none blur-2xl opacity-20"
                style={{
                  background: accent
                }}
              />

              {/* Card content */}
              <div className="relative z-10 flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between border-b pb-3.5" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                  <span className="font-['Syne'] font-bold text-sm tracking-wide uppercase">Profile Overview</span>
                  <span className="font-['JetBrains_Mono'] text-[10px] uppercase px-2.5 py-0.5 rounded font-semibold" style={{ backgroundColor: `${accent}22`, color: accent }}>CS_PROFILE</span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm font-['DM_Sans']">
                  <div>
                    <p className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Specialization</p>
                    <p className="font-semibold text-base" style={{ color: theme === 'cream' ? '#1e293b' : '#f8fafc' }}>ML & Security</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Focus</p>
                    <p className="font-semibold text-base" style={{ color: theme === 'cream' ? '#1e293b' : '#f8fafc' }}>Systems & Web</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Open To</p>
                    <p className="font-semibold text-base" style={{ color: theme === 'cream' ? '#1e293b' : '#f8fafc' }}>2026 Internships</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Interests</p>
                    <p className="font-semibold text-base" style={{ color: theme === 'cream' ? '#1e293b' : '#f8fafc' }}>Algorithmic Dev</p>
                  </div>
                  
                  {/* Google I/O Extended Certificate Detail */}
                  <div className="col-span-2 border-t pt-4" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                    <p className={`text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5 ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Organization Certification</p>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm bg-white/5 border border-white/10" style={{ backgroundColor: theme === 'cream' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)', borderColor: theme === 'cream' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                        <img src="/Certif/Google_IO_2024.png" alt="Google I/O" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-[14px]" style={{ color: theme === 'cream' ? '#0F9B6E' : '#39F1DA' }}>Google I/O Extended Certificate</p>
                        <p className={`text-xs ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>Issued by Google Developer Groups (2024)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs italic opacity-95 font-['DM_Sans'] leading-relaxed border-t pt-4" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', color: theme === 'cream' ? '#475569' : '#94a3b8' }}>
                  "Passionate about exploring artificial intelligence, writing secure optimization-focused code, and building systems that scale."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
