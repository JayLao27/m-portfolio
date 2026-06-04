export const EmailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

export const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

export const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

export const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export const ContactIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

export const MoonIcon = ({ className }: { className?: string }) => (
 
 <svg className={className} width="100" height="45" viewBox="0 0 116 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="6" width="116" height="44" rx="22" fill="white"/>
  <rect x="8" width="45" height="55" rx="22.5" fill="#CCD6F6"/>
  <path opacity="0.65" d="M27 9C33.0751 9 38.5 14.9249 38.5 21L38.5225 21.2699C38.8403 25.0833 38.8403 28.9167 38.5225 32.7301L38.5 33C38.5 39.5 32.6711 45.5 27 45.5C20.9249 45.5 15 38.5 15 33V27V20.5C15 14.4249 20.9249 9 27 9Z" fill="#0A2B2F"/>
  </svg>
  
)

export const SunIcon = ({ className }: { className?: string }) => (

  <svg className={className} width="100" height="45" viewBox="0 0 116 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="5" width="116" height="44" rx="22" fill="white"/>
  <rect x="62" width="45" height="55" rx="22.5" fill="#CCD6F6"/>
  <path opacity="0.65" d="M85 9C91.0751 9 96.5 14.9249 96.5 21L96.5225 21.2699C96.8403 25.0833 96.8403 28.9167 96.5225 32.7301L96.5 33C96.5 39.5 90.6711 45.5 85 45.5C78.9249 45.5 73 38.5 73 33V27V20.5C73 14.4249 78.9249 9 85 9Z" fill="#285B9D"/>
  </svg>

)

export const TwoLines = ({ className = "w-6 h-6" }: { className?: string }) => (

  <svg  width="400" height="8" viewBox="0 0 319 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <line y1="0.5" x2="309" y2="0.5" stroke="#5EEEFF"/>
  <line x1="10" y1="7.5" x2="319" y2="7.5" stroke="#5EEEFF"/>
  </svg>


)

export const AboutBackground = ({ className = "w-6 h-6" }: { className?: string }) => (

  <svg width="506" height="124" viewBox="0 0 506 124" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <rect opacity="0.39" width="506" height="124" fill="#224D52"/>
  </svg>

)

export const MessageIcon = ({ className }: { className?: string }) => (
  <svg width="62" height="52" viewBox="0 0 62 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 19C0 8.50659 8.50659 0 19 0H43C53.4934 0 62 8.50659 62 19V33C62 43.4934 53.4934 52 43 52H19C8.50659 52 0 43.4934 0 33V19Z" fill="currentColor"/>
    <path d="M20.2734 26.9954L25.4036 28.7055C25.8588 28.8553 26.2848 29.0695 26.6689 29.3386C26.9158 29.5115 27.1454 29.707 27.3544 29.9229C27.8321 30.4161 28.2022 31.0151 28.4251 31.6903L30.1562 36.7583C31.6354 41.1422 37.8672 41.049 39.2521 36.665L45.0747 18.1652C45.6393 16.3367 45.0705 14.5699 43.9018 13.4C42.7256 12.2225 40.9419 11.6496 39.0946 12.2267L20.3364 17.9787C15.9301 19.3467 15.8671 25.5341 20.2734 26.9954Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)


