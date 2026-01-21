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

export const MoonIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
 
 <svg width="100" height="45" viewBox="0 0 116 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="6" width="116" height="44" rx="22" fill="white"/>
  <rect x="8" width="45" height="55" rx="22.5" fill="#CCD6F6"/>
  <path opacity="0.65" d="M27 9C33.0751 9 38.5 14.9249 38.5 21L38.5225 21.2699C38.8403 25.0833 38.8403 28.9167 38.5225 32.7301L38.5 33C38.5 39.5 32.6711 45.5 27 45.5C20.9249 45.5 15 38.5 15 33V27V20.5C15 14.4249 20.9249 9 27 9Z" fill="#0A2B2F"/>
  </svg>
  
)

export const SunIcon = ({ className = "w-6 h-6" }: { className?: string }) => (

  <svg width="100" height="45" viewBox="0 0 116 55" fill="none" xmlns="http://www.w3.org/2000/svg">
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
