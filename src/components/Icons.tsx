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
<svg width="30" height="40" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="55" rx="22.5" fill="#CCD6F6"/>
<path opacity="0.65" d="M19 9C25.0751 9 30.5 14.9249 30.5 21L30.5225 21.2699C30.8403 25.0833 30.8403 28.9167 30.5225 32.7301L30.5 33C30.5 39.5 24.6711 45.5 19 45.5C12.9249 45.5 7 38.5 7 33V27V20.5C7 14.4249 12.9249 9 19 9Z" fill="#0A2B2F"/>
</svg>

  
)
