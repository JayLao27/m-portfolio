import React from 'react'

export interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  skills: string[]
  link?: string
}

const certificationsData: Certification[] = [
  {
    id: 1,
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford',
    date: 'August 2024',
    skills: ['Machine Learning', 'Python', 'Neural Networks', 'Scikit-learn'],
    link: '#'
  },
  {
    id: 2,
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: 'June 2024',
    skills: ['Cybersecurity', 'Network Security', 'Python', 'Linux'],
    link: '#'
  },
  {
    id: 3,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'January 2024',
    skills: ['Cloud Computing', 'AWS Services', 'Security', 'Architecture'],
    link: '#'
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
      className="section-certifications min-h-[70vh] pt-32 px-[10%] pb-20 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#0F9B6E]/5'} animate-float`} style={{ animationDelay: '1s' }} data-parallax="slow" data-parallax-speed="1.5"></div>
      </div>

      {/* Header */}
      <div className="mb-16 text-center relative z-10 scroll-animate" data-parallax="scale" data-parallax-delay="0.1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 scroll-animate scroll-animate-delay-1" data-parallax="slide-up" data-parallax-delay="0.3">
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
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-highlight/10 text-highlight group-hover:bg-highlight/20' : 'bg-[#0F9B6E]/10 text-[#0F9B6E] group-hover:bg-[#0F9B6E]/20'}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15l-2 5l9-5l-9-5l2 5z" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
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
    </section>
  )
}
