import { useState } from 'react'
import './App.css'
import { AboutMe } from './components/section/AboutMe/AboutMe'
import { Hero } from './components/section/Hero/Hero'
import { Projects } from './components/section/Projects/Projects'
import { Certifications } from './components/section/Certifications/Certifications'
import { Contact } from './components/section/Contact/Contact'
import { LayoutDesign } from './components/layout/LayoutDesign'
import { Chatbot } from './components/chat/Chatbot'

function Layout() {
  const [theme, setTheme] = useState<'dark' | 'dim' | 'graphite' | 'cream'>('graphite')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const isDarkMode = theme !== 'cream'

  return (
    <LayoutDesign isDarkMode={isDarkMode} theme={theme}>
      <Hero 
        isDarkMode={isDarkMode} 
        theme={theme}
        setTheme={setTheme} 
        onChatOpen={() => setIsChatOpen(true)} 
      />
      <AboutMe isDarkMode={isDarkMode} theme={theme} />
      <Projects isDarkMode={isDarkMode} theme={theme} />
      <Certifications isDarkMode={isDarkMode} theme={theme} />
      <Contact isDarkMode={isDarkMode} theme={theme} />
      <Chatbot 
        isDarkMode={isDarkMode} 
        theme={theme}
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)} 
      />
    </LayoutDesign>
  )
}


export default Layout
