import { EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from './Icons';
  
export function LeftIcons({ theme, showIcons }: { theme: 'dark' | 'dim' | 'graphite' | 'cream'; showIcons: boolean }) {
  const getLineColor = () => {
    return theme === 'cream' ? 'bg-slate-300' : 'bg-[#8892B0]/20'
  }

  const getIconColor = () => {
    switch (theme) {
      case 'cream':
        return 'text-light-logo-color hover:text-[#0F9B6E]'
      case 'dim':
        return 'text-body-text hover:text-[#1DD0A7]'
      case 'graphite':
        return 'text-[#94A3B8] hover:text-[#0ea5e9]'
      default:
        return 'text-logo-color hover:text-highlight'
    }
  }

  return (
    <div className={`absolute left-24 flex flex-col gap-6 py-4 max-md:hidden transition-all duration-700 ease-out ${
      showIcons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className={`absolute top-[-5rem] left-1/2 -translate-x-1/2 w-px h-20 ${getLineColor()} max-md:hidden`}></div>
          <a
            href="mailto:laocjay697@gmail.com"
            aria-label="Email"
            className={`${getIconColor()} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <EmailIcon />
          </a>
          <a
            href="https://www.instagram.com/xjay_lao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`${getIconColor()} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/jaylao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${getIconColor()} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/JayLao27"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${getIconColor()} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <GitHubIcon />
          </a>
      <div className={`absolute bottom-[-5rem] left-1/2 -translate-x-1/2 w-px h-20 ${getLineColor()} max-md:hidden`}></div>
    </div>
  )
}