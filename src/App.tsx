import { useState } from 'react'
import './App.css'
import {  MoonIcon, SunIcon, TwoLines, AboutBackground, MessageIcon } from './components/Icons'
import { LeftIcons } from './components/Left-icons'
import  useSpotlightEffect from './components/light-cursor'
import SplashCursor from './components/splash-Cursor'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-body-text' : 'bg-[#285B9D] text-light-body-text'} transition-colors duration-300 font-sans leading-relaxed`}>
        <SplashCursor/>
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-8 pr-12 z-[1000] flex items-center gap-8 max-md:p-6 max-md:pr-8 max-md:gap-4">
        <div className="flex gap-8 max-md:gap-4">
          <a 
            href="#about" 
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-highlight'} no-underline text-sm transition-colors duration-300 max-md:text-xs`}
          >
            About
          </a>
          <a 
            href="#projects" 
            className={`${isDarkMode ? 'text-nav-text hover:text-highlight' : 'text-light-nav-text hover:text-highlight'} no-underline text-sm transition-colors duration-300 max-md:text-xs`}
          >
            Projects
          </a>
        </div>
       
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-[10%] relative max-w-[1600px] max-xl:px-[5%] max-md:px-[5%]">
        {/* Social Media Icons - Right Side */}
        <LeftIcons isDarkMode={isDarkMode} />

        {/* Hero Content */}
        <div className="flex-1 max-w-[700px] pl-20 max-xl:pl-12 max-md:pl-4 animate-fade-in-up">
          <div>
            <p className="text-hi-text text-base font-normal font-['Calibri']">Hi, my name is</p>
            <h1 className={`text-[4.5rem] font-bold ${isDarkMode ? 'text-name-text' : 'text-[#F0F4FF]'} mb-2 leading-tight max-xl:text-[3.5rem] max-md:text-[2.5rem] max-sm:text-[2rem]`}>
              Jay La
                  <button onClick={toggleTheme} //button icon toggle
                  className={`bg-transparent border ${isDarkMode ? 'border-[rgba(136,146,176,0.2)] text-nav-text hover:bg-[rgba(136,146,176,0.2)]' : 'border-[rgba(10,43,47,0.1)] text-light-nav-text hover:bg-[rgba(10,43,47,0.1)]'} px-3 py-2 rounded cursor-pointer text-xl transition-all duration-300`}>
                  {isDarkMode ? <MoonIcon /> : <SunIcon />}
                  </button>
              <span className="relative inline-block"> .</span>
            </h1>
            <h2 className={`text-[3.5rem] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-[#F0F4FF]'} mb-6 leading-tight max-xl:text-[2.5rem] max-md:text-[2rem] max-sm:text-[1.5rem]`}>
              I just live to Learn.
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-body-text' : 'text-[#1DD0A7]'} max-w-[600px] leading-relaxed`}>
              I'm a <span className="text-highlight font-medium">curious</span> programmer who invest my time learning a lot and creating.
            </p>
          </div>
        </div>

        {/* Contact Button - Right Side */}
        <div className="absolute right-8 flex items-center justify-center max-md:right-4 max-sm:hidden">
          <button
            className="w-[60px] h-[60px] rounded-full bg-[#448BB2] border-none text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(100,181,246,0.3)]"
            aria-label="Contact">
            <MessageIcon className="text-white" />
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12">
        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
          <div>
          <AboutBackground className='relative top-20 left-0' />
            <h2 className={`${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} right-[40px] text-[70px] font-[SF Compact] font-semibold mb-8 relative inline-block max-md:text-[2.5rem]`}>
              About Me
            </h2>
             <TwoLines className='relative bottom-[40px] right-4' />
            <div className={`text-lg leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-[#FFFFFF]'}`}>
              <p className="mb-6">
                Hi! I am <span className="text-highlight font-medium">Jay Lao</span>. I love that I am still learning. My interest is data. I have been exposed to computers from an early age. I began to play with and learn about computers when I was 5 years old.
              </p>
              <p>
                Now, I have the opportunity to began to work freely on my curiosity to live with my values and principles.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className={`w-[300px] h-[400px] ${isDarkMode ? 'bg-gradient-to-br from-[rgba(136,146,176,0.2)] to-transparent border border-[rgba(136,146,176,0.2)]' : 'bg-gradient-to-br from-[rgba(10,43,47,0.1)] to-transparent border border-[rgba(10,43,47,0.1)]'} rounded-lg flex items-center justify-center ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} text-xl`}>
             <img src="..\images\LinkedIn Profile.png" alt="" />
            </div>
          </div>
        </div>
      </section>

    </div>
    
  )
}

export default App
