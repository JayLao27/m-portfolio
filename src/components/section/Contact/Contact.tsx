import React, { useState } from 'react'
import { EmailIcon, InstagramIcon, LinkedInIcon, GitHubIcon } from '../../ui/Icons'

export const Contact: React.FC<{ isDarkMode: boolean; theme: 'dark' | 'dim' | 'graphite' | 'cream' }> = ({ theme }) => {
  // --- Theme helper values ----------------------------------------------------
  const getAccentColor = () => {
    switch (theme) {
      case 'cream': return '#0F9B6E'
      case 'dim': return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      default: return '#39F1DA'
    }
  }

  const getAccentRgb = () => {
    switch (theme) {
      case 'cream': return '15,155,110'
      case 'dim': return '29,208,167'
      case 'graphite': return '14,165,233'
      default: return '57,241,218'
    }
  }

  const getCardBg = () => {
    switch (theme) {
      case 'cream': return 'bg-[#FFFFFF] border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'
      case 'dim': return 'bg-[#15202B]/85 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
      case 'graphite': return 'bg-[#121620]/85 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
      default: return 'bg-[#0a192f]/85 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
    }
  }

  const accentColor = getAccentColor()
  const accentRgb = getAccentRgb()

  // --- Clipboard utilities --------------------------------------------------
  const [copiedText, setCopiedText] = useState<string | null>(null)
  
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(name)
    setTimeout(() => setCopiedText(null), 2000)
  }

  // --- Form fields & state handlers ------------------------------------------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const selectSubject = (subjText: string) => {
    setFormData({ ...formData, subject: subjText })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitStatus('error')
      }, 1000)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Jay Lao Portfolio'
        })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (err) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Social Networks metadata ----------------------------------------------
  const socialItems = [
    {
      name: 'Email',
      value: 'jaylao03271@gmail.com',
      link: 'mailto:jaylao03271@gmail.com',
      icon: <EmailIcon className="w-5 h-5" />,
      color: accentColor,
      rgb: accentRgb,
      label: 'DIRECT MAIL'
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/jaylao',
      link: 'https://www.linkedin.com/in/jaylao',
      icon: <LinkedInIcon className="w-5 h-5" />,
      color: '#0A66C2',
      rgb: '10,102,194',
      label: 'PROFESSIONAL NET'
    },
    {
      name: 'GitHub',
      value: 'github.com/JayLao27',
      link: 'https://github.com/JayLao27',
      icon: <GitHubIcon className="w-5 h-5" />,
      color: theme === 'cream' ? '#1F2937' : '#F3F4F6',
      rgb: theme === 'cream' ? '31,41,55' : '243,244,246',
      label: 'SOURCE REPOSITORY'
    },
    {
      name: 'Instagram',
      value: '@xjay_lao',
      link: 'https://www.instagram.com/xjay_lao',
      icon: <InstagramIcon className="w-5 h-5" />,
      color: '#E1306C',
      rgb: '225,48,108',
      label: 'SOCIAL HUB'
    }
  ]

  // --- Message input metadata ------------------------------------------------
  const charLimit = 1000
  const charCount = formData.message.length
  const charPct = Math.min(100, (charCount / charLimit) * 100)

  return (
    <section
      id="contact"
      data-scroll
      data-scroll-reveal
      className="section-contact min-h-screen pt-32 px-[10%] pb-24 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-16 relative overflow-hidden"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* ── Ambient Radial Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[160px] opacity-35"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* ── Section Header ── */}
      <div className="relative z-10 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] rounded-full" style={{ background: accentColor }} />
          <span
            className="font-['JetBrains_Mono'] text-[11px] tracking-[0.3em] uppercase font-bold"
            style={{ color: accentColor }}
          >
            Get In Touch
          </span>
        </div>
        <h2
          className={`font-['Syne'] font-extrabold leading-[0.9] tracking-tight text-[5.5rem] max-md:text-[3.5rem] ${
            theme === 'cream' ? 'text-[#0F9B6E]' : 'text-white'
          }`}
        >
          Let's Start<br />
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, ${theme === 'cream' ? '#0F9B6E' : '#CCD6F6'} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            A Conversation.
          </span>
        </h2>
        <p className={`mt-6 font-['DM_Sans'] text-base max-w-xl leading-relaxed ${theme === 'cream' ? 'text-slate-600' : 'text-gray-400'}`}>
          Currently open to internship opportunities, research collaborations, and creative discussions. Send a direct message or connect through my social nodes.
        </p>
      </div>

      {/* ── Main Layout Grid ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT COLUMN: Quick Details & Social Node Cards (5 cols) ── */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Availability Status Card */}
          <div className={`p-6 rounded-3xl border ${getCardBg()} relative overflow-hidden group`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest ${theme === 'cream' ? 'text-slate-500' : 'text-white/40'}`}>
                CURRENT AVAILABILITY
              </span>
              <div 
                className="px-2.5 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold border flex items-center gap-1.5"
                style={{ 
                  color: accentColor, 
                  borderColor: `${accentColor}30`, 
                  background: `${accentColor}10` 
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: accentColor }} />
                OPEN
              </div>
            </div>
            
            <p className={`font-['Syne'] text-base font-extrabold ${theme === 'cream' ? 'text-slate-800' : 'text-white'}`}>
              Davao City, Philippines
            </p>
            <p className={`mt-2 font-['DM_Sans'] text-xs ${theme === 'cream' ? 'text-slate-500' : 'text-slate-400'}`}>
              Available for 2026 CS Internships, research assistant roles, and collaborative software engineering projects globally (Remote or Hybrid).
            </p>
          </div>

          {/* Social Network Cards Grid (2x2) */}
          <div className="grid grid-cols-2 gap-4">
            {socialItems.map((item) => (
              <div
                key={item.name}
                className={`p-5 rounded-2xl border ${getCardBg()} transition-all duration-300 relative group flex flex-col justify-between h-[135px]`}
                style={{
                  boxShadow: `0 4px 24px rgba(0,0,0,${theme === 'cream' ? '0.01' : '0.2'})`
                }}
                onMouseEnter={(e) => {
                  if (theme !== 'cream') {
                    e.currentTarget.style.borderColor = `${item.color}50`
                    e.currentTarget.style.boxShadow = `0 12px 35px rgba(${item.rgb}, 0.18)`
                  } else {
                    e.currentTarget.style.borderColor = `${item.color}60`
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                {/* Visual grid overlay for social nodes */}
                <div className="absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-300 group-hover:opacity-10" style={{ color: item.color }}>
                  <svg width="100%" height="100%">
                    <pattern id={`grid-${item.name}`} width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.75" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-${item.name})`} />
                  </svg>
                </div>

                {/* Card Top Actions */}
                <div className="flex items-start justify-between relative z-10">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      background: `rgba(${item.rgb}, 0.08)`,
                      borderColor: `rgba(${item.rgb}, 0.15)`,
                      color: item.color
                    }}
                  >
                    {item.icon}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyToClipboard(item.value, item.name)}
                      className={`p-1.5 rounded-lg border transition-all duration-200 hover:scale-105 ${
                        theme === 'cream' 
                          ? 'border-slate-200/60 bg-slate-50 hover:bg-slate-100 text-slate-500' 
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                      title={`Copy ${item.name} handle`}
                    >
                      {copiedText === item.name ? (
                        <span className="font-mono text-[8px] font-bold uppercase text-emerald-400 px-0.5">
                          COPIED
                        </span>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded-lg border transition-all duration-200 hover:scale-105 ${
                        theme === 'cream' 
                          ? 'border-slate-200/60 bg-slate-50 hover:bg-slate-100 text-slate-500' 
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Node details */}
                <div className="relative z-10">
                  <span className={`block font-['JetBrains_Mono'] text-[8px] uppercase tracking-widest opacity-55 ${theme === 'cream' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className={`block font-['Syne'] text-sm font-bold mt-1 ${theme === 'cream' ? 'text-slate-800' : 'text-white'}`}>
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Core Focus statement */}
          <div className={`p-6 rounded-3xl border ${getCardBg()} text-center relative overflow-hidden`}>
            <p className={`font-['DM_Sans'] text-xs leading-relaxed ${theme === 'cream' ? 'text-slate-600' : 'text-gray-400'}`}>
              "Building optimized systems and integrations. I'm always looking for ways to bridge the gap between complex software logic and high-fidelity user experiences."
            </p>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Secure Message Form (7 cols) ── */}
        <div className="lg:col-span-7">
          <div className={`rounded-3xl border relative overflow-hidden ${getCardBg()}`}>
            
            {/* Top border strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-[3px]" 
              style={{ background: `linear-gradient(90deg, ${accentColor}, transparent, ${accentColor})` }} 
            />

            {/* Form Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/5" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full bg-rose-500/80 ${submitStatus === 'error' ? 'animate-pulse scale-110' : ''}`} />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className={`w-2.5 h-2.5 rounded-full bg-green-500/80 ${submitStatus === 'success' ? 'animate-pulse scale-110' : ''}`} />
                <span className={`ml-2 font-mono text-[10px] tracking-wider uppercase opacity-45 ${theme === 'cream' ? 'text-slate-800' : 'text-white'}`}>
                  contact_terminal.log
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase opacity-45">
                SECURE_GATEWAY
              </span>
            </div>
            
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Presets Row */}
                <div>
                  <span className={`block font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest mb-2.5 ${theme === 'cream' ? 'text-slate-500' : 'text-white/45'}`}>
                    SELECT SUBJECT PRESET
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { text: 'Internship 💼', prefix: 'Internship Opportunity' },
                      { text: 'Collaboration 🤝', prefix: 'Collaboration Request' },
                      { text: 'General Chat 💬', prefix: 'General Discussion' }
                    ].map((item) => (
                      <button
                        key={item.text}
                        type="button"
                        onClick={() => selectSubject(item.prefix)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-['JetBrains_Mono'] border transition-all ${
                          formData.subject.startsWith(item.prefix)
                            ? `border-white/10`
                            : `bg-transparent border-white/5 opacity-60 hover:opacity-100 hover:scale-105`
                        }`}
                        style={{
                          borderColor: formData.subject.startsWith(item.prefix) ? accentColor : '',
                          backgroundColor: formData.subject.startsWith(item.prefix) ? `${accentColor}15` : '',
                          color: formData.subject.startsWith(item.prefix) ? accentColor : (theme === 'cream' ? '#1F2937' : '#FFFFFF')
                        }}
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className={`peer w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-xs transition-all focus:outline-none border ${
                      theme === 'cream'
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-transparent focus:bg-white'
                        : 'bg-white/[0.01] border-white/5 text-white placeholder-transparent focus:bg-white/[0.03]'
                    }`}
                    style={{
                      borderColor: focusedField === 'name' ? accentColor : ''
                    }}
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-4 top-3.5 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest transition-all pointer-events-none duration-300 ${
                      theme === 'cream' ? 'text-slate-400' : 'text-white/40'
                    } peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-['DM_Sans'] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-[-10px] peer-focus:text-[9px] peer-focus:font-['JetBrains_Mono'] peer-focus:uppercase peer-focus:tracking-widest peer-focus:px-2 peer-focus:-translate-y-1 peer-focus:rounded`}
                    style={{
                      color: formData.name ? accentColor : '',
                      backgroundColor: (formData.name || theme === 'cream') ? (theme === 'cream' ? '#FFFFFF' : '#121620') : 'transparent'
                    }}
                  >
                    Your Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className={`peer w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-xs transition-all focus:outline-none border ${
                      theme === 'cream'
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-transparent focus:bg-white'
                        : 'bg-white/[0.01] border-white/5 text-white placeholder-transparent focus:bg-white/[0.03]'
                    }`}
                    style={{
                      borderColor: focusedField === 'email' ? accentColor : ''
                    }}
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 top-3.5 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest transition-all pointer-events-none duration-300 ${
                      theme === 'cream' ? 'text-slate-400' : 'text-white/40'
                    } peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-['DM_Sans'] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-[-10px] peer-focus:text-[9px] peer-focus:font-['JetBrains_Mono'] peer-focus:uppercase peer-focus:tracking-widest peer-focus:px-2 peer-focus:-translate-y-1 peer-focus:rounded`}
                    style={{
                      color: formData.email ? accentColor : '',
                      backgroundColor: (formData.email || theme === 'cream') ? (theme === 'cream' ? '#FFFFFF' : '#121620') : 'transparent'
                    }}
                  >
                    Your Email
                  </label>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder=" "
                    className={`peer w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-xs transition-all focus:outline-none border ${
                      theme === 'cream'
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-transparent focus:bg-white'
                        : 'bg-white/[0.01] border-white/5 text-white placeholder-transparent focus:bg-white/[0.03]'
                    }`}
                    style={{
                      borderColor: focusedField === 'subject' ? accentColor : ''
                    }}
                  />
                  <label 
                    htmlFor="subject" 
                    className={`absolute left-4 top-3.5 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest transition-all pointer-events-none duration-300 ${
                      theme === 'cream' ? 'text-slate-400' : 'text-white/40'
                    } peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-['DM_Sans'] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-[-10px] peer-focus:text-[9px] peer-focus:font-['JetBrains_Mono'] peer-focus:uppercase peer-focus:tracking-widest peer-focus:px-2 peer-focus:-translate-y-1 peer-focus:rounded`}
                    style={{
                      color: formData.subject ? accentColor : '',
                      backgroundColor: (formData.subject || theme === 'cream') ? (theme === 'cream' ? '#FFFFFF' : '#121620') : 'transparent'
                    }}
                  >
                    Subject
                  </label>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    placeholder=" "
                    className={`peer w-full px-4 py-3.5 rounded-xl font-['DM_Sans'] text-xs transition-all focus:outline-none resize-none border ${
                      theme === 'cream'
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-transparent focus:bg-white'
                        : 'bg-white/[0.01] border-white/5 text-white placeholder-transparent focus:bg-white/[0.03]'
                    }`}
                    style={{
                      borderColor: focusedField === 'message' ? accentColor : ''
                    }}
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 top-3.5 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest transition-all pointer-events-none duration-300 ${
                      theme === 'cream' ? 'text-slate-400' : 'text-white/40'
                    } peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-['DM_Sans'] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-[-10px] peer-focus:text-[9px] peer-focus:font-['JetBrains_Mono'] peer-focus:uppercase peer-focus:tracking-widest peer-focus:px-2 peer-focus:-translate-y-1 peer-focus:rounded`}
                    style={{
                      color: formData.message ? accentColor : '',
                      backgroundColor: (formData.message || theme === 'cream') ? (theme === 'cream' ? '#FFFFFF' : '#121620') : 'transparent'
                    }}
                  >
                    Message
                  </label>

                  {/* Character limit bar */}
                  <div className="flex justify-between items-center mt-1.5 font-mono text-[9px] opacity-50 px-1">
                    <span>CHARACTERS: {charCount}/{charLimit}</span>
                    <span style={{ color: charCount > charLimit ? '#EF4444' : '' }}>
                      {charCount > charLimit ? 'LIMIT EXCEEDED' : 'READY'}
                    </span>
                  </div>
                  <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: theme === 'cream' ? 'rgba(0,0,0,0.05)' : '' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${charPct}%`, 
                        backgroundColor: charCount > charLimit ? '#EF4444' : accentColor 
                      }} 
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || charCount > charLimit}
                  className="w-full py-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg"
                  style={{
                    backgroundColor: charCount > charLimit ? '#6B7280' : accentColor,
                    color: theme === 'cream' ? '#FFFFFF' : '#111827',
                    boxShadow: charCount > charLimit ? '' : `0 8px 30px rgba(${accentRgb}, 0.2)`
                  }}
                  onMouseEnter={(e) => {
                    if (charCount <= charLimit) {
                      e.currentTarget.style.boxShadow = `0 12px 35px rgba(${accentRgb}, 0.35)`
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (charCount <= charLimit) {
                      e.currentTarget.style.boxShadow = `0 8px 30px rgba(${accentRgb}, 0.2)`
                      e.currentTarget.style.transform = ''
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Success Feedback Output */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 font-mono text-[11px] space-y-1 animate-fadeIn">
                    <p className="font-bold">MESSAGE SENT SUCCESSFULLY.</p>
                    <p className="opacity-75">Thank you! I will review your message and follow up shortly.</p>
                  </div>
                )}

                {/* Error Feedback Output */}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl border border-rose-500/25 bg-rose-500/5 text-rose-400 font-mono text-[11px] space-y-1 animate-fadeIn">
                    <p className="font-bold">TRANSMISSION ERROR.</p>
                    <p className="opacity-75">Failed to send message. Please verify your connection or try again.</p>
                  </div>
                )}

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
