import { EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from './Icons';
  
export function LeftIcons({ isDarkMode, showIcons }: { isDarkMode: boolean; showIcons: boolean }) {
  return (
    <div className={`absolute left-24 flex flex-col gap-6 py-4 max-md:static max-md:flex-row max-md:mb-8 max-md:right-auto max-md:pb-0 transition-all duration-700 ease-out ${
      showIcons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="absolute top-[-5rem] left-1/2 -translate-x-1/2 w-px h-20 bg-[rgba(136,146,176,0.2)] max-md:hidden"></div>
          <a
            href="laocjay697@gmail.com"
            aria-label="Email"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <EmailIcon />
          </a>
          <a
            href="https://www.instagram.com/xjay_lao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/jaylao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/JayLao27"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`${isDarkMode ? 'text-logo-color hover:text-highlight' : 'text-[#CCD6F6] hover:text-highlight'} transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5`}
          >
            <GitHubIcon />
          </a>
      <div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2 w-px h-20 bg-[rgba(136,146,176,0.2)] max-md:hidden"></div>
    </div>
  )
}