import React from 'react'
import { AboutBackground, TwoLines } from '../Icons'
import { ProfileImage } from '../ProfileImage'

export const AboutMe: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {

  return (
    <section
      id="about"
      className="ml-20 min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative"
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
              Hi! I am <span className="text-highlight font-medium">Jay Lao</span>. I started  My interest is data. I have been exposed to computers from an early age. I began to play with and learn about computers when I was 5 years old.
            </p>
            <p>
              Now, I have the opportunity to began to work freely on my curiosity to live with my values and principles.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <ProfileImage isDarkMode={isDarkMode} />
        </div>
      </div>
    </section>
  )
}