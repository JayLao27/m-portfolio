import { useState } from 'react'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        {/* Social Media Icons - Left Sidebar */}
        <div className="social-sidebar">
          <a href="mailto:jay@example.com" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-text">
            <p className="greeting">Hi, my name is</p>
            <h1 className="name">
              Jay Lao<span className="cursor">.</span>
            </h1>
            <h2 className="tagline">I live with data to learn.</h2>
            <p className="description">
              I'm a <span className="highlight">curious</span> programmer who enjoy a lot of learning and creating. Doing things is one of my favorite.
            </p>
          </div>
        </div>

        {/* Contact Button - Right Side */}
        <div className="contact-button-wrapper">
          <button className="contact-button" aria-label="Contact">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p>
              Hi! I am <span className="highlight">Jay Lao</span>. I love what I am currently learning right now. My interest is data. I have been exposed to computers from an early age. I began to play with and learn about computers when I was 5 years old.
            </p>
            <p>
              Now, I have the opportunity to began to work freely on my curiosity to live with my values and principles.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span>Photo</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
