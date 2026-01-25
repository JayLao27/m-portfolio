import React from 'react'
import { MoonIcon, SunIcon, MessageIcon } from '../Icons'
import { LeftIcons } from '../Left-icons'

type HeadProps = {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const Head: React.FC<HeadProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <>
      <nav className="fixed top-0 right-0 p-8 pr-12 z-[1000] flex items-center gap-8 max-md:p-6 max-md:pr-8 max-md:gap-4">
        <div className="flex gap-8 max-md:gap-4">
          <a
            href="#about"
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm transition-colors duration-300 max-md:text-xs`}
          >
            About
          </a>
          <a
            href="#projects"
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-[#FFFFFF] hover:text-highlight'} no-underline text-sm transition-colors duration-300 max-md:text-xs`}
          >
            Projects
          </a>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-[10%] relative max-w-[1600px] max-xl:px-[5%] max-md:px-[5%]">
        <LeftIcons isDarkMode={isDarkMode} />

        <div className="flex-1 max-w-[700px] animate-fade-in-up text-center">
          <div>
            <p className="text-hi-text text-base font-normal">Hi, my name is</p>
            <h1 className={`text-[4.5rem] font-bold ${isDarkMode ? 'text-name-text' : 'text-[#F0F4FF]'} mb-2 leading-tight max-xl:text-[3.5rem] max-md:text-[2.5rem] max-sm:text-[2rem]`}>
              Jay La
              <button
                onClick={toggleTheme}
                className={`bg-transparent border ${isDarkMode ? 'border-[rgba(136,146,176,0.2)] text-nav-text hover:bg-[rgba(136,146,176,0.2)]' : 'border-[rgba(10,43,47,0.1)] text-light-nav-text hover:bg-[rgba(10,43,47,0.1)]'} px-3 py-2 rounded cursor-pointer text-xl transition-all duration-300`}
              >
                {isDarkMode ? <MoonIcon /> : <SunIcon />}
              </button>
              <span className="relative inline-block"> .</span>
            </h1>
            <h2 className={`text-[3.5rem] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-[#F0F4FF]'} mb-6 leading-tight max-xl:text-[2.5rem] max-md:text-[2rem] max-sm:text-[1.5rem]`}>
              I just live to Learn.
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-body-text' : 'text-[#1DD0A7]'} max-w-[600px] mx-auto leading-relaxed`}>
              I'm a <span className="text-highlight font-medium">curious</span> programmer who invest my time learning a lot and creating.
            </p>
          </div>
        </div>

        <div className="absolute right-8 flex items-center justify-center max-md:right-4 max-sm:hidden">
          <button className=" rounded-full bg-[#448BB2] border-none text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(100,181,246,0.3)]"aria-label="Contact">
            <MessageIcon className="text-white" />
          </button>
        </div>
      </section>
    </>
  )
}