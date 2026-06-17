import React, { useState, useRef, useEffect } from 'react'

export interface Certification {
  id: number
  title: string
  issuer: string
  issuerShort: string
  date: string
  skills: string[]
  link?: string
  image?: string
  accentColor: string
  accentRgb: string
  isOrganization?: boolean
}

const certificationsData: Certification[] = [
  {
    id: 1,
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM via Coursera',
    issuerShort: 'IBM',
    date: 'Dec 2026',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Science', 'AI'],
    link: 'https://coursera.org/share/4ca2be4346798683c15b578b01098d35',
    image: '/Certif/Coursera_Python.png',
    accentColor: '#3B82F6',
    accentRgb: '59,130,246',
  },
  {
    id: 2,
    title: 'AI for Cybersecurity Specialization',
    issuer: 'Johns Hopkins via Coursera',
    issuerShort: 'JHU',
    date: 'Nov 2026',
    skills: ['Machine Learning', 'Threat Detection', 'AI', 'Network Security'],
    link: 'https://coursera.org/share/e820a6a12b0c2f8dcfc1a9543e63d69c',
    image: '/Certif/Coursera_Cybersecurity.png',
    accentColor: '#8B5CF6',
    accentRgb: '139,92,246',
  },
  {
    id: 3,
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    issuerShort: 'GH',
    date: '2024',
    skills: ['Git', 'Version Control', 'Collaboration', 'CI/CD'],
    link: 'https://www.credly.com/badges/bb0b0dae-8941-4d38-b0e7-6d12720ebae0/linked_in_profile',
    image: '/Certif/Github_Foundations.png',
    accentColor: '#F97316',
    accentRgb: '249,115,22',
  },
  {
    id: 4,
    title: 'IT Specialist — Databases',
    issuer: 'Certiport / Pearson VUE',
    issuerShort: 'ITS',
    date: '2025',
    skills: ['SQL', 'MySQL', 'Database Design', 'Normalization'],
    link: 'https://www.credly.com/badges/8145dc78-e468-43fc-928e-45739b5aae10/linked_in_profile',
    image: '/Certif/IT_Databases.png',
    accentColor: '#10B981',
    accentRgb: '16,185,129',
  },
  {
    id: 5,
    title: 'IT Specialist — Cybersecurity',
    issuer: 'Certiport / Pearson VUE',
    issuerShort: 'ITS',
    date: '2026',
    skills: ['Threat Analysis', 'Security Protocols', 'Risk Management'],
    link: 'https://www.credly.com/badges/e2953d85-02f7-4122-9398-b0c141f555f9/public_url',
    image: '/Certif/ITS-Badges-Cybersecurity.png',
    accentColor: '#EF4444',
    accentRgb: '239,68,68',
  },
  {
    id: 6,
    title: 'IT Specialist — Network Security',
    issuer: 'Certiport / Pearson VUE',
    issuerShort: 'ITS',
    date: '2026',
    skills: ['Network Security', 'Device Security', 'OS Hardening'],
    link: 'https://www.credly.com/badges/c0f4ab05-00e1-493d-af13-25af575e112a/public_url',
    image: '/Certif/ITS-Badges_Network-Security.png',
    accentColor: '#F59E0B',
    accentRgb: '245,158,11',
  },
  {
    id: 7,
    title: 'Google I/O Extended 2024 Certificate',
    issuer: 'Google Developer Groups',
    issuerShort: 'GDG',
    date: '2024',
    skills: ['Google APIs', 'Android SDK', 'Gemini AI', 'Cloud Computing', 'Web Tech'],
    link: 'https://io.google/2024/',
    image: '/Certif/Google_IO_2024.png',
    accentColor: '#4285F4',
    accentRgb: '66,133,244',
    isOrganization: true,
  },
  {
    id: 8,
    title: 'Google I/O Extended 2026 Certificate',
    issuer: 'Google Developer Groups',
    issuerShort: 'GDG',
    date: '2026',
    skills: ['Google APIs', 'Android SDK', 'Gemini AI', 'Cloud Computing', 'Web Tech'],
    link: 'https://apohub.gdgdavao.org/feedback/mXV9USdyKntxVzI9bhnt?token=WYv8BTn9FwzAUS0mtbVNUOLp7T2Y0gvuzproGEux-nk',
    image: '/Certif/Google_IO_2026.png',
    accentColor: '#4285F4',
    accentRgb: '66,133,244',
    isOrganization: true,
  },
]

/* ─── Hero Card (large, left column) ─── */
function HeroCard({ cert, isDarkMode }: { cert: Certification; isDarkMode: boolean }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -10, y: cx * 10 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <a
      ref={cardRef}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-3xl flex flex-col cursor-pointer block"
      style={{
        background: isDarkMode
          ? `linear-gradient(145deg, rgba(${cert.accentRgb},0.08) 0%, rgba(255,255,255,0.03) 100%)`
          : `linear-gradient(145deg, rgba(${cert.accentRgb},0.06) 0%, rgba(255,255,255,0.9) 100%)`,
        border: `1px solid rgba(${cert.accentRgb},${hovered ? '0.45' : '0.18'})`,
        boxShadow: hovered
          ? `0 30px 80px rgba(${cert.accentRgb},0.25), 0 0 0 1px rgba(${cert.accentRgb},0.2) inset`
          : isDarkMode
            ? '0 4px 24px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(0,0,0,0.08)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.015 : 1})`,
        transition: 'transform 0.15s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        backdropFilter: 'blur(16px)',
        animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        opacity: 0,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${cert.accentColor}, transparent)`, opacity: hovered ? 1 : 0.5 }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Radial spotlight on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, rgba(${cert.accentRgb},0.15), transparent 65%)`,
          opacity: hovered ? 1 : 0
        }}
      />

      <div className="relative z-10 p-8 flex flex-col h-full min-h-[360px]">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Issuer badge */}
            <span
              className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full font-bold inline-block"
              style={{ background: `rgba(${cert.accentRgb},0.15)`, color: cert.accentColor }}
            >
              {cert.issuer}
            </span>
            {cert.isOrganization && (
              <span className="text-[9px] font-['JetBrains_Mono'] px-2.5 py-1 rounded bg-[#4285F4]/15 text-[#4285F4] font-bold uppercase tracking-wider border border-[#4285F4]/30">
                Organization Certification
              </span>
            )}
          </div>

          {/* External link icon */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `rgba(${cert.accentRgb},${hovered ? '0.2' : '0.08'})`,
              transform: hovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cert.accentColor} strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* Certificate image — centered, large */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div
            className="relative w-48 h-40 transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)' }}
          >
            {cert.image && (
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-contain drop-shadow-xl"
                style={{ filter: hovered ? `drop-shadow(0 12px 32px rgba(${cert.accentRgb},0.5))` : `drop-shadow(0 4px 16px rgba(${cert.accentRgb},0.2))` }}
              />
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-['Syne'] text-2xl font-extrabold leading-snug mb-2 transition-colors duration-300"
          style={{ color: hovered ? cert.accentColor : isDarkMode ? '#CCD6F6' : '#1E293B' }}
        >
          {cert.title}
        </h3>

        {/* Date */}
        <p
          className="font-['JetBrains_Mono'] text-xs mb-5 opacity-50"
          style={{ color: isDarkMode ? '#fff' : '#000' }}
        >
          Issued {cert.date}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {cert.skills.map(s => (
            <span
              key={s}
              className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-300"
              style={{
                background: hovered ? `rgba(${cert.accentRgb},0.14)` : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: hovered ? cert.accentColor : isDarkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)',
                border: `1px solid ${hovered ? `rgba(${cert.accentRgb},0.3)` : 'rgba(128,128,128,0.15)'}`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

/* ─── Compact Bento Card ─── */
function BentoCard({ cert, isDarkMode, delay }: { cert: Certification; isDarkMode: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl flex flex-col cursor-pointer block"
      style={{
        background: isDarkMode
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.85)',
        border: `1px solid ${hovered ? `rgba(${cert.accentRgb},0.4)` : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: hovered
          ? `0 16px 48px rgba(${cert.accentRgb},0.18)`
          : isDarkMode ? '0 2px 12px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        backdropFilter: 'blur(12px)',
        animation: `fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-500"
        style={{
          background: cert.accentColor,
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0.6)',
        }}
      />

      {/* Hover spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 0% 50%, rgba(${cert.accentRgb},0.1), transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 p-5 pl-7 flex gap-4 items-start">
        {/* Image */}
        <div
          className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-400"
          style={{
            background: `rgba(${cert.accentRgb},0.1)`,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            boxShadow: hovered ? `0 6px 20px rgba(${cert.accentRgb},0.3)` : 'none',
          }}
        >
          {cert.image
            ? <img src={cert.image} alt={cert.title} className="w-full h-full object-contain p-1.5" />
            : <span className="text-2xl">🏅</span>
          }
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-['Syne'] text-sm font-bold leading-snug transition-colors duration-300 line-clamp-2"
              style={{ color: hovered ? cert.accentColor : isDarkMode ? '#CCD6F6' : '#1E293B' }}
            >
              {cert.title}
            </h3>
            {/* Arrow */}
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke={cert.accentColor} strokeWidth="2.5"
              className="flex-shrink-0 mt-0.5 transition-transform duration-300"
              style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translate(0,0)' : 'translate(-4px,4px)' }}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <p className="font-['DM_Sans'] text-xs font-semibold" style={{ color: cert.accentColor }}>
              {cert.issuer}
            </p>
            {cert.isOrganization && (
              <span className="text-[9px] font-['JetBrains_Mono'] px-1.5 py-0.5 rounded bg-[#4285F4]/10 text-[#4285F4] font-bold uppercase tracking-wider border border-[#4285F4]/20">
                Organization Certification
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 2).map(s => (
              <span
                key={s}
                className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full transition-all duration-300"
                style={{
                  background: hovered ? `rgba(${cert.accentRgb},0.12)` : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  color: hovered ? cert.accentColor : isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
                  border: `1px solid ${hovered ? `rgba(${cert.accentRgb},0.25)` : 'rgba(128,128,128,0.12)'}`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

/* ─── Main Section ─── */
export const Certifications: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ isDarkMode, theme }) => {

  const accentColor = () => {
    switch (theme) {
      case 'cream':    return '#0F9B6E'
      case 'dim':      return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      default:         return '#39F1DA'
    }
  }

  const accentRgb = () => {
    switch (theme) {
      case 'cream':    return '15,155,110'
      case 'dim':      return '29,208,167'
      case 'graphite': return '14,165,233'
      default:         return '57,241,218'
    }
  }

  /* Animated counter hook */
  const useCounter = (target: number, duration = 1600) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, { threshold: 0.5 })
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }, [target, duration])
    return { count, ref }
  }

  const heroCards = certificationsData.slice(0, 2)
  const bentoCards = certificationsData.slice(2)

  const stat1 = useCounter(certificationsData.length)
  const stat2 = useCounter(new Set(certificationsData.map(c => c.issuerShort)).size)
  const stat3 = useCounter(2026, 2000)

  return (
    <section
      id="certifications"
      data-scroll
      data-scroll-reveal
      className="section-certifications pt-28 px-[10%] pb-24 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-20 max-md:px-[5%] max-md:pb-16 relative"
    >
      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full blur-[120px] animate-float"
          style={{ background: `rgba(${accentRgb()},0.06)`, animationDuration: '18s' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-float"
          style={{ background: `rgba(${accentRgb()},0.04)`, animationDuration: '22s', animationDelay: '3s' }} />
      </div>

      {/* ── Connecting line from above ── */}
      <div className="absolute left-[10%] top-[-8rem] w-[2px] h-32 max-md:hidden z-0"
        style={{ backgroundImage: `linear-gradient(to top, ${accentColor()}80, transparent)` }} />

      {/* ── Section Header ── */}
      <div className="relative z-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] rounded-full" style={{ background: accentColor() }} />
              <span
                className="font-['JetBrains_Mono'] text-[11px] tracking-[0.3em] uppercase font-bold"
                style={{ color: accentColor() }}
              >
                Credentials
              </span>
            </div>
            <h2
              className={`font-['Syne'] font-extrabold leading-[0.95] tracking-tight text-[4.5rem] max-md:text-[3rem] ${isDarkMode ? 'text-[#CCD6F6]' : 'text-[#1E293B]'}`}
            >
              My<br />
              <span
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentColor()} 0%, #8892B0 120%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Certifications
              </span>
            </h2>
          </div>
          <p className={`font-['DM_Sans'] text-base leading-relaxed max-w-xs md:text-right mb-1 ${isDarkMode ? 'text-[#8892B0]' : 'text-slate-500'}`}>
            Validated credentials across AI, cybersecurity, and computer science fundamentals.
          </p>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Hero left — spans 2 cols */}
        <div className="lg:col-span-2">
          <HeroCard cert={heroCards[0]} isDarkMode={isDarkMode} />
        </div>

        {/* Right column — hero card on top, 2 bentos stacked below */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <HeroCard cert={heroCards[1]} isDarkMode={isDarkMode} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bentoCards.slice(0, 2).map((cert, i) => (
              <BentoCard key={cert.id} cert={cert} isDarkMode={isDarkMode} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* Bottom full-width row — remaining bento cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {bentoCards.slice(2).map((cert, i) => (
            <BentoCard key={cert.id} cert={cert} isDarkMode={isDarkMode} delay={0.5 + i * 0.1} />
          ))}
        </div>
      </div>

      {/* ── Metrics ribbon ── */}
      <div
        className="relative z-10 mt-12 rounded-3xl overflow-hidden"
        style={{
          background: isDarkMode ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.7)',
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Accent top strip */}
        <div className="h-[2px] w-full"
          style={{ backgroundImage: `linear-gradient(90deg, transparent, ${accentColor()}, transparent)` }}
        />
        <div ref={stat1.ref} className="grid grid-cols-3 divide-x"
          style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          {[
            { count: stat1.count, suffix: '', label: 'Certifications Earned' },
            { count: stat2.count, suffix: '+', label: 'Issuing Organizations' },
            { count: stat3.count, suffix: '', label: 'Latest Issued' },
          ].map(({ count, suffix, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-4 gap-1">
              <span
                className="font-['Syne'] text-5xl font-extrabold max-md:text-4xl tabular-nums"
                style={{ color: accentColor() }}
              >
                {count}{suffix}
              </span>
              <span className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/35' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Connecting line to next section */}
      <div className="absolute right-[10%] bottom-[-5rem] w-[2px] h-32 max-md:hidden z-0"
        style={{ backgroundImage: `linear-gradient(to bottom, ${accentColor()}80, transparent)` }} />
    </section>
  )
}
