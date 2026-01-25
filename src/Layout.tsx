import { useState } from 'react'
import './App.css'
import ScrollFloat from './components/scroll-float'
import { AboutMe } from './components/section/aboutMe'
import { Head } from './components/section/header'

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg text-body-text' : 'bg-[#285B9D] text-light-body-text'} transition-colors duration-300 font-sans leading-relaxed`}>
      <Head isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <AboutMe isDarkMode={isDarkMode} />
    </div>
  )
}

export default Layout

