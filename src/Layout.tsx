import { useState } from 'react'
import './App.css'
import { AboutMe } from './components/section/AboutMe/AboutMe'
import { Hero } from './components/section/Hero/Hero'
import { Projects } from './components/section/Projects/Projects'
import { Contact } from './components/section/Contact/Contact'
import { LayoutDesign } from './components/layout/LayoutDesign'
import { Chatbot } from './components/chat/Chatbot'

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <LayoutDesign isDarkMode={isDarkMode}>
      <Hero 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onChatOpen={() => setIsChatOpen(true)} 
      />
      <AboutMe isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Chatbot 
        isDarkMode={isDarkMode} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)} 
      />
    </LayoutDesign>
  )
}


export default Layout
