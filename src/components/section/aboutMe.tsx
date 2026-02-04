import React from 'react'
import { ProfileImage } from '../ProfileImage'

export const AboutMe: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section id="about" className="min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`}></div>
      </div>

      <div className="grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:gap-16 relative z-10">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="relative">
            <div className="absolute -top-4 -left-8 w-20 h-20 border-l-4 border-t-4 border-highlight/30"></div>
            <h2
              className={`font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} text-[5rem] font-bold mb-8 relative max-md:text-[3.5rem] leading-none`}
            >
              About
              <span className="block text-gradient mt-2">Me</span>
            </h2>
            <div className="absolute -bottom-4 left-0">
              <div className="flex gap-2">
                <div className="w-16 h-1 bg-highlight"></div>
                <div className="w-8 h-1 bg-highlight/50"></div>
                <div className="w-4 h-1 bg-highlight/30"></div>
              </div>
            </div>
          </div>

          <div className={`text-lg font-['DM_Sans'] leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-[#FFFFFF]'} space-y-6 mt-12`}>
            <p className="relative pl-6 border-l-2 border-highlight/30 hover:border-highlight transition-colors duration-300">
              Hi! I am{' '}
              <span className="text-highlight font-semibold font-['Syne'] text-xl">Jay Lao</span>. 
              I started my journey into compusters from an early age. I have been exposed to computers 
              from childhood, beginning to explore and learn about them when I was just{' '}
              <span className="text-highlight font-medium">5 years old</span>.
            </p>
            
            <p className="relative pl-6 border-l-2 border-highlight/30 hover:border-highlight transition-colors duration-300">
              Now, I have the opportunity to work freely on my curiosity, living with my values 
              and principles. I believe in{' '}
              <span className={`font-medium ${isDarkMode ? 'text-[#CCD6F6]' : 'text-[#E1E8FF]'}`}>
                continuous learning
              </span>{' '}
              and creating meaningful solutions.
            </p>

            {/* Skills/Interests Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['Machine Learning', 'Data Science', 'Web Development', 'IoT'].map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm font-['JetBrains_Mono'] border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-highlight/10 border-highlight/30 text-highlight hover:bg-highlight/20'
                      : 'bg-[#1DD0A7]/10 border-[#1DD0A7]/30 text-[#1DD0A7] hover:bg-[#1DD0A7]/20'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative quote */}
          <div className={`mt-8 p-6 rounded-2xl glass-effect border-l-4 border-highlight relative ${isDarkMode ? 'bg-white/5' : 'bg-black/10'}`}>
            <svg className="absolute top-4 left-4 w-8 h-8 text-highlight/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <p className={`font-['DM_Sans'] italic text-base ${isDarkMode ? 'text-body-text/80' : 'text-white/80'} pl-8`}>
              "The only way to do great work is to love what you do and never stop learning."
            </p>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center items-center">
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -inset-4 rounded-2xl border border-highlight/20 -z-10"></div>
            <div className="absolute -inset-8 rounded-2xl border border-highlight/10 -z-20"></div>
            
            <ProfileImage isDarkMode={isDarkMode} />
            
            {/* Floating badge */}
            <div className={`absolute -bottom-6 -right-6 px-6 py-3 rounded-full glass-effect border ${isDarkMode ? 'border-highlight/30' : 'border-[#1DD0A7]/30'} backdrop-blur-xl animate-float`}>
              <p className="text-highlight font-['JetBrains_Mono'] text-sm font-medium tracking-wider">
                Available for Projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}