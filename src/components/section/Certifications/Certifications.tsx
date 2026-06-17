import React from 'react'

export interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  skills: string[]
  link?: string
  image?: string
}

const certificationsData: Certification[] = [
  {
    id: 1,
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    date: '2025',
    skills: ['Python', 'Data Science', 'AI', 'Development'],
    link: 'https://coursera.org/share/4ca2be4346798683c15b578b01098d35',
    image: '/Certif/Coursera_Python.png'
  },
  {
    id: 2,
    title: 'AI for Cybersecurity Specialization',
    issuer: 'Johns Hopkins University',
    date: '2025',
    skills: ['AI', 'Cybersecurity', 'Machine Learning', 'Network Security'],
    link: 'https://coursera.org/share/e820a6a12b0c2f8dcfc1a9543e63d69c',
    image: '/Certif/Coursera_Cybersecurity.png'
  },
  {
    id: 3,
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: '2024',
    skills: ['Git', 'GitHub', 'Version Control', 'Project Management'],
    link: 'https://www.credly.com/badges/bb0b0dae-8941-4d38-b0e7-6d12720ebae0/linked_in_profile',
    image: '/Certif/Github_Foundations.png'
  },
  {
    id: 4,
    title: 'IT Specialist - Databases',
    issuer: 'Certiport (Pearson VUE)',
    date: '2025',
    skills: ['Database Design', 'SQL', 'MySQL', 'Relational Databases'],
    link: 'https://www.credly.com/badges/8145dc78-e468-43fc-928e-45739b5aae10/linked_in_profile',
    image: '/Certif/IT_Databases.png'
  },
  {
    id: 5,
    title: 'IT Specialist - Cybersecurity',
    issuer: 'Certiport (Pearson VUE)',
    date: '2026',
    skills: ['Cybersecurity', 'Threat Analysis', 'Security Protocols'],
    link: 'https://www.credly.com/badges/e2953d85-02f7-4122-9398-b0c141f555f9/public_url',
    image: '/Certif/ITS-Badges-Cybersecurity.png'
  },
  {
    id: 6,
    title: 'IT Specialist - Network Security',
    issuer: 'Certiport (Pearson VUE)',
    date: '2026',
    skills: ['Network Security', 'Device Security', 'OS Security'],
    link: 'https://www.credly.com/badges/c0f4ab05-00e1-493d-af13-25af575e112a/public_url',
    image: '/Certif/ITS-Badges_Network-Security.png'
  }
]

export const Certifications: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ isDarkMode, theme }) => {
  const getCardBorderHoverClass = () => {
    switch (theme) {
      case 'cream': return 'hover:border-[#0F9B6E]/40'
      case 'dim': return 'hover:border-[#1DD0A7]/30'
      case 'graphite': return 'hover:border-[#0ea5e9]/30'
      default: return 'hover:border-highlight/30'
    }
  }

  const getCardShadowHoverClass = () => {
    switch (theme) {
      case 'cream': return 'hover:shadow-[#0F9B6E]/10 hover:shadow-xl'
      case 'dim': return 'hover:shadow-[#1DD0A7]/10 hover:shadow-2xl'
      case 'graphite': return 'hover:shadow-[#0ea5e9]/10 hover:shadow-2xl'
      default: return 'hover:shadow-highlight/10 hover:shadow-2xl'
    }
  }

  const getGlowGradClass = () => {
    switch (theme) {
      case 'cream': return 'bg-[radial-gradient(circle_at_center,rgba(15,155,110,0.08),transparent_70%)]'
      case 'dim': return 'bg-[radial-gradient(circle_at_center,rgba(29,208,167,0.1),transparent_70%)]'
      case 'graphite': return 'bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_70%)]'
      default: return 'bg-[radial-gradient(circle_at_center,rgba(94,238,255,0.1),transparent_70%)]'
    }
  }

  return (
    <section
      id="certifications"
      data-scroll
      data-scroll-reveal
      className="section-certifications min-h-[70vh] pt-24 px-[10%] pb-12 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-16 max-md:px-[5%] max-md:pb-12 relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#0F9B6E]/5'} animate-float`} style={{ animationDelay: '1s' }} data-parallax="slow" data-parallax-speed="1.5"></div>
      </div>

      {/* Connecting Line Receiver */}
      <div className={`absolute left-[10%] top-[-8rem] w-[2px] h-32 bg-gradient-to-t ${isDarkMode ? 'from-highlight/50 to-transparent' : 'from-[#0F9B6E]/50 to-transparent'} max-md:hidden z-0`}></div>

      {/* Header */}
      <div className="mb-16 text-center relative z-10">
        <div className="inline-block relative">
          <div className={`absolute -inset-4 blur-2xl opacity-20 ${isDarkMode ? 'bg-highlight' : 'bg-[#0F9B6E]'}`}></div>
          <h2
            className={`relative font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'} text-[4.5rem] font-bold mb-4 max-md:text-[3rem] leading-none tracking-tight`}
          >
            My
            <span className="block text-gradient">Certifications</span>
          </h2>
        </div>

        <p className={`mt-6 text-xl font-['DM_Sans'] ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} max-w-2xl mx-auto leading-relaxed`}>
          Professional courses and certifications demonstrating my continued learning in Computer Science.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {certificationsData.map((cert, index) => (
          <a
            key={cert.id}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`perspective-card flex flex-col p-8 rounded-3xl transition-all duration-500 group relative overflow-hidden ${isDarkMode
              ? `bg-white/5 border border-white/10 ${getCardBorderHoverClass()} ${getCardShadowHoverClass()}`
              : 'bg-white border border-slate-200/80 shadow-md hover:border-[#0F9B6E]/40 hover:shadow-xl hover:shadow-slate-300/30'
              } backdrop-blur-md`}
            style={{
              animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              animationDelay: `${index * 0.15}s`,
              opacity: 0
            }}
          >
            {/* Hover Glow Gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${getGlowGradClass()}`}></div>

            <div className="relative z-10 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-24 h-20 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-highlight/10 text-highlight group-hover:bg-highlight/20' : 'bg-[#0F9B6E]/10 text-[#0F9B6E] group-hover:bg-[#0F9B6E]/20'}`}>
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15l-2 5l9-5l-9-5l2 5z" />
                      <circle cx="12" cy="8" r="4" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-['JetBrains_Mono'] tracking-wide ${isDarkMode ? 'text-body-text/60' : 'text-light-body-text/60'}`}>
                  {cert.date}
                </span>
              </div>

              <h3 className={`text-xl font-['Syne'] font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white group-hover:text-highlight' : 'text-light-name-text group-hover:text-[#0F9B6E]'}`}>
                {cert.title}
              </h3>
              
              <p className={`text-sm font-['DM_Sans'] mb-6 font-medium ${isDarkMode ? 'text-highlight/80' : 'text-[#0F9B6E]/80'}`}>
                {cert.issuer}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border transition-all duration-300 ${isDarkMode
                      ? 'bg-white/5 text-gray-400 border-white/10 group-hover:border-highlight/30 group-hover:text-highlight'
                      : 'bg-slate-100 text-light-body-text border-slate-200 group-hover:border-[#0F9B6E]/30 group-hover:text-[#0F9B6E]'
                      }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Connecting Line to Next Section */}
      <div className={`absolute right-[10%] bottom-[-5rem] w-[2px] h-32 bg-gradient-to-b ${isDarkMode ? 'from-highlight/50 to-transparent' : 'from-[#0F9B6E]/50 to-transparent'} max-md:hidden z-0`}></div>
    </section>
  )
}
