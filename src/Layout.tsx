import { useState } from 'react'
import './App.css'
import { AboutMe } from './components/section/AboutMe'
import { Hero } from './components/section/Hero'
import { Projects } from './components/section/Projects'
import { Contact } from './components/section/Contact'
import LoadingScreen from './components/LoadingScreen'
import { LayoutDesign } from './components/LayoutDesign'

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} duration={4000} />
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
