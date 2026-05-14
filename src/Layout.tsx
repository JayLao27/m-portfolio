import { useState } from 'react'
import './App.css'
import { AboutMe } from './components/section/AboutMe/AboutMe'
import { Hero } from './components/section/Hero/Hero'
import { Projects } from './components/section/Projects/Projects'
import { Contact } from './components/section/Contact/Contact'
import { LayoutDesign } from './components/LayoutDesign'

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <LayoutDesign isDarkMode={isDarkMode}>
      <Hero isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <AboutMe isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
    </LayoutDesign>
  )
}

export default Layout
