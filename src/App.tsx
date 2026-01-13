import { useState } from 'react'
import './App.css'
import { EmailIcon, InstagramIcon, LinkedInIcon, ContactIcon } from './components/Icons'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-body-text' : 'bg-light-bg text-light-body-text'} transition-colors duration-300 font-sans leading-relaxed`}>
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
        <button
          onClick={toggleTheme}
          className={`bg-transparent border ${isDarkMode ? 'border-[rgba(136,146,176,0.2)] text-nav-text hover:bg-[rgba(136,146,176,0.2)]' : 'border-[rgba(10,43,47,0.1)] text-light-nav-text hover:bg-[rgba(10,43,47,0.1)]'} px-3 py-2 rounded cursor-pointer text-xl transition-all duration-300`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-[10%] relative max-w-[1600px] mx-auto max-xl:px-[5%] max-md:px-[5%]">
        {/* Social Media Icons - Left Sidebar */}
        <div className="absolute left-8 flex flex-col gap-6 py-4 max-md:static max-md:flex-row max-md:mb-8 max-md:left-auto max-md:pb-0">
          <div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 w-px h-20 bg-[rgba(136,146,176,0.2)] max-md:hidden"></div>
          <a
            href="mailto:jay@example.com"
            aria-label="Email"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <EmailIcon />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-light-logo-color hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <LinkedInIcon />
          </a>
        </div>

        {/* Hero Content */}
        <div className="flex-1 max-w-[700px] pl-20 max-xl:pl-12 max-md:pl-4 animate-fade-in-up">
          <div>
            <p className="text-hi-text text-base mb-4 font-normal">Hi, my name is</p>
            <h1 className={`text-[4.5rem] font-bold ${isDarkMode ? 'text-name-text' : 'text-light-name-text'} mb-2 leading-tight max-xl:text-[3.5rem] max-md:text-[2.5rem] max-sm:text-[2rem]`}>
              Jay Lao<span className="relative inline-block">.</span>
            </h1>
            <h2 className={`text-[3.5rem] font-semibold ${isDarkMode ? 'text-tagline-text' : 'text-light-tagline-text'} mb-6 leading-tight max-xl:text-[2.5rem] max-md:text-[2rem] max-sm:text-[1.5rem]`}>
              I live with data to learn.
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} max-w-[600px] leading-relaxed`}>
              I'm a <span className="text-highlight font-medium">curious</span> programmer who enjoy a lot of learning and creating. Doing things is one of my favorite.
            </p>
          </div>
        </div>

        {/* Contact Button - Right Side */}
        <div className="absolute right-8 flex items-center justify-center max-md:right-4 max-sm:hidden">
          <button
            className="w-[60px] h-[60px] rounded-full bg-[#64B5F6] border-none text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(100,181,246,0.3)]"
            aria-label="Contact"
          >
            <ContactIcon className="text-white" />
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12">
        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
          <div>
            <h2 className={`text-5xl font-bold ${isDarkMode ? 'text-name-text' : 'text-light-name-text'} mb-8 relative inline-block max-md:text-[2.5rem]`}>
              About Me
              <span className="absolute bottom-[-0.5rem] left-0 w-full h-[3px] bg-highlight"></span>
            </h2>
            <div className={`text-lg leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-light-body-text'}`}>
              <p className="mb-6">
                Hi! I am <span className="text-highlight font-medium">Jay Lao</span>. I love what I am currently learning right now. My interest is data. I have been exposed to computers from an early age. I began to play with and learn about computers when I was 5 years old.
              </p>
              <p>
                Now, I have the opportunity to began to work freely on my curiosity to live with my values and principles.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className={`w-[300px] h-[400px] ${isDarkMode ? 'bg-gradient-to-br from-[rgba(136,146,176,0.2)] to-transparent border border-[rgba(136,146,176,0.2)]' : 'bg-gradient-to-br from-[rgba(10,43,47,0.1)] to-transparent border border-[rgba(10,43,47,0.1)]'} rounded-lg flex items-center justify-center ${isDarkMode ? 'text-body-text' : 'text-light-body-text'} text-xl`}>
              <span>Photo</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
