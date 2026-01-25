import React from 'react'
import { AboutBackground, TwoLines, EmailIcon, InstagramIcon, LinkedInIcon } from '../Icons'

export const AboutMe: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section
      id="about"
      className="min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative"
    >
      <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12 relative z-10">
        <div>
          <AboutBackground className="relative top-20 left-0" />
          <h2
            className={`${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} right-[40px] text-[70px] font-[SF Compact] font-semibold mb-8 relative inline-block max-md:text-[2.5rem]`}
          >
            About Me
          </h2>
          <TwoLines className="relative bottom-[40px] right-4" />
          <div className={`text-lg leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-[#FFFFFF]'}`}>
            <p className="mb-6">
              Hi! I am <span className="text-highlight font-medium">Jay Lao</span>. I love that I am still learning. My interest is data. I have been exposed to computers from an early age. I began to play with and learn about computers when I was 5 years old.
            </p>
            <p>
              Now, I have the opportunity to began to work freely on my curiosity to live with my values and principles.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8 max-md:justify-center">
              <a
                href="mailto:your.email@example.com"
                className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-highlight'} transition-all duration-300 hover:-translate-y-1`}
                aria-label="Email"
              >
                <EmailIcon className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-highlight'} transition-all duration-300 hover:-translate-y-1`}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-highlight'} transition-all duration-300 hover:-translate-y-1`}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className={`w-[300px] h-[290px] ${isDarkMode ? 'bg-gradient-to-br from-[rgba(136,146,176,0.2)] to-transparent border border-[rgba(136,146,176,0.2)]' : 'bg-gradient-to-br from-[rgba(10,43,47,0.1)] to-transparent border border-[rgba(10,43,47,0.1)]'} rounded-lg flex items-center justify-center ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} text-xl`}>
            <img src="../../assets/images/LinkedIn_Profile.png" alt="Profile" />
          </div>
        </div>
      </div>
    </section>
  )
}