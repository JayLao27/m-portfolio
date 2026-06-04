import React from 'react'
import { ProfileImage } from '../../ui/ProfileImage'

export const AboutMe: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ isDarkMode, theme }) => {
  return (
    <section
      id="about"
      data-scroll
      data-scroll-reveal
      className="section-about min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`} data-parallax="slow" data-parallax-speed="1.5"></div>
      </div>

      {/* Two columns: Left (photo + heading + bio) | Right (tech stack) */}
      <div className="grid grid-cols-2 gap-16 items-start max-md:grid-cols-1 max-md:gap-12 relative z-10">

          {/* "Beyond the Screen" heading + bio — left-aligned below photo */}

        <div className="space-y-2 scroll-animate-subtle" data-parallax="slide-left" data-parallax-speed="0.8" data-parallax-delay="0.1">
          {/* Profile Image */}
          <div className="relative flex flex-col items-center mx-auto -mt-1 max-md:ml-0 text-center">
            <div className="absolute -inset-4 rounded-2xl border border-highlight/20 -z-10"></div>
            <div className="absolute -inset-8 rounded-2xl border border-highlight/10 -z-20"></div>
            <h2 className={`font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'} text-[3rem] font-bold leading-tight max-md:text-[3rem] mb-4`}>
              Beyond the Screen
            </h2>
            <ProfileImage isDarkMode={isDarkMode} theme={theme} />
            <div className="w-full text-left">
              <div className={`mt-10 mb-[40px] space-y-5 text-lg font-['DM_Sans'] leading-relaxed ${isDarkMode ? 'text-body-text/90' : 'text-light-body-text/90'}`}>
              <p>
                Hi, I'm <span className={`${isDarkMode ? 'text-highlight' : 'text-[#0F9B6E]'} font-bold`}>Jay Lao</span>. My interest in technology started early, around <span className={`inline-block px-3 py-1 rounded-full ${isDarkMode ? 'bg-highlight/10 border-highlight/20 text-highlight' : 'bg-[#0F9B6E]/10 border-[#0F9B6E]/20 text-[#0F9B6E]'} text-sm font-bold align-middle mx-1`}>five years old</span>, and has since grown into a strong foundation in software development and problem-solving.
              </p>
              <p>
                Today, I focus on building practical, high-impact solutions with a strong interest in <span className={isDarkMode ? 'text-highlight font-semibold' : 'text-[#0F9B6E] font-semibold'}>Machine Learning</span> and <span className={isDarkMode ? 'text-highlight font-semibold' : 'text-[#0F9B6E] font-semibold'}>Software Engineering</span>. I enjoy designing systems that are efficient, scalable, and user-focused, while continuously improving through hands-on projects and lifelong learning.
              </p>
            </div>

         
            </div>

          </div>

          {/* Connecting Line Start */}
          <div className={`absolute left-[-2rem] bottom-[-8rem] w-[2px] h-32 bg-gradient-to-b ${isDarkMode ? 'from-highlight/50 to-transparent' : 'from-[#0F9B6E]/50 to-transparent'
            } max-md:hidden`}></div>
        </div>

        {/* Right Column: Tech Stack + Current Focus */}
        <div className=" space-y-6 scroll-animate" data-parallax="slide-right" data-parallax-speed="0.8" data-parallax-delay="0.15">
          <h3 className={`font-['Syne'] text-[1.5rem] font-bold ${isDarkMode ? 'text-white' : 'text-light-name-text'}`}>
            Tools I build with:
          </h3>
          <div className="space-y-3">
            {[
              {
                category: 'Languages',
                icon: '{ }',
                items: ['Python', 'Java', 'C++', 'PHP', 'JavaScript', 'HTML / CSS'],
              },
              {
                category: 'Frameworks & Libraries',
                icon: '⚡',
                items: ['React', 'Next.js', 'Laravel', 'Tailwind CSS', 'Bootstrap', 'Scikit-learn', 'JavaFX', 'Streamlit'],
              },
              {
                category: 'Databases & Tools',
                icon: '🗄',
                items: ['MySQL', 'Jupyter Notebook', 'Vite'],
              },
            ].map(({ category, icon, items }) => (
              <div key={category} className={`p-4 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-white/3 border-white/10 hover:border-highlight/30' : 'bg-white border-slate-200/80 shadow-sm hover:border-[#0F9B6E]/30'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`font-['JetBrains_Mono'] text-xs font-bold ${isDarkMode ? 'text-highlight' : 'text-[#0F9B6E]'}`}>{icon}</span>
                  <span className={`font-['JetBrains_Mono'] text-xs uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-light-body-text/60'}`}>{category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-md text-xs font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 cursor-default ${isDarkMode
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
          <div className="space-y-4 mt-4">
            <h3 className={`font-['Syne'] text-lg ${isDarkMode ? 'text-white' : 'text-light-name-text'}`}>
              Here's what I'm working on lately:
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Machine Learning', 'Cybersecurity', 'Software Engineering'].map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode
                    ? 'bg-highlight/10 border-highlight/30 text-highlight hover:bg-highlight/20'
                    : 'bg-[#0F9B6E]/10 border-[#0F9B6E]/30 text-[#0F9B6E] hover:bg-[#0F9B6E]/20 hover:shadow-[#0F9B6E]/10'
                    }`}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className={` rounded-2xl border-l-4 border-highlight relative ${isDarkMode ? 'bg-white/5' : 'bg-white border border-slate-200/80 shadow-sm'}`} data-parallax="fade" data-parallax-delay="0.3">
              <p className={`font-['DM_Sans'] italic text-base ${isDarkMode ? 'text-gray-300' : 'text-light-body-text/80'}`}>
                "The only way to do great work is to love what you do and never stop learning."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}