import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

interface KBDocument {
  title: string
  keywords: string[]
  text: string
  category: string
}

const staticKnowledgeBase: KBDocument[] = [
  {
    title: "Jay Lao's Profile & Biography",
    keywords: ['jay', 'lao', 'who', 'about', 'bio', 'person', 'developer', 'background', 'five', 'history', 'motto', 'philosophy'],
    text: "I am a passionate creative software engineer. My interest in technology started early, when I was just **five years old**. Today, I design efficient, scalable, and user-focused systems with a strong focus on **Machine Learning**, **Software Engineering**, and **Cybersecurity**. My philosophy is: **Sleep, Eat, Create.**",
    category: "about"
  },
  {
    title: "Tech Stack & Tools",
    keywords: ['skills', 'tools', 'languages', 'frameworks', 'libraries', 'databases', 'stack', 'tech', 'python', 'java', 'react', 'laravel', 'c++', 'php', 'javascript', 'html', 'css', 'mysql', 'bootstrap', 'streamlit', 'scikit-learn', 'javafx', 'jupyter', 'vite'],
    text: "I build with a variety of modern tools:\n\n• **Languages**: Python, Java, C++, PHP, JavaScript, HTML / CSS\n• **Frameworks & Libraries**: React, Next.js, Laravel, Tailwind CSS, Bootstrap, Scikit-learn, JavaFX, Streamlit\n• **Databases & Systems**: MySQL, Jupyter Notebook, Vite\n\nI specialize in creating performance-optimized animations and immersive layouts.",
    category: "tech_stack"
  },
  {
    title: "Current Focus & Interests",
    keywords: ['focus', 'learning', 'working on', 'lately', 'interest', 'now', 'current', 'cybersecurity', 'ml', 'ai'],
    text: "My current focus areas are:\n\n1. **Machine Learning** (training and evaluating predictive models)\n2. **Cybersecurity** (building secure systems)\n3. **Software Engineering** (designing responsive and robust architecture)\n\nI am constantly building practical, high-impact solutions through hands-on learning.",
    category: "focus"
  },
  {
    title: "Contact Information",
    keywords: ['contact', 'email', 'reach', 'linkedin', 'instagram', 'gmail', 'message', 'socials', 'hire', 'talk', 'send', 'mail', 'github', 'git'],
    text: "You can reach me here:\n\n• 📧 **Email**: jaylao03271@gmail.com\n• 🔗 **LinkedIn**: [linkedin.com/in/jaylao](https://www.linkedin.com/in/jaylao)\n• 📸 **Instagram**: [@xjay_lao](https://www.instagram.com/xjay_lao)\n• 💻 **GitHub**: [github.com/jaylao27](https://github.com/JayLao27)\n\nYou can also leave a message in the contact form at the bottom of this page, or simply tell me to **'send a message'** right here in this chat window!",
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
  text: `My projects (viewable on my GitHub profile [github.com/jaylao27](https://github.com/JayLao27)) include:\n\n` + 
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
const getSystemPrompt = (): string => {
  const projectsContext = projectsData
    .map(p => `- **${p.title}** (${p.category}): ${p.description}. Tech: ${p.technologies.join(', ')}.${p.link ? ` Repo: ${p.link}` : ''}`)
    .join('\n')

  return `You are Jay Lao. Just be yourself—casual, friendly, and genuine. Speak in first person ('I', 'me', 'my'). Think of this like chatting with someone at a coffee shop.

Who you are:
- Developer passionate about Machine Learning, Software Engineering, and Cybersecurity
- Started coding at age 5
- Tech: Python, Java, C++, JavaScript, React, Laravel, MySQL, and more

Your projects:
${projectsContext}

Contact:
- Email: jaylao03271@gmail.com
- LinkedIn: linkedin.com/in/jaylao (https://www.linkedin.com/in/jaylao)
- Instagram: @xjay_lao (https://www.instagram.com/xjay_lao)
- GitHub: github.com/jaylao27 (https://github.com/JayLao27)

Rules:
1. Be conversational and brief. No fluff, no corporate speak.
2. Use first person always. Be personable, not robotic.
3. Max one emoji per response.
4. Answer coding, math, or general questions normally. Relate back to your work if it fits naturally.
5. Format links as [Text](url).
6. Just talk to them like you're greeting a friend. Be yourself!
`
}

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
    } catch {
      // Ignore JSON parsing errors for error detail extraction
    }
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

const retrieveKnowledge = (query: string, apiError: string | null): string => {
    const tokens = query
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
      .split(/\s+/)
      .filter(token => token.length > 1 && !['the', 'a', 'is', 'of', 'and', 'in', 'to', 'what', 'about', 'how', 'you', 'me', 'on', 'for', 'are', 'with', 'do', 'can'].includes(token));

    if (tokens.length === 0) {
      return "Not sure what you mean! Ask me about my projects, skills, or how to reach me.";
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
        return `API's down right now, so I can only answer about my skills, projects, or contact info. Error: **${apiError}**`;
      }
      return "I can only talk about my background, skills, projects, and how to reach me right now. API's not set up for other topics.";
    }

    // Return top match
    const topMatch = matches[0];
    return topMatch.doc.text;
  }

const getBotResponse = (input: string, apiError: string | null): string => {
    const text = input.toLowerCase().trim()
    
    // Simple greeting handler
    const greetings = ['hello', 'hi', 'hey', 'yo', 'sup', 'greetings', 'hola']
    if (greetings.some(g => text === g || text.startsWith(g + ' '))) {
      const greetingOptions = [
        "Hey! 👋 What's up?",
        "Yo! What can I help with?",
        "Hi there! What would you like to know?",
        "Hey! How's it going?",
        "Sup! Got any questions for me?"
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
      return jokes[Math.floor(Math.random() * jokes.length)]
    }

    // Use client-side RAG retrieval
    const answer = retrieveKnowledge(input, apiError)
    
    // If it's a fallback answer, don't prepend prefixes
    if (answer.includes("offline search mode") || answer.includes("I'm here to help")) {
      return answer
    }
    
    // Keep it simple and personal
    return answer
  }

export const Chatbot: React.FC<ChatbotProps> = ({ isDarkMode, theme, isOpen, onClose, onOpen }) => {
  const getAccentColor = () => {
    switch (theme) {
      case 'dim': return '#1DD0A7'
      case 'graphite': return '#0ea5e9'
      case 'cream': return '#0F9B6E'
      default: return '#39F1DA'
    }
  }

  const getChatBgClass = () => {
    switch (theme) {
      case 'dim': return 'bg-[#15202B]/95 border-[#1DD0A7]/20 text-body-text'
      case 'graphite': return 'bg-[#1E2530]/95 border-[#0ea5e9]/20 text-[#94A3B8]'
      case 'cream': return 'bg-[#FAF9F5]/95 border-slate-300 text-light-body-text shadow-2xl'
      default: return 'bg-[#0A2B2F]/95 border-[#39F1DA]/20 text-name-text'
    }
  }

  const getHeaderBorderClass = () => {
    switch (theme) {
      case 'dim': return 'border-[#1DD0A7]/15 bg-black/20'
      case 'graphite': return 'border-[#0ea5e9]/15 bg-black/20'
      case 'cream': return 'border-slate-100 bg-slate-50'
      default: return 'border-[#39F1DA]/15 bg-black/20'
    }
  }

  const getHeaderTitleClass = () => {
    switch (theme) {
      case 'cream': return 'text-light-name-text'
      default: return 'text-white'
    }
  }

  const getBubbleClass = (sender: 'bot' | 'user') => {
    if (sender === 'user') {
      switch (theme) {
        case 'dim': return 'bg-[#1DD0A7] text-[#15202B] rounded-tr-none font-medium'
        case 'graphite': return 'bg-[#0ea5e9] text-[#121620] rounded-tr-none font-medium'
        case 'cream': return 'bg-[#0F9B6E] text-white rounded-tr-none font-medium'
        default: return 'bg-[#39F1DA] text-[#0A2B2F] rounded-tr-none font-medium'
      }
    } else {
      switch (theme) {
        case 'dim': return 'bg-[#192734] text-body-text rounded-tl-none border border-[#1DD0A7]/5'
        case 'graphite': return 'bg-[#121620] text-[#94A3B8] rounded-tl-none border border-[#0ea5e9]/5'
        case 'cream': return 'bg-slate-100 text-light-body-text rounded-tl-none border border-slate-200/50'
        default: return 'bg-[#112240] text-name-text rounded-tl-none border border-[#39F1DA]/5'
      }
    }
  }

  const getQuickReplyClass = () => {
    switch (theme) {
      case 'dim': return 'bg-[#192734] text-body-text border border-[#1DD0A7]/10 hover:border-[#1DD0A7] hover:text-white'
      case 'graphite': return 'bg-[#121620] text-[#94A3B8] border border-[#0ea5e9]/10 hover:border-[#0ea5e9] hover:text-white'
      case 'cream': return 'bg-slate-100 text-light-body-text border border-slate-200 hover:border-[#0F9B6E] hover:text-[#0F9B6E]'
      default: return 'bg-[#112240] text-name-text border border-[#39F1DA]/10 hover:border-[#39F1DA] hover:text-white'
    }
  }

  const getFormClass = () => {
    switch (theme) {
      case 'dim': return 'border-[#1DD0A7]/15 bg-black/25'
      case 'graphite': return 'border-[#0ea5e9]/15 bg-black/25'
      case 'cream': return 'border-slate-100 bg-white'
      default: return 'border-[#39F1DA]/15 bg-black/25'
    }
  }

  const getInputClass = () => {
    switch (theme) {
      case 'dim': return 'bg-[#192734] border border-[#1DD0A7]/10 focus:border-[#1DD0A7] text-white placeholder-slate-500'
      case 'graphite': return 'bg-[#121620] border border-[#0ea5e9]/10 focus:border-[#0ea5e9] text-white placeholder-slate-500'
      case 'cream': return 'bg-slate-100 border border-slate-200 focus:border-[#0F9B6E] text-slate-800 placeholder-slate-400'
      default: return 'bg-[#112240] border border-[#39F1DA]/10 focus:border-[#39F1DA] text-white placeholder-slate-500'
    }
  }

  const getButtonClass = () => {
    switch (theme) {
      case 'dim': return 'bg-[#1DD0A7] hover:bg-[#1DD0A7]/80 text-[#15202B]'
      case 'graphite': return 'bg-[#0ea5e9] hover:bg-[#0ea5e9]/80 text-[#121620]'
      case 'cream': return 'bg-[#0F9B6E] hover:bg-[#0F9B6E]/90 text-white'
      default: return 'bg-[#39F1DA] hover:bg-[#39F1DA]/80 text-[#0A2B2F]'
    }
  }

  const getFABGlowClass = () => {
    switch (theme) {
      case 'cream': return 'hover:shadow-[0_15px_30px_rgba(15,155,110,0.4)] shadow-[0_0_15px_rgba(15,155,110,0.1)]'
      case 'dim': return 'hover:shadow-[0_15px_30px_rgba(29,208,167,0.4)] shadow-[0_0_15px_rgba(29,208,167,0.1)]'
      case 'graphite': return 'hover:shadow-[0_15px_30px_rgba(14,165,233,0.4)] shadow-[0_0_15px_rgba(14,165,233,0.1)]'
      default: return 'hover:shadow-[0_15px_30px_rgba(68,139,178,0.4)] shadow-[0_0_15px_rgba(68,139,178,0.1)]'
    }
  }

  const getFABIconColorClass = () => {
    switch (theme) {
      case 'cream': return 'text-[#0F9B6E]'
      case 'dim': return 'text-[#1DD0A7]'
      case 'graphite': return 'text-[#0ea5e9]'
      default: return 'text-[#448BB2]'
    }
  }

  const getTooltipClass = () => {
    switch (theme) {
      case 'cream':
        return 'bg-white border-slate-200 text-light-body-text shadow-slate-200'
      case 'dim':
        return 'bg-[#192734] border-[#1DD0A7]/30 text-white shadow-black/40'
      case 'graphite':
        return 'bg-[#121620] border-[#0ea5e9]/30 text-white shadow-black/40'
      default:
        return 'bg-[#112240] border-[#39F1DA]/30 text-white shadow-black/40'
    }
  }

  const getTooltipArrowClass = () => {
    switch (theme) {
      case 'cream':
        return 'bg-white border-slate-200'
      case 'dim':
        return 'bg-[#192734] border-[#1DD0A7]/30'
      case 'graphite':
        return 'bg-[#121620] border-[#0ea5e9]/30'
      default:
        return 'bg-[#112240] border-[#39F1DA]/30'
    }
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hey! I'm Jay. Ask me anything about my work, projects, or how to reach me! 👋",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showFAB, setShowFAB] = useState(false)
  const [tooltipText, setTooltipText] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const [flowState, setFlowState] = useState<{
    active: boolean
    step: 'name' | 'email' | 'content' | 'confirm'
    name?: string
    email?: string
    content?: string
  }>({
    active: false,
    step: 'name'
  })

  // SUGGESTION: Implement a 'Clear Conversation' feature to allow resetting the chat history.
  const handleClearChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: "Hey! I'm Jay. Ask me anything about my work, projects, or how to reach me! 👋",
        timestamp: new Date()
      }
    ])
    setFlowState({ active: false, step: 'name' })
  }, [])

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
      const timeoutId = setTimeout(() => {
        setShowTooltip(false)
      }, 0)
      return () => clearTimeout(timeoutId)
    }

    const randomPrompts = [
      "Hey! Let's chat!",
      "What's my stack?",
      "Show me your projects!",
      "How to reach me?",
      "Ask me anything!",
      "Got questions?"
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

  const handleSend = useCallback(async (text: string) => {
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

    const lowerText = text.toLowerCase().trim()

    // Abort messaging flow if cancel signal received
    if (flowState.active && (lowerText === 'cancel' || lowerText === 'exit' || lowerText === 'abort' || lowerText === 'cancel flow ❌' || lowerText === 'cancel flow')) {
      setTimeout(() => {
        const cancelMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Direct message sending cancelled. What else can I assist you with?`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, cancelMsg])
        setFlowState({ active: false, step: 'name' })
        setIsTyping(false)
      }, 600)
      return
    }

    // If a direct messaging flow is active, intercept inputs
    if (flowState.active) {
      setTimeout(async () => {
        if (flowState.step === 'name') {
          setFlowState({
            active: true,
            step: 'email',
            name: text.trim()
          })
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: `Nice to meet you, **${text.trim()}**! What is your email address so I can reply back to you?`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, botMsg])
          setIsTyping(false)
        } 
        
        else if (flowState.step === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(text.trim())) {
            const botMsg: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: `Hmm, that email doesn't look quite right. Please write a valid email address so I can reach you:`,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, botMsg])
            setIsTyping(false)
            return
          }
          
          setFlowState(prev => ({
            ...prev,
            step: 'content',
            email: text.trim()
          }))
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: `Perfect! What message would you like to send to me? Write your content below:`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, botMsg])
          setIsTyping(false)
        } 
        
        else if (flowState.step === 'content') {
          setFlowState(prev => ({
            ...prev,
            step: 'confirm',
            content: text.trim()
          }))
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: `Here are the message details:\n\n• **Sender**: ${flowState.name}\n• **Email**: ${flowState.email}\n• **Message**: ${text.trim()}\n\nShall I send this message directly to my inbox?`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, botMsg])
          setIsTyping(false)
        } 
        
        else if (flowState.step === 'confirm') {
          const answer = text.toLowerCase().trim()
          if (answer === 'yes' || answer === 'send' || answer === 'y' || answer.includes('transmit') || answer.includes('ok') || answer.includes('yes, transmit! 🚀') || answer.includes('yes, send! 🚀')) {
            const botMsgId = (Date.now() + 2).toString()
            const sendingMsg: Message = {
              id: botMsgId,
              sender: 'bot',
              text: `Sending now......`,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, sendingMsg])
            
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
            if (!accessKey) {
              setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === botMsgId ? {
                  ...m,
                  text: `❌ **Sending Error.** The Web3Forms access key is not configured in this project. Please email me directly at jaylao03271@gmail.com.`
                } : m))
                setFlowState({ active: false, step: 'name' })
                setIsTyping(false)
              }, 1200)
              return
            }

            try {
              const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                  access_key: accessKey,
                  name: flowState.name,
                  email: flowState.email,
                  subject: `Chatbot Portal: Message from ${flowState.name}`,
                  message: flowState.content,
                  from_name: 'Jay Portfolio'
                })
              })
              const data = await response.json()
              if (response.ok && data.success) {
                setMessages(prev => prev.map(m => m.id === botMsgId ? {
                  ...m,
                  text: `🎉 **Success!** Your message has been successfully routed and delivered to my inbox. I will follow up with you at **${flowState.email}**.`
                } : m))
              } else {
                setMessages(prev => prev.map(m => m.id === botMsgId ? {
                  ...m,
                  text: `❌ **Failed to send.** Gateway returned an error: ${data.message || 'Unknown issue'}. Please try again later.`
                } : m))
              }
            } catch (err) {
              setMessages(prev => prev.map(m => m.id === botMsgId ? {
                ...m,
                text: `❌ **Network timeout.** Failed to send. Please try again or reach out at jaylao03271@gmail.com.`
              } : m))
            } finally {
              setFlowState({ active: false, step: 'name' })
              setIsTyping(false)
            }
          } else {
            const cancelMsg: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: `Sending cancelled. Returning to general queries. How else can I assist you?`,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, cancelMsg])
            setFlowState({ active: false, step: 'name' })
            setIsTyping(false)
          }
        }
      }, 800)
      return
    }

    // If a direct messaging keyword is typed, trigger the flow
    const triggers = ['send a message', 'message jay', 'send message', 'contact jay', 'email jay', 'write to jay', 'talk to jay', 'direct message', 'send a direct message']
    if (triggers.some(t => lowerText === t || lowerText.includes(t))) {
      setTimeout(() => {
        setFlowState({
          active: true,
          step: 'name'
        })
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `I can compile and route a direct email message to me right now! Let's get it set up. First, what is your name?`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMsg])
        setIsTyping(false)
      }, 800)
      return
    }

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
      } catch (err: unknown) {
        console.error("Groq API error, falling back to local RAG retrieval:", err)
        apiError = err instanceof Error ? err.message : String(err)
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
  }, [messages, flowState])

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
              isDarkMode ? 'text-highlight hover:text-white' : 'text-[#0F9B6E] hover:text-[#0d855e]'
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

  const quickReplies = flowState.active
    ? flowState.step === 'confirm'
      ? [
          { label: 'Yes, Send! 🚀', query: 'yes' },
          { label: 'Cancel ❌', query: 'cancel' }
        ]
      : [{ label: 'Cancel Flow ❌', query: 'cancel' }]
    : [
        { label: 'Skills 🛠️', query: 'What are your skills?' },
        { label: 'Projects 💻', query: 'Show me your projects.' },
        { label: 'Message Me ✉️', query: 'send a direct message' }
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
          } ${getTooltipClass()}`}
        >
          {tooltipText}
          {/* Arrow */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 border-t border-r ${getTooltipArrowClass()}`}
          />
        </div>

        <button
          onClick={onOpen}
          className={`w-[62px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 ${getFABGlowClass()}`}
          style={{ background: 'transparent', border: 'none', padding: 0 }}
          aria-label="Open Chatbot"
        >
          <MessageIcon className={`${getFABIconColorClass()} drop-shadow-lg`} />
        </button>
      </div>

      {/* Chat Window Dialog */}
      <div
        className={`fixed bottom-24 right-8 z-[2000] w-96 max-md:w-[calc(100vw-2rem)] max-md:right-4 h-[500px] rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-out transform ${
          isOpen ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        } ${getChatBgClass()}`}
      >
        {/* Header */}
        <div
          className={`px-4 py-3.5 rounded-t-2xl flex items-center justify-between border-b ${getHeaderBorderClass()}`}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border" style={{ borderColor: getAccentColor() }}>
              <img src="/images/jaychat.jpg" alt="Jay" className="w-full h-full object-cover" />
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 ${theme === 'cream' ? 'border-slate-50' : 'border-[#0A2B2F]'} animate-pulse`}></span>
            </div>
            <div>
              <h3 className={`font-['Syne'] font-bold text-sm leading-none ${getHeaderTitleClass()}`}>
                Jay Lao
              </h3>
              <span className="text-[10px] opacity-60">Chat with Jay (AI Assistant)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                theme === 'cream' ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-900' : 'hover:bg-white/10 text-name-text hover:text-white'
              }`}
              title="Clear conversation"
              aria-label="Clear conversation history"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                theme === 'cream' ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-900' : 'hover:bg-white/10 text-name-text hover:text-white'
              }`}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Message Box */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                  <img src="/images/jaychat.jpg" alt="Jay" className="w-full h-full object-cover" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${getBubbleClass(msg.sender)}`}
              >
                {parseMarkdown(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start gap-2 items-start">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border" style={{ borderColor: theme === 'cream' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                <img src="/images/jaychat.jpg" alt="Jay" className="w-full h-full object-cover" />
              </div>
              <div
                className={`rounded-2xl px-4 py-3 rounded-tl-none flex items-center gap-1 ${
                  theme === 'cream' ? 'bg-slate-100 border border-slate-200/50' : 'bg-white/5 border border-white/5'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'cream' ? 'bg-slate-400' : 'bg-current'}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'cream' ? 'bg-slate-400' : 'bg-current'}`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === 'cream' ? 'bg-slate-400' : 'bg-current'}`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Replies */}
        <div className={`px-4 py-2 flex flex-wrap gap-2 border-t ${theme === 'cream' ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-black/10'}`}>
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(reply.query)}
              className={`text-xs px-2.5 py-1.5 rounded-full transition-all duration-300 ${getQuickReplyClass()}`}
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
          className={`p-3 border-t flex gap-2 items-center rounded-b-2xl ${getFormClass()}`}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className={`flex-1 px-4 py-2 text-sm rounded-full focus:outline-none transition-all ${getInputClass()}`}
          />
          <button
            type="submit"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${getButtonClass()}`}
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
          background: ${theme === 'cream' ? 'rgba(15, 155, 110, 0.1)' : theme === 'dim' ? 'rgba(29, 208, 167, 0.1)' : theme === 'graphite' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(57, 241, 218, 0.1)'};
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'cream' ? 'rgba(15, 155, 110, 0.3)' : theme === 'dim' ? 'rgba(29, 208, 167, 0.3)' : theme === 'graphite' ? 'rgba(14, 165, 233, 0.3)' : 'rgba(57, 241, 218, 0.3)'};
        }
      `}</style>
    </>
  )
}
