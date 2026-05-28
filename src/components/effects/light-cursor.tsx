// @ts-nocheck
'use client'
import { useEffect, useRef, useState } from 'react'

const useSpotlightEffect = (config = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.8,
    fadeSpeed = 0.1,
    glowColor = '255, 255, 255',
    pulseSpeed = 2000,
  } = config

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const spotlightPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const animationFrame = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const render = () => {
      if (!canvas || !ctx) return

      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      )
      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      )

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Pulse
      const pulse =
        1 + 0.1 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2)
      const size = spotlightSize * pulse

      // Cut hole
      const gradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        size
      )

      gradient.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`)
      gradient.addColorStop(
        0.5,
        `rgba(${glowColor}, ${spotlightIntensity * 0.5})`
      )
      gradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        size,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Glow
      ctx.globalCompositeOperation = 'source-over'
      const glow = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        size * 1.2
      )
      glow.addColorStop(0, `rgba(${glowColor}, 0.2)`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        size * 1.2,
        0,
        Math.PI * 2
      )
      ctx.fill()

      animationFrame.current = requestAnimationFrame(render)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed])

  return canvasRef
}

export default useSpotlightEffect
