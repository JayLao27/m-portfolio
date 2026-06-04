import { useEffect, useRef } from 'react'

interface AdvancedCursorSpotlightProps {
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  intensity?: number
  size?: number
}

export const AdvancedCursorSpotlight: React.FC<AdvancedCursorSpotlightProps> = ({ 
  theme,
  intensity = 0.2,
  size = 500
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Smooth lerp animation
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      currentPosition.current.x = lerp(
        currentPosition.current.x,
        mousePosition.current.x,
        0.15
      )
      currentPosition.current.y = lerp(
        currentPosition.current.y,
        mousePosition.current.y,
        0.15
      )

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient spotlight
      const gradient = ctx.createRadialGradient(
        currentPosition.current.x,
        currentPosition.current.y,
        0,
        currentPosition.current.x,
        currentPosition.current.y,
        size
      )

      const getSpotlightRGB = () => {
        switch (theme) {
          case 'cream': return '15, 155, 110' // Forest Green
          case 'dim': return '29, 208, 167' // Emerald Teal
          case 'graphite': return '14, 165, 233' // Sky Blue
          default: return '94, 238, 255' // Neon Cyan
        }
      }

      const rgb = getSpotlightRGB()

      gradient.addColorStop(0, `rgba(${rgb}, ${intensity * 0.8})`)
      gradient.addColorStop(0.2, `rgba(${rgb}, ${intensity * 0.4})`)
      gradient.addColorStop(0.4, `rgba(${rgb}, ${intensity * 0.2})`)
      gradient.addColorStop(0.6, `rgba(${rgb}, ${intensity * 0.1})`)
      gradient.addColorStop(1, `rgba(${rgb}, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add inner glow
      const innerGradient = ctx.createRadialGradient(
        currentPosition.current.x,
        currentPosition.current.y,
        0,
        currentPosition.current.x,
        currentPosition.current.y,
        size * 0.3
      )

      innerGradient.addColorStop(0, `rgba(${rgb}, ${intensity * 1.5})`)
      innerGradient.addColorStop(0.5, `rgba(${rgb}, ${intensity * 0.5})`)
      innerGradient.addColorStop(1, `rgba(${rgb}, 0)`)

      ctx.fillStyle = innerGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [theme, intensity, size])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.6
      }}
    />
  )
}