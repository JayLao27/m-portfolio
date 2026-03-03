import React, { useEffect, useRef, useState } from 'react'
import { ProfileImage } from '../ProfileImage'

export const AboutMe: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px 0px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-about min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`}></div>
      </div>

      <div className="grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:gap-16 relative z-10">
        {/* Text Content */}
        <div className={`space-y-8 scroll-animate ${isVisible ? 'show' : ''} order-2 max-md:order-1`}>
          <div className="relative">
            <h2 className={`font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} text-[4rem] font-bold mb-6 leading-tight`}>
              Beyond the <span className="text-gradient">Screen</span>
            </h2>
          </div>


          <div className={`space-y-6 text-lg font-['DM_Sans'] leading-relaxed ${isDarkMode ? 'text-body-text/90' : 'text-white/80'}`}>
            <p>
              Hi, I’m <span className="text-highlight font-bold">Jay Lao</span>. I’ve been interested in computers from a young age, starting to explore and learn about them when I was around <span className="inline-block px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-bold align-middle mx-1">five years old</span>. Over time, that curiosity grew into a deeper understanding and appreciation for technology.
            </p>
            <p>
              Today, I work independently on projects that reflect my values and principles. I focus on continuous learning and building practical, meaningful solutions that solve real problems.
            </p>
          </div>

          {/* Current Focus */}
          <div className="space-y-4">
            <h3 className={`font-['Syne'] text-lg ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Here's what I'm working on lately:
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Machine Learning', 'Cybersecurity', 'Software Engineering'].map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode
                    ? 'bg-highlight/10 border-highlight/30 text-highlight hover:bg-highlight/20'
                    : 'bg-[#1DD0A7]/10 border-[#1DD0A7]/30 text-[#1DD0A7] hover:bg-[#1DD0A7]/20'
                    }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className={`font-['Syne'] text-lg ${isDarkMode ? 'text-white' : 'text-white'}`}>
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
                  items: ['Laravel', 'Tailwind CSS', 'Bootstrap', 'Scikit-learn', 'JavaFX', 'Streamlit'],
                },
                {
                  category: 'Databases & Tools',
                  icon: '🗄',
                  items: ['MySQL', 'Jupyter Notebook', 'Vite'],
                },
              ].map(({ category, icon, items }) => (
                <div key={category} className={`p-4 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-white/3 border-white/10 hover:border-highlight/30' : 'bg-black/10 border-white/10 hover:border-[#1DD0A7]/30'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-['JetBrains_Mono'] text-xs font-bold ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'}`}>{icon}</span>
                    <span className={`font-['JetBrains_Mono'] text-xs uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-white/50'}`}>{category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-md text-xs font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 cursor-default ${isDarkMode
                          ? 'bg-highlight/5 border-highlight/15 text-body-text/70 hover:bg-highlight/15 hover:text-highlight hover:border-highlight/40'
                          : 'bg-white/5 border-white/15 text-white/60 hover:bg-[#1DD0A7]/15 hover:text-[#1DD0A7] hover:border-[#1DD0A7]/40'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connecting Line Start */}
          <div className={`absolute left-[-2rem] bottom-[-8rem] w-[2px] h-32 bg-gradient-to-b ${isDarkMode ? 'from-highlight/50 to-transparent' : 'from-[#1DD0A7]/50 to-transparent'
            } max-md:hidden`}></div>



          {/* Quote */}
          <div className={`mt-8 p-6 rounded-2xl glass-effect border-l-4 border-highlight relative ${isDarkMode ? 'bg-white/5' : 'bg-black/10'}`}>
            <p className={`font-['DM_Sans'] italic text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
              "The only way to do great work is to love what you do and never stop learning."
            </p>
          </div>
        </div>

        {/* Profile Image */}
        <div className={`flex justify-center items-center scroll-animate scroll-animate-delay-2 ${isVisible ? 'show' : ''}`}>
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 rounded-2xl border border-highlight/20 -z-10"></div>
            <div className="absolute -inset-8 rounded-2xl border border-highlight/10 -z-20"></div>

            <ProfileImage isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </section>
  )
}