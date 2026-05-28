import React, { useState } from 'react'
import { EmailIcon, InstagramIcon, LinkedInIcon } from '../../ui/Icons'

export const Contact: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <EmailIcon className="w-6 h-6" />,
      title: 'Email',
      value: 'cjaylao447@gmail.com',
      link: 'mailto:cjaylao447@gmail.com'
    },
    {
      icon: <LinkedInIcon className="w-6 h-6" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/jaylao',
      link: 'https://www.linkedin.com/in/jaylao'
    },
    {
      icon: <InstagramIcon className="w-6 h-6" />,
      title: 'Instagram',
      value: '@xjay_lao',
      link: 'https://www.instagram.com/xjay_lao'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      title: 'GitHub',
      value: 'github.com/JayLao27',
      link: 'https://github.com/JayLao27'
    }
  ]

  return (
    <section
      id="contact"
      data-scroll-reveal
      className="section-contact min-h-screen pt-32 px-[10%] pb-20 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`} style={{ animationDelay: '1.5s' }} data-parallax="slow" data-parallax-speed="1.5"></div>
        <div className={`absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${isDarkMode ? 'bg-highlight/5' : 'bg-[#1DD0A7]/5'} animate-float`} data-parallax="fast" data-parallax-speed="0.8"></div>
      </div>

      {/* Header */}
      <div className="mb-16 text-center relative z-10 scroll-animate-subtle" data-parallax="scale" data-parallax-delay="0.1">
        <div className="inline-block">
          <div className="relative">
            <h2
              className={`font-['Syne'] ${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} text-[5rem] font-bold mb-4 max-md:text-[3.5rem] leading-none`}
            >
              Get In
              <span className="block text-gradient">Touch</span>
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-20 h-1 bg-highlight"></div>
              <div className="w-12 h-1 bg-highlight/50"></div>
              <div className="w-6 h-1 bg-highlight/30"></div>
            </div>
          </div>
        </div>

        <p className={`mt-8 text-lg font-['DM_Sans'] ${isDarkMode ? 'text-body-text' : 'text-white/80'} max-w-2xl mx-auto`}>
          I'm always open to new opportunities and collaborations. Feel free to reach out!
        </p>
      </div>

      {/* Contact Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 scroll-animate-subtle scroll-animate-delay-1" data-parallax="fade" data-parallax-delay="0.2">

        {/* Left Side - Contact Information */}
        <div className="space-y-8">
          <div className={`p-8 rounded-2xl glass-effect border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
            <h3 className={`text-2xl font-['Syne'] font-bold mb-6 ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'}`}>
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 group ${isDarkMode
                    ? 'bg-white/5 hover:bg-highlight/10 border border-white/5 hover:border-highlight/30'
                    : 'bg-white/10 hover:bg-[#1DD0A7]/10 border border-white/10 hover:border-[#1DD0A7]/30'
                    }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkMode
                    ? 'bg-highlight/10 text-highlight group-hover:bg-highlight group-hover:text-dark-bg'
                    : 'bg-[#1DD0A7]/10 text-[#1DD0A7] group-hover:bg-[#1DD0A7] group-hover:text-white'
                    }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-['JetBrains_Mono'] ${isDarkMode ? 'text-body-text/60' : 'text-white/60'}`}>
                      {item.title}
                    </p>
                    <p className={`font-['DM_Sans'] font-medium ${isDarkMode ? 'text-body-text' : 'text-white'}`}>
                      {item.value}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info Card */}
          <div className={`p-8 rounded-2xl glass-effect border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
            <h3 className={`text-xl font-['Syne'] font-bold mb-4 ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'}`}>
              Let's Work Together
            </h3>
            <p className={`font-['DM_Sans'] leading-relaxed ${isDarkMode ? 'text-body-text/80' : 'text-white/80'}`}>
              I'm currently available for freelance projects, collaborations, and full-time opportunities.
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>

          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className={`p-8 rounded-2xl glass-effect border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
          <h3 className={`text-2xl font-['Syne'] font-bold mb-6 ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'}`}>
            Send Me a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-['JetBrains_Mono'] mb-2 ${isDarkMode ? 'text-body-text' : 'text-white'}`}
              >
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg font-['DM_Sans'] transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode
                  ? 'bg-white/5 border border-white/10 text-body-text placeholder-body-text/40 focus:ring-highlight/50 focus:border-highlight/50'
                  : 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-[#1DD0A7]/50 focus:border-[#1DD0A7]/50'
                  }`}
                placeholder="Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-['JetBrains_Mono'] mb-2 ${isDarkMode ? 'text-body-text' : 'text-white'}`}
              >
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg font-['DM_Sans'] transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode
                  ? 'bg-white/5 border border-white/10 text-body-text placeholder-body-text/40 focus:ring-highlight/50 focus:border-highlight/50'
                  : 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-[#1DD0A7]/50 focus:border-[#1DD0A7]/50'
                  }`}
                placeholder="Name@example.com"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label
                htmlFor="subject"
                className={`block text-sm font-['JetBrains_Mono'] mb-2 ${isDarkMode ? 'text-body-text' : 'text-white'}`}
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg font-['DM_Sans'] transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode
                  ? 'bg-white/5 border border-white/10 text-body-text placeholder-body-text/40 focus:ring-highlight/50 focus:border-highlight/50'
                  : 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-[#1DD0A7]/50 focus:border-[#1DD0A7]/50'
                  }`}
                placeholder="Project Inquiry"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-['JetBrains_Mono'] mb-2 ${isDarkMode ? 'text-body-text' : 'text-white'}`}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg font-['DM_Sans'] transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${isDarkMode
                  ? 'bg-white/5 border border-white/10 text-body-text placeholder-body-text/40 focus:ring-highlight/50 focus:border-highlight/50'
                  : 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-[#1DD0A7]/50 focus:border-[#1DD0A7]/50'
                  }`}
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 rounded-full font-['JetBrains_Mono'] text-sm tracking-wider transition-all duration-500 flex items-center justify-center gap-3 ${isDarkMode
                ? 'bg-highlight text-dark-bg hover:bg-highlight/90 disabled:bg-highlight/50'
                : 'bg-[#1DD0A7] text-white hover:bg-[#0F9B6E] disabled:bg-[#1DD0A7]/50'
                } hover:scale-105 hover:shadow-lg hover:shadow-highlight/30 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-highlight/10 border border-highlight/30' : 'bg-[#1DD0A7]/10 border border-[#1DD0A7]/30'}`}>
                <p className={`text-sm font-['DM_Sans'] text-center ${isDarkMode ? 'text-highlight' : 'text-[#1DD0A7]'}`}>
                  ✓ Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center relative z-10 scroll-animate-subtle scroll-animate-delay-2" data-parallax="slide-up" data-parallax-delay="0.4">
        <div className={`inline-block p-8 rounded-2xl glass-effect border ${isDarkMode ? 'border-white/10' : 'border-white/20'}`}>
          <p className={`text-lg font-['DM_Sans'] mb-4 ${isDarkMode ? 'text-body-text' : 'text-white'}`}>
            Prefer a direct email?
          </p>
          <a
            href="mailto:cjaylao447@gmail.com"
            className={`contact-email-link inline-flex items-center gap-3 px-8 py-4 rounded-full font-['JetBrains_Mono'] text-sm tracking-wider transition-all duration-500 ${isDarkMode
              ? 'bg-highlight/10 text-highlight border-2 border-highlight/50 hover:bg-highlight hover:text-dark-bg'
              : 'bg-[#1DD0A7]/10 text-[#1DD0A7] border-2 border-[#1DD0A7]/50 hover:bg-[#1DD0A7] hover:text-white'
              } hover:scale-105 hover:shadow-lg hover:shadow-highlight/30`}
          >
            <EmailIcon className="w-5 h-5" />
            cjaylao447@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}