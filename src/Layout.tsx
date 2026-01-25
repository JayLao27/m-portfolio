import { useState } from 'react'
import './App.css'
import { AboutMe } from './components/section/aboutMe'
import { Head } from './components/section/header'
import { Projects } from './components/section/projects'
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll();

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-body-text' : 'bg-[#285B9D] text-light-body-text'} transition-colors duration-300 font-sans leading-relaxed`}>
      <div data-scroll data-scroll-speed="0.5">
     
      <Head isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <AboutMe isDarkMode={isDarkMode} />

      <Projects isDarkMode={isDarkMode} />
      
        </div>
     </div>
  )
}

export default Layout

