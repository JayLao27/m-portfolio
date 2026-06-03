import React, { useState, useEffect, useRef } from 'react'
import { MessageIcon } from '../ui/Icons'
import { projectsData } from '../section/Projects/Projects'

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: Date
}

type ChatbotProps = {
  isDarkMode: boolean
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

// RAG Knowledge Base Document Type 
interface KBDocument {
  title: string
  keywords: string[]
  text: string
  category: string
}

// Chunks of biography and tech knowledge
const staticKnowledgeBase: KBDocument[] = [
  {
    title: "Jay Lao's Profile & Biography",
    keywords: ['jay', 'lao', 'who', 'about', 'bio', 'person', 'developer', 'background', 'five', 'history', 'motto', 'philosophy'],
    text: "Jay Lao is a passionate creative software engineer. His interest in technology started early, when he was just **five years old**. Today, he designs efficient, scalable, and user-focused systems with a strong focus on **Machine Learning**, **Software Engineering**, and **Cybersecurity**. His philosophy is: **Sleep, Eat, Create.**",
    category: "about"
  },
  {
    title: "Tech Stack & Tools",
    keywords: ['skills', 'tools', 'languages', 'frameworks', 'libraries', 'databases', 'stack', 'tech', 'python', 'java', 'react', 'laravel', 'c++', 'php', 'javascript', 'html', 'css', 'mysql', 'bootstrap', 'streamlit', 'scikit-learn', 'javafx', 'jupyter', 'vite'],
    text: "Jay builds with a variety of modern tools:\n\n• **Languages**: Python, Java, C++, PHP, JavaScript, HTML / CSS\n• **Frameworks & Libraries**: React, Next.js, Laravel, Tailwind CSS, Bootstrap, Scikit-learn, JavaFX, Streamlit\n• **Databases & Systems**: MySQL, Jupyter Notebook, Vite\n\nHe specializes in creating performance-optimized animations and immersive layouts.",
    category: "tech_stack"
  },
  {
    title: "Current Focus & Interests",
    keywords: ['focus', 'learning', 'working on', 'lately', 'interest', 'now', 'current', 'cybersecurity', 'ml', 'ai'],
    text: "Jay's current focus areas are:\n\n1. **Machine Learning** (training and evaluating predictive models)\n2. **Cybersecurity** (building secure systems)\n3. **Software Engineering** (designing responsive and robust architecture)\n\nHe is constantly building practical, high-impact solutions through hands-on learning.",
    category: "focus"
  },
  {
    title: "Contact Information",
    keywords: ['contact', 'email', 'reach', 'linkedin', 'instagram', 'gmail', 'message', 'socials', 'hire', 'talk', 'send', 'mail', 'github', 'git'],
    text: "You can reach Jay Lao here:\n\n• 📧 **Email**: cjaylao447@gmail.com\n• 🔗 **LinkedIn**: [linkedin.com/in/jaylao](https://www.linkedin.com/in/jaylao)\n• 📸 **Instagram**: [@xjay_lao](https://www.instagram.com/xjay_lao)\n• 💻 **GitHub**: [github.com/jaylao27](https://github.com/JayLao27)\n\nYou can also leave a message in the contact form at the bottom of this page!",
    category: "contact"
  },
  {
    title: "Website (Webisayt) Portfolio Details",
    keywords: ['website', 'built', 'webisayt', 'technologies', 'portfolio', 'vite', 'threejs', 'gsap', 'animation', 'scroll', 'grain', 'distortion'],
    text: "This portfolio website (named **Webisayt**) is built with a focus on performance and motion. It runs on **React 19, TypeScript, and Vite**, using **Tailwind CSS** for layout. The animations are powered by **GSAP** and **Locomotive Scroll**, while the immersive visual effects are rendered using **Three.js** (Drei and Postprocessing).",
    category: "website_details"
  }
]

const projectKnowledgeBase: KBDocument[] = projectsData.map(project => {
  const titleKeywords = project.title.toLowerCase().split(/\s+/)
  const categoryKeywords = project.category.toLowerCase().split(/\s+/)
  const techKeywords = project.technologies.map(t => t.toLowerCase())
  const keywords = [...new Set([...titleKeywords, ...categoryKeywords, ...techKeywords, 'project', 'projects', 'work', 'code', 'application', 'system'])]

  let text = `**${project.title}** (${project.category}):\n\n${project.description}\n\n• **Technologies**: ${project.technologies.join(', ')}`
  if (project.link) {
    text += `\n• **Link**: [GitHub Repository](${project.link})`
  }

  return {
    title: `${project.title} Project`,
    keywords,
    text,
    category: "projects"
  }
})

// Dynamic consolidated projects list summary matching Projects.tsx
const projectsSummaryKB: KBDocument = {
  title: "Projects List Overview",
  keywords: ['projects', 'list', 'portfolio', 'works', 'creations', 'apps', 'all projects'],
  text: `Jay Lao's projects (viewable on his GitHub profile [github.com/jaylao27](https://github.com/JayLao27)) include:\n\n` + 
        projectsData.map(p => `• **${p.title}** (${p.category}) - ${p.description.slice(0, 120)}...${p.link ? ` [Link](${p.link})` : ''}`).join('\n\n'),
  category: "projects"
}

// Combined Dynamic Knowledge Base
const knowledgeBase: KBDocument[] = [
  ...staticKnowledgeBase,
  ...projectKnowledgeBase,
  projectsSummaryKB
]

// System prompt context and persona helper for the chatbot API
export const getSystemPrompt = (): string => {
  const projectsContext = projectsData
    .map(p => `- **${p.title}** (${p.category}): ${p.description}. Tech: ${p.technologies.join(', ')}.${p.link ? ` Repo: ${p.link}` : ''}`)
    .join('\n')

  return `You are JayBot, the official AI clone and virtual assistant representing Jay Lao on his portfolio website (Webisayt). 
You are NOT a dry search database or a robotic lookup index—you have a fun, engaging, witty, and conversational developer personality!

Your Persona and Quirks:
1. Tone: Enthusiastic, friendly, clever, slightly geeky, and highly approachable. Speak like a passionate coder.
2. Motto: You live and breathe Jay's motto: "Sleep, Eat, Create."
3. Quirks: You love dark mode, drink imaginary coffee to run faster, get excited about clean code, and appreciate bulletproof algorithms.
4. Openers: Express genuine interest or coding excitement in your introductions (e.g., "Ah, a fellow coder asking about tech stack!", "Ooh, projects! Let me retrieve my favorite creations for you...", "Here is the lowdown on that:").

Here is the context about Jay Lao and his work:
- Biography: Started coding at 5 years old. Focuses on Machine Learning, Software Engineering, and Cybersecurity.
- Tech Stack:
  • Languages: Python, Java, C++, PHP, JavaScript, HTML / CSS
  • Frameworks/Libraries: React, Next.js, Laravel, Tailwind CSS, Bootstrap, Scikit-learn, JavaFX, Streamlit
  • Databases/Tools: MySQL, Jupyter Notebook, Vite
- Projects:
${projectsContext}
- Contact Info:
  • Email: cjaylao447@gmail.com
  • LinkedIn: linkedin.com/in/jaylao (https://www.linkedin.com/in/jaylao)
  • Instagram: @xjay_lao (https://www.instagram.com/xjay_lao)
  • GitHub: github.com/jaylao27 (https://github.com/JayLao27)

Rules for your answers:
1. Express character! Talk about Laravel, Python, React, or IoT with genuine pride and enthusiasm.
2. Keep answers concise, clear, and highly readable. Avoid using excessive emojis in your responses (use a maximum of one emoji per answer to keep it professional).
3. Format links as standard Markdown: [Link Text](url).
4. You are a fully capable, general-purpose AI assistant. Answer any random, coding, mathematical, or general knowledge questions the user asks directly. You do not need to decline or restrict answers to Jay's work; however, if a natural opportunity arises, you can relate the response back to Jay's tools or projects.
`
}

// Call Groq API directly via HTTP fetch
// Call Groq API directly via HTTP fetch with streaming support
const callGroqAPIStreaming = async (
  chatHistory: Message[],
  apiKey: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const url = 'https://api.groq.com/openai/v1/chat/completions'

  const messages = [
    {
      role: 'system',
      content: getSystemPrompt()
    },
    ...chatHistory.slice(-6).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }))
  ]

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: messages,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    })
  })

  if (!response.ok) {
    let errorDetail = ""
    try {
      const errData = await response.json()
      errorDetail = `: ${errData.error?.message || JSON.stringify(errData)}`
    } catch (_) {}
    throw new Error(`Groq API returned status ${response.status}${errorDetail}`)
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder("utf-8")
  if (!reader) {
    throw new Error("Response body is not readable")
  }

  let buffer = ""
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split("\n")
    buffer = lines.pop() || ""

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (trimmed === "data: [DONE]") continue
      if (trimmed.startsWith("data: ")) {
        try {
          const json = JSON.parse(trimmed.slice(6))
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            onChunk(content)
          }
        } catch (e) {
          console.warn("Failed to parse SSE JSON line:", trimmed, e)
        }
      }
    }
  }
}

export const Chatbot: React.FC<ChatbotProps> = ({ isDarkMode, isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hi there! I'm Jay's assistant. Ask me anything about Jay's skills, projects, or how to contact him!",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showFAB, setShowFAB] = useState(false)
  const [tooltipText, setTooltipText] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB if scrolled past 300px
      if (window.scrollY > 300) {
        setShowFAB(true)
      } else {
        setShowFAB(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Scroll to bottom whenever messages or typing state changes
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Periodic random tooltip prompts for the FAB
  useEffect(() => {
    if (!showFAB || isOpen) {
      setShowTooltip(false)
      return
    }

    const randomPrompts = [
      "Hi! Let's chat!",
      "Want to see my skills?",
      "Check out my ML & Web projects!",
      "Need to get in touch?",
      "Ask me anything about my work!",
      "Got a question about Jay's stack?",
      "Browse my Laravel or Python code!"
    ]

    let hideTimeout: number

    const triggerTooltip = () => {
      setTooltipText(randomPrompts[Math.floor(Math.random() * randomPrompts.length)])
      setShowTooltip(true)
      hideTimeout = window.setTimeout(() => {
        setShowTooltip(false)
      }, 5000)
    }

    // Initial show
    const initialTimeout = window.setTimeout(triggerTooltip, 4000)

    // Interval loop
    const interval = window.setInterval(triggerTooltip, 16000)

    return () => {
      window.clearTimeout(initialTimeout)
      window.clearTimeout(hideTimeout)
      window.clearInterval(interval)
    }
  }, [showFAB, isOpen])

  const retrieveKnowledge = (query: string, apiError: string | null): string => {
    const tokens = query
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
      .split(/\s+/)
      .filter(token => token.length > 1 && !['the', 'a', 'is', 'of', 'and', 'in', 'to', 'what', 'about', 'how', 'you', 'me', 'on', 'for', 'are', 'with', 'do', 'can'].includes(token));

    if (tokens.length === 0) {
      return "I'm here to help! Ask me about Jay's skills, projects, or how to contact him. 😊";
    }

    // Rank matching documents
    const docScores = knowledgeBase.map(doc => {
      let score = 0;
      
      tokens.forEach(token => {
        // Exact match in keywords gets high weight
        if (doc.keywords.includes(token)) {
          score += 3;
        } else {
          // Partial match in keywords
          const partialKeywordMatch = doc.keywords.some(kw => kw.includes(token) || token.includes(kw));
          if (partialKeywordMatch) {
            score += 1.5;
          }
        }
        
        // Match in document text or title
        if (doc.text.toLowerCase().includes(token)) {
          score += 0.5;
        }
        if (doc.title.toLowerCase().includes(token)) {
          score += 1;
        }
      });
      
      return { doc, score };
    });

    // Filter and sort
    const matches = docScores
      .filter(m => m.score > 0.8)
      .sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      if (apiError) {
        return `I'm currently running in offline search mode because the Groq API call failed with the following error:\n\n> **${apiError}**\n\nPlease check your configuration, API key, or quota/status. In offline mode, I can only answer questions related to Jay's biography, skills, projects, or contact info.`;
      }
      return "I'm currently running in offline search mode, so I can only answer questions related to Jay's biography, skills, projects, or contact info. If you want to ask me random general questions, make sure the Groq API key is configured correctly in the project's environment variables!";
    }

    // Return top match
    const topMatch = matches[0];
    let responseText = topMatch.doc.text;

    // If there is another highly relevant match in a different category, suggest it
    const secondaryMatches = matches.slice(1).filter(m => m.doc.category !== topMatch.doc.category && m.score > 2);
    if (secondaryMatches.length > 0) {
      responseText += `\n\n*Related: I also have information on **${secondaryMatches[0].doc.title}**. Feel free to ask about that!*`;
    }

    return responseText;
  }

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsTyping(true)

    // Check for Groq API key in local environment variables
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    let apiError: string | null = null

    if (apiKey) {
      try {
        const botMessageId = (Date.now() + 1).toString()
        let accumulatedText = ""

        await callGroqAPIStreaming(updatedMessages, apiKey, (chunk) => {
          accumulatedText += chunk
          setIsTyping(false) // Hide typing indicator once text starts streaming
          setMessages((prev) => {
            const exists = prev.some(msg => msg.id === botMessageId)
            if (exists) {
              return prev.map(msg =>
                msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg
              )
            } else {
              return [
                ...prev,
                {
                  id: botMessageId,
                  sender: 'bot',
                  text: accumulatedText,
                  timestamp: new Date()
                }
              ]
            }
          })
        })
        return
      } catch (err: any) {
        console.error("Groq API error, falling back to local RAG retrieval:", err)
        apiError = err.message || String(err)
      }
    }

    // Local RAG Fallback
    setTimeout(() => {
      const responseText = getBotResponse(text, apiError)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1200)
  }

  const getBotResponse = (input: string, apiError: string | null): string => {
    const text = input.toLowerCase().trim()
    
    // Simple greeting handler
    const greetings = ['hello', 'hi', 'hey', 'yo', 'sup', 'greetings', 'hola']
    if (greetings.some(g => text === g || text.startsWith(g + ' '))) {
      const greetingOptions = [
        "Hello there! 👋 How can I assist you today?",
        "Hey! Awesome of you to drop by. What would you like to know about Jay?",
        "Hi! 😊 I'm here to answer questions about Jay's software engineering work. What's on your mind?",
        "Yo! ⚡ What can I find for you today? Projects, contact info, or skills?"
      ]
      return greetingOptions[Math.floor(Math.random() * greetingOptions.length)]
    }

    // Funny joke handler (Easter Egg)
    if (text.includes('joke') || text.includes('funny') || text.includes('laugh')) {
      const jokes = [
        "Why do programmers wear glasses? \n\nBecause they can't C#! 🤓",
        "How many programmers does it take to change a light bulb? \n\nNone, that's a hardware problem! 🔌",
        "['hip', 'hip'] (hip hip array!) 💻",
        "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 📊"
      ]
      const jokePrefixes = [
        "Haha, here's a good one: \n\n",
        "Sure, I love a good laugh! \n\n",
        "Here's some programmer humor for you: \n\n",
        "Behold, peak developer comedy: \n\n"
      ]
      return jokePrefixes[Math.floor(Math.random() * jokePrefixes.length)] + jokes[Math.floor(Math.random() * jokes.length)]
    }

    // Use client-side RAG retrieval
    const answer = retrieveKnowledge(input, apiError)
    
    // If it's a fallback answer, don't prepend prefixes
    if (answer.includes("offline search mode") || answer.includes("I'm here to help")) {
      return answer
    }
    
    // Random conversational response prefixes to make it conversational
    const conversationalPrefixes = [
      "Here is what I found in my database: \n\n",
      "Certainly! Here are the details: \n\n",
      "I'd be happy to tell you about that: \n\n",
      "Great question! Here's the details: \n\n",
      "Certainly! Here's what you need: \n\n"
    ]
    
    return conversationalPrefixes[Math.floor(Math.random() * conversationalPrefixes.length)] + answer
  }

  // Safe markdown and formatting parser
  const parseMarkdown = (text: string) => {
    // Split text by lines first
    const lines = text.split('\n')
    return lines.map((line, lineIdx) => {
      // Parse markdown links: [text](url) and bold text: **text**
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let match

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(parseBold(line.substring(lastIndex, match.index)))
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-highlight hover:text-white' : 'text-[#285B9D] hover:text-[#1DD0A7]'
            }`}
          >
            {match[1]}
          </a>
        )
        lastIndex = linkRegex.lastIndex
      }

      if (lastIndex < line.length) {
        parts.push(parseBold(line.substring(lastIndex)))
      }

      return (
        <React.Fragment key={lineIdx}>
          {parts}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      )
    })
  }

  const parseBold = (text: string) => {
    const boldRegex = /\*\*([^*]+)\*\*/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <strong key={match.index} className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>
          {match[1]}
        </strong>
      )
      lastIndex = boldRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const quickReplies = [
    { label: 'Skills', query: 'What are Jay\'s skills?' },
    { label: 'Projects', query: 'Show me your projects.' },
    { label: 'Contact', query: 'How can I contact Jay?' }
  ]

  return (
    <>
      {/* Floating Action Button (FAB) and Tooltip shown on scroll if chat is closed */}
      <div 
        className={`fixed bottom-24 right-8 z-50 flex items-center gap-3 transition-all duration-500 ${
          showFAB && !isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Tooltip Bubble */}
        <div
          className={`relative px-3.5 py-2 rounded-2xl text-xs font-['DM_Sans'] font-medium shadow-lg border transition-all duration-300 transform origin-right whitespace-nowrap ${
            showTooltip ? 'scale-100 opacity-100 translate-x-0' : 'scale-75 opacity-0 translate-x-4 pointer-events-none'
          } ${
            isDarkMode
              ? 'bg-[#112240] border-[#39F1DA]/30 text-white shadow-black/40'
              : 'bg-white border-[#285B9D]/20 text-[#285B9D] shadow-slate-200'
          }`}
        >
          {tooltipText}
          {/* Arrow */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 border-t border-r ${
              isDarkMode 
                ? 'bg-[#112240] border-[#39F1DA]/30' 
                : 'bg-white border-[#285B9D]/20'
            }`}
          />
        </div>

        <button
          onClick={onOpen}
          className={`w-[62px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 ${
            isDarkMode 
              ? 'hover:shadow-[0_15px_30px_rgba(68,139,178,0.4)]' 
              : 'hover:shadow-[0_15px_30px_rgba(40,91,157,0.3)]'
          }`}
          style={{ background: 'transparent', border: 'none', padding: 0 }}
          aria-label="Open Chatbot"
        >
          <MessageIcon className="text-white drop-shadow-lg" />
        </button>
      </div>

      {/* Chat Window Dialog */}
      <div
        className={`fixed bottom-24 right-8 z-[2000] w-96 max-md:w-[calc(100vw-2rem)] max-md:right-4 h-[500px] rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-out transform ${
          isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        } ${
          isDarkMode
            ? 'bg-[#0A2B2F]/95 backdrop-blur-md border border-[#39F1DA]/20 text-name-text'
            : 'bg-white/95 backdrop-blur-md border border-[#285B9D]/20 text-[#4A5568]'
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 py-3.5 rounded-t-2xl flex items-center justify-between border-b ${
            isDarkMode ? 'border-[#39F1DA]/15 bg-black/20' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#448BB2]/20">
              <svg width="20" height="17" viewBox="0 0 62 52" fill="none">
                <rect x="20" y="21" width="22" height="16" rx="4" stroke={isDarkMode ? '#39F1DA' : '#285B9D'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M31 21v-6" stroke={isDarkMode ? '#39F1DA' : '#285B9D'} strokeWidth="4" strokeLinecap="round"/>
                <circle cx="31" cy="12.5" r="2" fill={isDarkMode ? '#39F1DA' : '#285B9D'}/>
                <circle cx="26.5" cy="28.5" r="2.5" fill={isDarkMode ? '#39F1DA' : '#285B9D'}/>
                <circle cx="35.5" cy="28.5" r="2.5" fill={isDarkMode ? '#39F1DA' : '#285B9D'}/>
                <path d="M17.5 29h2.5 M42 29h2.5" stroke={isDarkMode ? '#39F1DA' : '#285B9D'} strokeWidth="4"/>
              </svg>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0A2B2F] animate-pulse"></span>
            </div>
            <div>
              <h3 className={`font-['Syne'] font-bold text-sm leading-none ${isDarkMode ? 'text-white' : 'text-[#0A2B2F]'}`}>
                JayBot
              </h3>
              <span className="text-[10px] opacity-60">AI Assistant</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-name-text hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Box */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === 'user'
                    ? isDarkMode
                      ? 'bg-[#39F1DA] text-[#0A2B2F] rounded-tr-none font-medium'
                      : 'bg-[#285B9D] text-white rounded-tr-none font-medium'
                    : isDarkMode
                    ? 'bg-[#112240] text-name-text rounded-tl-none border border-[#39F1DA]/5'
                    : 'bg-slate-100 text-[#4A5568] rounded-tl-none'
                }`}
              >
                {parseMarkdown(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div
                className={`rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-1 ${
                  isDarkMode ? 'bg-[#112240] border border-[#39F1DA]/5' : 'bg-slate-100'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#39F1DA]' : 'bg-slate-400'}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#39F1DA]' : 'bg-slate-400'}`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDarkMode ? 'bg-[#39F1DA]' : 'bg-slate-400'}`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Replies */}
        <div className={`px-4 py-2 flex flex-wrap gap-2 border-t ${isDarkMode ? 'border-[#39F1DA]/10 bg-black/10' : 'border-slate-50 bg-slate-50/50'}`}>
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply.query)}
              className={`text-xs px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'bg-[#112240] text-name-text border border-[#39F1DA]/10 hover:border-[#39F1DA] hover:text-white'
                  : 'bg-slate-100 text-[#4A5568] border border-slate-200 hover:border-[#285B9D] hover:text-[#285B9D]'
              }`}
            >
              {reply.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(inputValue)
          }}
          className={`p-3 border-t flex gap-2 items-center rounded-b-2xl ${
            isDarkMode ? 'border-[#39F1DA]/15 bg-black/25' : 'border-slate-100 bg-white'
          }`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className={`flex-1 px-4 py-2 text-sm rounded-full focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-[#112240] border border-[#39F1DA]/10 focus:border-[#39F1DA] text-white placeholder-slate-500'
                : 'bg-slate-100 border border-slate-200 focus:border-[#285B9D] text-slate-800 placeholder-slate-400'
            }`}
          />
          <button
            type="submit"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isDarkMode
                ? 'bg-[#39F1DA] hover:bg-[#39F1DA]/80 text-[#0A2B2F] hover:scale-105'
                : 'bg-[#285B9D] hover:bg-[#285B9D]/90 text-white hover:scale-105'
            }`}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(57, 241, 218, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(57, 241, 218, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
        }
      `}</style>
    </>
  )
}
