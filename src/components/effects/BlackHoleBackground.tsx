import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BlackHoleBackgroundProps {
  theme: 'dark' | 'dim' | 'graphite' | 'cream'
  isDarkMode: boolean
}

// ─── Seeded PRNG (Mulberry32) for deterministic generation ──────────────────
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

export const BlackHoleBackground: React.FC<BlackHoleBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // GSAP-driven scroll parameters
  const animParams = useRef({
    cloudsProgress: 0,
    aboutProgress: 0,
    projectsProgress: 0,
    certsProgress: 0,
    contactProgress: 0,
  })

  // ── ScrollTrigger setup ────────────────────────────────────────────────────
  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    tweens.push(gsap.to(animParams.current, {
      cloudsProgress: 1,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: '+=100%', scrub: 0.6, invalidateOnRefresh: true }
    }))
    tweens.push(gsap.to(animParams.current, {
      aboutProgress: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top top', scrub: 0.6, invalidateOnRefresh: true }
    }))
    tweens.push(gsap.to(animParams.current, {
      projectsProgress: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top top', scrub: 0.6, invalidateOnRefresh: true }
    }))
    tweens.push(gsap.to(animParams.current, {
      certsProgress: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#certifications', start: 'top bottom', end: 'top top', scrub: 0.6, invalidateOnRefresh: true }
    }))
    tweens.push(gsap.to(animParams.current, {
      contactProgress: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'top top', scrub: 0.6, invalidateOnRefresh: true }
    }))

    return () => tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill() })
  }, [])

  // ── Main canvas loop ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // ── Offscreen canvases for cached static layers ──────────────────────────
    const starCanvas = document.createElement('canvas')
    const starCtx = starCanvas.getContext('2d')!
    const nebulaCanvas = document.createElement('canvas')
    const nebulaCtx = nebulaCanvas.getContext('2d')!

    let animId: number
    let time = 0
    let width = 0, height = 0
    let starsDirty = true
    let nebulaDirty = true

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      starCanvas.width = width; starCanvas.height = height
      nebulaCanvas.width = width; nebulaCanvas.height = height
      starsDirty = true
      nebulaDirty = true
      initParticles()
    }
    window.addEventListener('resize', resize)

    // ── Seeded RNG ─────────────────────────────────────────────────────────
    const rng = mulberry32(0xDEADBEEF)

    // ── Stars (typed array: x, y, size, alpha, twinkleSpeed, phase) ─────────
    const STAR_COUNT = 220
    const STAR_FIELDS = 6
    const starData = new Float32Array(STAR_COUNT * STAR_FIELDS)
    const initStars = () => {
      for (let i = 0; i < STAR_COUNT; i++) {
        const b = i * STAR_FIELDS
        starData[b + 0] = rng() * width
        starData[b + 1] = rng() * height * 0.7
        starData[b + 2] = 0.4 + rng() * 1.8  // size
        starData[b + 3] = rng() * 0.85 + 0.1 // alpha
        starData[b + 4] = (0.003 + rng() * 0.007) * (rng() > 0.5 ? 1 : -1) // twinkleSpeed
        starData[b + 5] = rng() * Math.PI * 2  // phase
      }
    }

    // ── Accretion disk particles (typed arrays) ──────────────────────────────
    const PART_COUNT = 1100
    const PART_FIELDS = 5 // r, theta, speed, size, alpha
    const partData = new Float32Array(PART_COUNT * PART_FIELDS)
    const Rs = 58

    const initParticles = () => {
      for (let i = 0; i < PART_COUNT; i++) {
        const b = i * PART_FIELDS
        const rand = rng()
        const r = Rs + 8 + Math.pow(rand, 2.0) * 290
        partData[b + 0] = r
        partData[b + 1] = rng() * Math.PI * 2
        partData[b + 2] = (0.016 + rng() * 0.014) * Math.pow(Rs / r, 1.5)
        partData[b + 3] = 0.5 + rng() * 1.7
        partData[b + 4] = Math.max(0.1, 1.0 - (r - Rs) / 290)
      }
    }

    // ── Grass blades (typed arrays: xOffset, height, tilt, phase) ────────────
    const mkBlades = (count: number, minH: number, maxH: number) => {
      const d = new Float32Array(count * 4)
      const xs: number[] = []
      for (let i = 0; i < count; i++) xs.push(rng())
      xs.sort((a, b) => a - b)
      for (let i = 0; i < count; i++) {
        const b = i * 4
        d[b + 0] = xs[i]
        d[b + 1] = minH + rng() * (maxH - minH)
        d[b + 2] = -2 + rng() * 4
        d[b + 3] = rng() * Math.PI * 2
      }
      return d
    }
    const BACK_BLADE_COUNT = 80
    const MID_BLADE_COUNT = 120
    const FRONT_BLADE_COUNT = 150
    const backBlades = mkBlades(BACK_BLADE_COUNT, 6, 13)
    const midBlades  = mkBlades(MID_BLADE_COUNT,  10, 20)
    const frontBlades= mkBlades(FRONT_BLADE_COUNT,16, 30)

    // ── Fireflies / spores (typed: x, y, vx, vy, size, alpha, twSpeed, phase)
    const SPORE_COUNT = 28
    const SPORE_FIELDS = 8
    const sporeData = new Float32Array(SPORE_COUNT * SPORE_FIELDS)
    const initSpores = () => {
      for (let i = 0; i < SPORE_COUNT; i++) {
        const b = i * SPORE_FIELDS
        sporeData[b + 0] = rng() * width
        sporeData[b + 1] = height * 0.5 + rng() * height * 0.5
        sporeData[b + 2] = -0.25 + rng() * 0.5
        sporeData[b + 3] = -0.18 - rng() * 0.4
        sporeData[b + 4] = 1.0 + rng() * 2.2
        sporeData[b + 5] = rng()
        sporeData[b + 6] = 0.005 + rng() * 0.012
        sporeData[b + 7] = rng() * Math.PI * 2
      }
    }

    // ── Asteroid belt (typed: r, theta, speed, size, sides, seed) ────────────
    const AST_COUNT = 18
    const AST_FIELDS = 6
    const astData = new Float32Array(AST_COUNT * AST_FIELDS)
    const initAsteroids = () => {
      for (let i = 0; i < AST_COUNT; i++) {
        const b = i * AST_FIELDS
        const rand = rng()
        const r = Rs * 2.8 + rand * 200
        astData[b + 0] = r
        astData[b + 1] = rng() * Math.PI * 2
        astData[b + 2] = (0.006 + rng() * 0.010) * Math.pow(Rs / r, 1.2)
        astData[b + 3] = 5 + rng() * 14
        astData[b + 4] = 5 + Math.floor(rng() * 4) // sides
        astData[b + 5] = rng() * 100 // seed
      }
    }

    // ── Cloud hump data (static screen-space layout) ─────────────────────────
    // Each hump: [xOffset, yOffset, sizeOffset]
    const leftHumps  = [
      [-0.06, 0.12, 0.40], [0.07, 0.26, 0.31], [0.15, 0.43, 0.25],
      [0.10, 0.62, 0.27],  [0.04, 0.77, 0.32], [-0.06, 0.93, 0.41],
      [0.03, 0.03, 0.26],  [-0.02, 0.50, 0.22],
    ]
    const rightHumps = [
      [1.06, 0.12, 0.40], [0.93, 0.26, 0.31], [0.85, 0.43, 0.25],
      [0.90, 0.62, 0.27], [0.96, 0.77, 0.32], [1.06, 0.93, 0.41],
      [0.97, 0.03, 0.26], [1.02, 0.50, 0.22],
    ]

    // ── Aurora wave bands (static offsets) ───────────────────────────────────
    const AURORA_BANDS = 6
    const auroraPhases = Array.from({ length: AURORA_BANDS }, (_, i) => i * 0.72 + rng() * 1.2)
    const auroraColors = [
      'rgba(0,255,180,',
      'rgba(0,220,255,',
      'rgba(80,100,255,',
      'rgba(0,255,140,',
      'rgba(40,200,255,',
      'rgba(120,80,255,',
    ]

    // ── Mouse parallax ───────────────────────────────────────────────────────
    let mx = 0, my = 0, tmx = 0, tmy = 0
    const onMouseMove = (e: MouseEvent) => { tmx = e.clientX; tmy = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    // ── Re-render star offscreen canvas ──────────────────────────────────────
    const renderStarCache = () => {
      starCtx.clearRect(0, 0, width, height)
      for (let i = 0; i < STAR_COUNT; i++) {
        const b = i * STAR_FIELDS
        const a = starData[b + 3]
        const sz = starData[b + 2]
        starCtx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`
        // Some stars have a blue-white tint
        if (i % 7 === 0) starCtx.fillStyle = `rgba(180,210,255,${a.toFixed(2)})`
        if (i % 11 === 0) starCtx.fillStyle = `rgba(255,220,180,${a.toFixed(2)})`
        starCtx.fillRect(starData[b], starData[b + 1], sz, sz)
      }
      starsDirty = false
    }

    // ── Render nebula offscreen canvas ────────────────────────────────────────
    const renderNebulaCache = () => {
      nebulaCtx.clearRect(0, 0, width, height)
      const nebulae = [
        { x: 0.44, y: 0.36, r: 160, c1: 'rgba(160,60,255,0.18)',  c2: 'rgba(100,0,200,0.05)' },
        { x: 0.56, y: 0.32, r: 200, c1: 'rgba(255,100,60,0.14)',  c2: 'rgba(200,50,30,0.03)' },
        { x: 0.50, y: 0.42, r: 130, c1: 'rgba(255,170,100,0.12)', c2: 'rgba(200,100,60,0.02)' },
        { x: 0.30, y: 0.22, r: 110, c1: 'rgba(60,80,255,0.12)',   c2: 'rgba(0,40,180,0.02)' },
        { x: 0.70, y: 0.20, r: 130, c1: 'rgba(255,50,120,0.11)',  c2: 'rgba(180,0,80,0.02)' },
        { x: 0.50, y: 0.55, r: 180, c1: 'rgba(0,200,160,0.09)',   c2: 'rgba(0,120,100,0.02)' },
      ]
      nebulae.forEach(n => {
        const nx = n.x * width
        const ny = n.y * height
        const grad = nebulaCtx.createRadialGradient(nx, ny, n.r * 0.04, nx, ny, n.r)
        grad.addColorStop(0, n.c1)
        grad.addColorStop(0.5, n.c2)
        grad.addColorStop(1, 'transparent')
        nebulaCtx.fillStyle = grad
        nebulaCtx.beginPath()
        nebulaCtx.arc(nx, ny, n.r, 0, Math.PI * 2)
        nebulaCtx.fill()
      })
      nebulaDirty = false
    }

    // ── Easing helpers ────────────────────────────────────────────────────────
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    const clamp = (v: number, lo: number, hi: number) => v < lo ? lo : v > hi ? hi : v

    // ── Sky gradient (cached by scroll state) ────────────────────────────────
    let lastSkyHash = -1
    let skyGradCache: CanvasGradient | null = null

    // ── bg particle draw buffers (reuse between frames) ─────────────────────
    // We store [sx, sy, size, colorIndex, alpha] for bg & fg separately
    // colorIndex: 0=white-blue, 1=yellow-orange, 2=dark-red
    const MAX_PARTS = PART_COUNT
    const bgBuf = new Float32Array(MAX_PARTS * 5)
    const fgBuf = new Float32Array(MAX_PARTS * 5)

    // ── Draw Loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      animId = requestAnimationFrame(draw)
      time++

      const ap = animParams.current
      const cp  = ap.cloudsProgress
      const abp = ap.aboutProgress
      const prp = ap.projectsProgress
      const cep = ap.certsProgress
      const cop = ap.contactProgress

      // ── Camera matrix ──────────────────────────────────────────────────────
      const zoom = clamp(4.0 - abp * 1.35 - prp * 0.75 - cep * 0.55 - cop * 0.35, 0.9, 4.0)
      const skyWorldY = height * 0.16
      const cameraY = skyWorldY + (abp * 0.09 + prp * 0.09 + cep * 0.09 + cop * 0.04) * height
      const cx = width  / 2
      const cy = height / 2
      const projX = (wx: number) => cx + (wx - cx) * zoom
      const projY = (wy: number) => cy + (wy - cameraY) * zoom

      // ── Mouse smooth ──────────────────────────────────────────────────────
      mx += (tmx - mx) * 0.06
      my += (tmy - my) * 0.06
      const mox = (mx - cx) * 0.035 * zoom
      const moy = (my - cy) * 0.035 * zoom
      const bhx = cx + mox
      const bhy = projY(skyWorldY) + moy

      // ─────────────────────────────────────────────────────────────────────
      // 0. BACKGROUND — deep space gradient
      // ─────────────────────────────────────────────────────────────────────
      const skyHash = Math.round(abp * 40) + Math.round(cep * 40) * 100
      if (skyHash !== lastSkyHash || !skyGradCache) {
        skyGradCache = ctx.createLinearGradient(0, 0, 0, height)
        // Gradually shift from cosmic purple → dawn teal as we approach contact
        const tt = easeInOut(clamp(abp + cep * 0.5 + cop * 0.3, 0, 1))
        skyGradCache.addColorStop(0, `hsl(240,60%,${Math.round(2 + tt * 3)}%)`)
        skyGradCache.addColorStop(0.25, `hsl(260,50%,${Math.round(4 + tt * 4)}%)`)
        skyGradCache.addColorStop(0.55, `hsl(280,45%,${Math.round(6 + tt * 5)}%)`)
        skyGradCache.addColorStop(0.80, `hsl(340,45%,${Math.round(9 + tt * 8)}%)`)
        skyGradCache.addColorStop(1.0, `hsl(${160 - tt * 20},40%,${Math.round(7 + tt * 10)}%)`)
        lastSkyHash = skyHash
      }
      ctx.fillStyle = skyGradCache
      ctx.fillRect(0, 0, width, height)

      // ─────────────────────────────────────────────────────────────────────
      // 1. STARS (offscreen cached, twinkling via opacity update)
      // ─────────────────────────────────────────────────────────────────────
      for (let i = 0; i < STAR_COUNT; i++) {
        const b = i * STAR_FIELDS
        starData[b + 3] += starData[b + 4]
        if (starData[b + 3] > 0.95 || starData[b + 3] < 0.05) starData[b + 4] = -starData[b + 4]
        starsDirty = true
      }
      if (starsDirty) renderStarCache()

      // Project stars against black hole lensing
      const bhRs = Rs * zoom
      const bhRsSq = bhRs * bhRs
      ctx.save()
      ctx.drawImage(starCanvas, 0, 0)
      ctx.restore()

      // ─────────────────────────────────────────────────────────────────────
      // 2. NEBULA (offscreen cached, just composited)
      // ─────────────────────────────────────────────────────────────────────
      if (nebulaDirty) renderNebulaCache()
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.globalAlpha = 0.7
      ctx.drawImage(nebulaCanvas, 0, 0)
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()

      // ─────────────────────────────────────────────────────────────────────
      // 3. AURORA BOREALIS (visible through the whole scroll, peaks at certs)
      // ─────────────────────────────────────────────────────────────────────
      const auroraAlpha = clamp(abp * 0.6 + cep * 0.5, 0, 0.85)
      if (auroraAlpha > 0.01) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        for (let ai = 0; ai < AURORA_BANDS; ai++) {
          const bandY = height * (0.08 + ai * 0.06)
          const waveAmp = height * (0.04 + ai * 0.012)
          const speed = 0.004 + ai * 0.002
          const phase = auroraPhases[ai]
          const alpha = auroraAlpha * (0.22 + 0.18 * Math.sin(time * 0.008 + ai * 1.1)) / AURORA_BANDS
          const bandHeight = height * (0.04 + ai * 0.015)

          ctx.beginPath()
          ctx.moveTo(0, bandY)
          for (let x = 0; x <= width; x += 12) {
            const wx = cx + (x - cx) / zoom
            const yWave = Math.sin(wx * 0.003 + time * speed + phase) * waveAmp +
                          Math.sin(wx * 0.0015 + time * speed * 0.6 + phase * 1.3) * waveAmp * 0.4
            ctx.lineTo(x, bandY + yWave)
          }
          ctx.lineTo(width, bandY + bandHeight * 3)
          ctx.lineTo(0, bandY + bandHeight * 3)
          ctx.closePath()

          const aGrad = ctx.createLinearGradient(0, bandY, 0, bandY + bandHeight * 3)
          aGrad.addColorStop(0, auroraColors[ai] + `${alpha})`)
          aGrad.addColorStop(0.5, auroraColors[ai] + `${alpha * 0.5})`)
          aGrad.addColorStop(1, auroraColors[ai] + '0)')
          ctx.fillStyle = aGrad
          ctx.fill()
        }
        ctx.globalCompositeOperation = 'source-over'
        ctx.restore()
      }

      // ─────────────────────────────────────────────────────────────────────
      // 4. ACCRETION DISK (typed-array particles)
      // ─────────────────────────────────────────────────────────────────────
      const pitch = 0.24
      const cosPitch = Math.cos(pitch)
      const sinPitch = Math.sin(pitch)
      let bgCount = 0, fgCount = 0

      for (let i = 0; i < PART_COUNT; i++) {
        const b = i * PART_FIELDS
        partData[b + 1] -= partData[b + 2] // theta

        // Spiral inward
        const r = partData[b + 0]
        const infall = 0.055 * Math.sqrt(Rs / r)
        partData[b + 0] = r - infall
        if (partData[b + 0] <= Rs) {
          partData[b + 0] = Rs * 3.2 + rng() * 120
          partData[b + 1] = rng() * Math.PI * 2
          const newR = partData[b + 0]
          partData[b + 2] = (0.016 + rng() * 0.014) * Math.pow(Rs / newR, 1.5)
          continue
        }

        const cosT = Math.cos(partData[b + 1])
        const sinT = Math.sin(partData[b + 1])
        const curR = partData[b + 0]
        const doppler = 1.0 - 0.7 * cosT

        const px = curR * cosT
        const pz = curR * sinT
        const py = Math.sin(partData[b + 1] * 3) * curR * 0.016
        const x3 = px
        const y3 = py * cosPitch - pz * sinPitch
        const z3 = py * sinPitch + pz * cosPitch

        const d = Math.sqrt(x3 * x3 + y3 * y3)
        const phi = Math.atan2(y3, x3)
        const ratio = z3 < 0 ? -z3 / curR : 0
        const w = ratio > 0 ? Math.pow(clamp(ratio, 0, 1), 3) : 0
        const lensedR = Rs + (curR - Rs) * 0.36 + 12
        const finalR = d * (1 - w) + lensedR * w
        const projR = finalR * zoom

        const sx = projR * Math.cos(phi) + bhx
        const sy = projR * Math.sin(phi) + bhy

        // Color index: 0=blue-white, 1=yellow-orange, 2=dark-red
        const pct = (curR - Rs) / 290
        let ci = 0
        if (cosT >= -0.4 && cosT < 0.2) ci = 1
        else if (cosT >= 0.2) ci = pct < 0.3 ? 2 : 3

        const alpha = partData[b + 4] * doppler * Math.min(1.0, zoom * 0.85)
        const size  = partData[b + 3] * (0.75 + 0.35 * doppler) * Math.min(2.0, zoom)

        if (z3 < 0) {
          const bb = bgCount * 5
          bgBuf[bb]=sx; bgBuf[bb+1]=sy; bgBuf[bb+2]=size; bgBuf[bb+3]=ci; bgBuf[bb+4]=alpha
          bgCount++
        } else {
          const fb = fgCount * 5
          fgBuf[fb]=sx; fgBuf[fb+1]=sy; fgBuf[fb+2]=size; fgBuf[fb+3]=ci; fgBuf[fb+4]=alpha
          fgCount++
        }
      }

      const PART_COLORS = [
        ['230,245,255,', '255,250,230,'],
        ['255,230,80,',  '255,150,20,'],
        ['240,80,15,',   '180,25,5,'],
        ['160,20,5,',    '100,10,2,'],
      ]

      const drawPartBuf = (buf: Float32Array, count: number) => {
        for (let i = 0; i < count; i++) {
          const b = i * 5
          const ci = Math.min(3, buf[b+3] | 0)
          const pct2 = ci === 0 ? (i % 2) : (i % 2)
          ctx.fillStyle = `rgba(${PART_COLORS[ci][pct2 % 2]}${buf[b+4].toFixed(2)})`
          
          // Draw smooth circles instead of pixelated squares
          ctx.beginPath()
          ctx.arc(buf[b], buf[b+1], buf[b+2] * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ── Volumetric Accretion Gas Lane (Tilted background glow) ─────────────
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.translate(bhx, bhy)
      ctx.rotate(pitch) // Rotate by pitch angle to align with the particle plane
      
      const diskW = Rs * 5.2 * zoom
      const diskH = Rs * 1.5 * zoom
      const diskGrad = ctx.createRadialGradient(0, 0, Rs * 0.8 * zoom, 0, 0, diskW)
      diskGrad.addColorStop(0, 'rgba(255, 255, 255, 0.40)')   // Hot white center
      diskGrad.addColorStop(0.12, 'rgba(255, 165, 30, 0.25)') // Golden gas lane
      diskGrad.addColorStop(0.38, 'rgba(225, 55, 30, 0.12)')  // Crimson redshifted gas
      diskGrad.addColorStop(0.80, 'rgba(95, 25, 150, 0.04)')  // Faint violet halo
      diskGrad.addColorStop(1, 'transparent')
      
      ctx.fillStyle = diskGrad
      ctx.beginPath()
      ctx.ellipse(0, 0, diskW, diskH, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      drawPartBuf(bgBuf, bgCount)

      // ── Photon ring & event horizon ────────────────────────────────────────
      // Outer glow halo (intense scattering near event horizon)
      const halo = ctx.createRadialGradient(bhx, bhy, (Rs - 6) * zoom, bhx, bhy, (Rs + 58) * zoom)
      halo.addColorStop(0, 'rgba(255,255,255,0.92)')
      halo.addColorStop(0.12, 'rgba(255,215,50,0.78)')
      halo.addColorStop(0.32, 'rgba(255,75,10,0.28)')
      halo.addColorStop(0.72, 'rgba(110,25,170,0.08)')
      halo.addColorStop(1, 'transparent')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(bhx, bhy, (Rs + 58) * zoom, 0, Math.PI * 2)
      ctx.fill()

      // Event horizon — solid black core
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(bhx, bhy, (Rs - 1) * zoom, 0, Math.PI * 2)
      ctx.fill()

      // Photon ring with chromatic aberration
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      for (const [offX, color, lw] of [
        [-2 * zoom, 'rgba(255,60,100,0.55)', 2.2 * zoom],
        [+2 * zoom, 'rgba(60,120,255,0.55)', 2.2 * zoom],
        [0, 'rgba(255,250,200,0.92)', 1.4 * zoom],
      ] as [number, string, number][]) {
        ctx.strokeStyle = color
        ctx.lineWidth = lw
        ctx.shadowColor = 'rgba(255,160,0,0.9)'
        ctx.shadowBlur = 10 * zoom
        ctx.beginPath()
        ctx.arc(bhx + offX, bhy, Rs * zoom + 0.5 * zoom, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()

      // Volumetric light rays
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      for (let j = 0; j < 10; j++) {
        const angle = time * 0.0025 + (j * Math.PI) / 5
        const rayLen = (Rs * 7.5) * zoom
        const rg = ctx.createRadialGradient(bhx, bhy, 0, bhx, bhy, rayLen)
        const rayColors = [
          'rgba(255,80,50,0.10)', 'rgba(255,180,40,0.10)', 'rgba(40,255,100,0.07)',
          'rgba(40,180,255,0.09)', 'rgba(200,50,255,0.10)', 'rgba(255,255,60,0.08)',
        ]
        rg.addColorStop(0, rayColors[j % rayColors.length])
        rg.addColorStop(1, 'transparent')
        ctx.fillStyle = rg
        ctx.beginPath()
        ctx.moveTo(bhx, bhy)
        ctx.arc(bhx, bhy, rayLen, angle - 0.12, angle + 0.12)
        ctx.closePath()
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()

      // Draw fg accretion particles (in front of photon ring)
      drawPartBuf(fgBuf, fgCount)

      // ─────────────────────────────────────────────────────────────────────
      // 5. ASTEROID BELT (About Me → fades out by Projects)
      // ─────────────────────────────────────────────────────────────────────
      const astAlpha = abp * (1 - prp)
      if (astAlpha > 0.01) {
        for (let i = 0; i < AST_COUNT; i++) {
          const b = i * AST_FIELDS
          astData[b + 1] -= astData[b + 2]
          const ar = astData[b + 0], aTheta = astData[b + 1]
          const ax = bhx + ar * Math.cos(aTheta) * zoom
          const ay = bhy + ar * Math.sin(aTheta) * 0.22 * zoom
          const sides = astData[b + 4] | 0
          const seed = astData[b + 5]
          const aSize = astData[b + 3]
          ctx.save()
          ctx.globalAlpha = astAlpha
          ctx.translate(ax, ay)
          ctx.rotate(time * 0.004 + seed)
          ctx.fillStyle = '#334155'
          ctx.beginPath()
          for (let s = 0; s < sides; s++) {
            const ang = (s * Math.PI * 2) / sides
            const off = (Math.sin(s * 3 + seed * 10) * 0.22) * aSize
            const rad = aSize + off
            if (s === 0) ctx.moveTo(rad * Math.cos(ang), rad * Math.sin(ang))
            else ctx.lineTo(rad * Math.cos(ang), rad * Math.sin(ang))
          }
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        }
      }

      // ─────────────────────────────────────────────────────────────────────
      // 6. ASTRONAUT (About Me visual system)
      // ─────────────────────────────────────────────────────────────────────
      if (astAlpha > 0.01) {
        const aax = width * 0.30 + Math.sin(time * 0.004) * 45
        const aay = height * 0.43 + Math.cos(time * 0.005) * 28
        const sc = 0.6
        ctx.save()
        ctx.globalAlpha = astAlpha
        ctx.translate(aax, aay)
        ctx.scale(sc * zoom, sc * zoom)
        ctx.rotate(Math.sin(time * 0.013) * 0.14)

        // Suit
        ctx.fillStyle = '#f1f5f9'; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.roundRect(-14, -15, 28, 30, 8); ctx.fill(); ctx.stroke()
        // Helmet
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(0, -22, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        // Visor
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(0, -22, 7.5, 5.5, 0, -Math.PI * 0.8, Math.PI * 0.8); ctx.fill()
        // Visor glare
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.ellipse(-2, -24, 2.5, 1.2, Math.PI / 4, 0, Math.PI * 2); ctx.fill()
        // Backpack
        ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.roundRect(-22, -18, 13, 32, 4); ctx.fill(); ctx.stroke()
        // Arm left
        const armS = Math.cos(time * 0.011) * 0.14
        ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.moveTo(-14,-10)
        ctx.quadraticCurveTo(-24,-12+armS*10,-27,-2); ctx.lineTo(-23,0); ctx.quadraticCurveTo(-21,-8+armS*8,-14,-4); ctx.closePath(); ctx.fill(); ctx.stroke()
        // Arm right
        ctx.beginPath(); ctx.moveTo(14,-10)
        ctx.quadraticCurveTo(23,-14-armS*8,27,-18); ctx.lineTo(27,-14); ctx.quadraticCurveTo(19,-10-armS*8,14,-4); ctx.closePath(); ctx.fill(); ctx.stroke()
        // Legs
        const legS = Math.sin(time * 0.018) * 0.09
        ctx.beginPath(); ctx.moveTo(-8,15); ctx.quadraticCurveTo(-13+legS*10,28,-9,36); ctx.lineTo(-3,36); ctx.quadraticCurveTo(-7+legS*8,28,-2,15); ctx.closePath(); ctx.fill(); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(2,15); ctx.quadraticCurveTo(8-legS*10,28,9,36); ctx.lineTo(3,36); ctx.quadraticCurveTo(2-legS*8,28,-3,15); ctx.closePath(); ctx.fill(); ctx.stroke()

        ctx.restore()

        // Tether
        ctx.save(); ctx.globalAlpha = astAlpha * 0.45
        ctx.strokeStyle = 'rgba(234,179,8,0.5)'; ctx.lineWidth = 1.2 * zoom
        ctx.beginPath(); ctx.moveTo(aax + 27*sc*zoom, aay - 16*sc*zoom)
        ctx.bezierCurveTo(aax+90*zoom, aay-110*zoom, width*0.8, height*0.18, width*0.92, 0); ctx.stroke()
        ctx.restore()
      }

      // ─────────────────────────────────────────────────────────────────────
      // 7. PLANET & SUN DAWN (Projects → Certs)
      // ─────────────────────────────────────────────────────────────────────
      const planetAlpha = prp
      if (planetAlpha > 0.01) {
        const planetWX = width  * 0.53
        const planetWY = height * 0.94 - cep * height * 0.18 - cop * height * 0.14
        const planetR = 145 * zoom
        const sunWX = planetWX - 50
        const sunWY = planetWY - 100
        const sunSX = projX(sunWX)
        const sunSY = projY(sunWY)

        ctx.save(); ctx.globalAlpha = planetAlpha

        // Sun rays
        ctx.save(); ctx.globalCompositeOperation = 'screen'
        const sunCore = ctx.createRadialGradient(sunSX, sunSY, 0, sunSX, sunSY, 90 * zoom)
        sunCore.addColorStop(0, '#fff'); sunCore.addColorStop(0.2, '#fef08a'); sunCore.addColorStop(0.6, '#f97316'); sunCore.addColorStop(1, 'transparent')
        ctx.fillStyle = sunCore; ctx.beginPath(); ctx.arc(sunSX, sunSY, 90 * zoom, 0, Math.PI * 2); ctx.fill()
        for (let r = 0; r < 24; r++) {
          const ang = (r * Math.PI * 2) / 24 + time * 0.001
          const rl = 320 * zoom * (0.75 + 0.45 * Math.sin(r * 2.5 + time * 0.018))
          ctx.strokeStyle = `rgba(254,240,138,${(0.09 + 0.07 * Math.sin(r)).toFixed(2)})`
          ctx.lineWidth = 1.2 * zoom; ctx.beginPath(); ctx.moveTo(sunSX, sunSY)
          ctx.lineTo(sunSX + Math.cos(ang) * rl, sunSY + Math.sin(ang) * rl); ctx.stroke()
        }
        ctx.restore()

        // Planet
        const pSX = projX(planetWX), pSY = projY(planetWY)
        // Atmosphere
        const atmos = ctx.createRadialGradient(pSX, pSY, planetR * 0.94, pSX, pSY, planetR * 1.18)
        atmos.addColorStop(0, 'rgba(56,189,248,0.9)'); atmos.addColorStop(0.4, 'rgba(14,165,233,0.4)'); atmos.addColorStop(1, 'transparent')
        ctx.fillStyle = atmos; ctx.beginPath(); ctx.arc(pSX, pSY, planetR * 1.18, 0, Math.PI * 2); ctx.fill()
        // Ocean base
        ctx.fillStyle = '#0c1a2e'; ctx.beginPath(); ctx.arc(pSX, pSY, planetR, 0, Math.PI * 2); ctx.fill()
        // Continents clipped
        ctx.save(); ctx.beginPath(); ctx.arc(pSX, pSY, planetR, 0, Math.PI * 2); ctx.clip()
        const rot = time * 0.0003
        const contColors = ['#15803d','#166534','#052e16']
        for (let cc = 0; cc < 4; cc++) {
          const ccx = projX(planetWX + Math.sin(cc * 2.1 + rot) * 65)
          const ccy = projY(planetWY + Math.cos(cc * 1.7 + rot) * 45)
          ctx.fillStyle = contColors[cc % 3]; ctx.beginPath(); ctx.arc(ccx, ccy, (50 + cc * 8) * zoom, 0, Math.PI * 2); ctx.fill()
        }
        // Shading
        const shad = ctx.createRadialGradient(projX(planetWX-35), projY(planetWY-35), planetR*0.1, pSX, pSY, planetR)
        shad.addColorStop(0,'rgba(255,255,255,0.14)'); shad.addColorStop(0.5,'rgba(0,0,0,0)'); shad.addColorStop(1,'rgba(0,0,0,0.88)')
        ctx.fillStyle = shad; ctx.beginPath(); ctx.arc(pSX, pSY, planetR, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
        ctx.restore()
      }

      // ─────────────────────────────────────────────────────────────────────
      // 8. WIDE-ANGLE LANDSCAPE (Certs → Contact)
      // ─────────────────────────────────────────────────────────────────────
      const landAlpha = cep
      if (landAlpha > 0.01) {
        ctx.save(); ctx.globalAlpha = landAlpha
        const hY = height * 0.48 // world horizon

        // ── Mountains — 4-layer system with snow caps & scattering ──────────
        // ── Mountains — 4-layer system with snow caps & scattering ──────────
        const drawMountainRange = (
          baseY: number,
          seed: number,
          baseHeightScale: number,
          colorBaseGradStart: string,
          colorBaseGradEnd: string,
          colorShadow: string,
          snowOpacity: number,
          hasTreeline: boolean
        ) => {
          const step = 8
          const pointsCount = Math.ceil(width / step) + 2
          const points: { wx: number; wy: number }[] = []
          
          for (let i = 0; i < pointsCount; i++) {
            const wx = i * step
            let h = 0
            h += Math.sin(wx * 0.0006 + seed) * 110
            h += Math.sin(wx * 0.0017 - seed * 2.3) * 55
            h += Math.sin(wx * 0.0043 + seed * 3.7) * 25
            h += Math.sin(wx * 0.0107 - seed * 5.1) * 12
            h += Math.sin(wx * 0.0263 + seed * 7.9) * 5
            h += Math.sin(wx * 0.0611 - seed * 11.3) * 2
            
            const wy = baseY - h * baseHeightScale
            points.push({ wx, wy })
          }
          
          ctx.beginPath()
          ctx.moveTo(0, height)
          for (let i = 0; i < points.length; i++) {
            ctx.lineTo(projX(points[i].wx), projY(points[i].wy))
          }
          ctx.lineTo(width, height)
          ctx.closePath()
          
          const rangeTop = baseY - 130 * baseHeightScale
          const rangeBottom = baseY
          const grad = ctx.createLinearGradient(0, projY(rangeTop), 0, projY(rangeBottom))
          grad.addColorStop(0, colorBaseGradStart)
          grad.addColorStop(1, colorBaseGradEnd)
          ctx.fillStyle = grad
          ctx.fill()
          
          ctx.save()
          ctx.clip()
          
          // Draw diagonal shadows on right-facing slopes
          ctx.fillStyle = colorShadow
          for (let i = 1; i < points.length; i++) {
            const p = points[i]
            const p_prev = points[i-1]
            if (p.wy > p_prev.wy) {
              ctx.beginPath()
              ctx.moveTo(projX(p_prev.wx), projY(p_prev.wy))
              ctx.lineTo(projX(p.wx), projY(p.wy))
              const diagX1 = p.wx + (height - projY(p.wy)) * 0.4
              const diagX0 = p_prev.wx + (height - projY(p_prev.wy)) * 0.4
              ctx.lineTo(projX(diagX1), height)
              ctx.lineTo(projX(diagX0), height)
              ctx.closePath()
              ctx.fill()
            }
          }
          
          // Draw crag detail lines (for rock texture)
          ctx.strokeStyle = colorShadow
          ctx.lineWidth = 1.0 * zoom
          for (let i = 5; i < points.length - 5; i += 7) {
            const p = points[i]
            if (p.wy > points[i-1].wy) {
              ctx.beginPath()
              ctx.moveTo(projX(p.wx), projY(p.wy))
              const curX = projX(p.wx)
              const curY = projY(p.wy)
              ctx.lineTo(curX + 8 * zoom, curY + 16 * zoom)
              ctx.lineTo(curX + 5 * zoom, curY + 28 * zoom)
              ctx.lineTo(curX + 15 * zoom, curY + 45 * zoom)
              ctx.stroke()
            }
          }
          
          // Draw snow caps if applicable
          if (snowOpacity > 0) {
            for (let i = 8; i < points.length - 8; i++) {
              const p = points[i]
              const prev = points[i-1]
              const next = points[i+1]
              if (p.wy < prev.wy && p.wy < next.wy) {
                const heightVal = baseY - p.wy
                if (heightVal > 35) {
                  const snowSize = Math.floor(clamp(heightVal * 0.12, 4, 12))
                  const L = snowSize
                  const R = snowSize
                  
                  ctx.fillStyle = `rgba(255, 255, 255, ${snowOpacity})`
                  ctx.beginPath()
                  ctx.moveTo(projX(points[i - L].wx), projY(points[i - L].wy))
                  for (let j = i - L + 1; j <= i + R; j++) {
                    ctx.lineTo(projX(points[j].wx), projY(points[j].wy))
                  }
                  for (let j = i + R; j >= i - L; j--) {
                    const pt = points[j]
                    const distFromEdge = Math.min(j - (i - L), (i + R) - j)
                    const depth = (distFromEdge * 3.5 + Math.sin(j * 1.8) * 4) * zoom
                    ctx.lineTo(projX(pt.wx), projY(pt.wy + depth))
                  }
                  ctx.closePath()
                  ctx.fill()
                }
              }
            }
          }
          
          // Draw treeline if applicable
          if (hasTreeline) {
            ctx.fillStyle = 'rgba(5, 18, 10, 0.75)'
            for (let i = 2; i < points.length - 2; i += 3) {
              const pt = points[i]
              const sx = projX(pt.wx)
              const sy = projY(pt.wy)
              
              if (baseY - pt.wy < 80) {
                const treeH = (3.5 + Math.sin(i * 4.3) * 1.5) * zoom
                const treeW = treeH * 0.4
                ctx.beginPath()
                ctx.moveTo(sx, sy - treeH)
                ctx.lineTo(sx - treeW, sy)
                ctx.lineTo(sx + treeW, sy)
                ctx.closePath()
                ctx.fill()
              }
            }
          }
          
          ctx.restore()
          
          ctx.beginPath()
          ctx.moveTo(0, projY(points[0].wy))
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(projX(points[i].wx), projY(points[i].wy))
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
          ctx.lineWidth = 1.0 * zoom
          ctx.stroke()
        }

        // Draw Range 1: Farthest — dusty purple atmosphere
        drawMountainRange(hY, 1.2, 0.95, '#28204b', '#1a1233', 'rgba(10, 8, 24, 0.35)', 0.45, false)

        // Draw mist band between range 1 and 2
        const mistBand = (y0: number, y1: number, col0: string, col1: string) => {
          const sy0 = projY(y0), sy1 = projY(y1)
          const mg = ctx.createLinearGradient(0, sy0, 0, sy1)
          mg.addColorStop(0, col0); mg.addColorStop(1, col1)
          ctx.fillStyle = mg; ctx.fillRect(0, Math.min(sy0,sy1), width, Math.abs(sy1-sy0))
        }
        mistBand(hY - 25, hY + 55, 'rgba(28,10,50,0)', 'rgba(60,22,70,0.32)')
        mistBand(hY + 35, hY + 80, 'rgba(60,22,70,0.25)', 'rgba(18,35,24,0)')

        // Draw Range 2: Mid-far — rocky indigo slate
        drawMountainRange(hY + 12, 4.7, 0.75, '#1c2b2e', '#121b1f', 'rgba(6, 10, 12, 0.45)', 0.7, false)

        // Draw Range 3: Near-mid — forest mossy green with pine treeline
        drawMountainRange(hY + 26, 9.3, 0.65, '#0f2b19', '#08170d', 'rgba(3, 8, 5, 0.55)', 0, true)

        // ── Atmospheric haze gradient ────────────────────────────────────────
        const haze = ctx.createLinearGradient(0, projY(hY+60), 0, height)
        haze.addColorStop(0, 'rgba(14,40,22,0.35)')
        haze.addColorStop(1, 'rgba(8,22,12,0)')
        ctx.fillStyle = haze
        ctx.fillRect(0, projY(hY+60), width, height - projY(hY+60))

        // ── Rolling hills ────────────────────────────────────────────────────
        const drawHill = (wy: number, freq: number, amp: number, col: string) => {
          ctx.beginPath(); ctx.moveTo(0, height)
          for (let x = 0; x <= width; x += 12) {
            const wx = cx + (x - cx) / zoom
            const sy = projY(wy + Math.sin(wx * freq + time * 0.003) * amp)
            ctx.lineTo(x, sy)
          }
          ctx.lineTo(width,height); ctx.closePath(); ctx.fillStyle=col; ctx.fill()
          ctx.strokeStyle='rgba(4,8,6,0.25)'; ctx.lineWidth=1.2; ctx.stroke()
        }
        drawHill(height*0.52, 0.0028, 25, '#112a18')
        // Valley mist
        const vm = ctx.createLinearGradient(0,projY(height*0.52-15),0,projY(height*0.67))
        vm.addColorStop(0,'rgba(14,35,20,0.30)'); vm.addColorStop(1,'rgba(14,35,20,0)')
        ctx.fillStyle=vm; ctx.fillRect(0,projY(height*0.52-15),width,projY(height*0.67)-projY(height*0.52-15))

        drawHill(height*0.66, 0.0045, 18, '#173d24')
        drawHill(height*0.82, 0.0065, 11, '#1f5430')

        // ── Turquoise river ──────────────────────────────────────────────────
        const rpts = [
          {x:width*0.51,y:height*0.48},{x:width*0.47,y:height*0.56},{x:width*0.57,y:height*0.66},
          {x:width*0.41,y:height*0.77},{x:width*0.63,y:height*0.89},{x:width*0.37,y:height*1.06},
        ]

        // Bank
        ctx.beginPath()
        rpts.forEach((pt,ii) => {
          const pct = ii/(rpts.length-1)
          const rw = (4+Math.pow(pct,2.5)*170)+5*zoom
          const sx=projX(pt.x-rw/2), sy=projY(pt.y)
          if(ii===0) ctx.moveTo(sx,sy); else ctx.lineTo(sx,sy)
        })
        for(let ii=rpts.length-1;ii>=0;ii--){
          const pt=rpts[ii]; const pct=ii/(rpts.length-1)
          const rw=(4+Math.pow(pct,2.5)*170)+5*zoom
          ctx.lineTo(projX(pt.x+rw/2),projY(pt.y))
        }
        ctx.closePath(); ctx.fillStyle='#1a120c'; ctx.fill()

        // River water
        ctx.beginPath()
        rpts.forEach((pt,ii) => {
          const pct=ii/(rpts.length-1)
          const rw=4+Math.pow(pct,2.5)*170
          if(ii===0) ctx.moveTo(projX(pt.x-rw/2),projY(pt.y))
          else ctx.lineTo(projX(pt.x-rw/2),projY(pt.y))
        })
        for(let ii=rpts.length-1;ii>=0;ii--){
          const pt=rpts[ii]; const pct=ii/(rpts.length-1)
          const rw=4+Math.pow(pct,2.5)*170
          ctx.lineTo(projX(pt.x+rw/2),projY(pt.y))
        }
        ctx.closePath()
        const riverG = ctx.createLinearGradient(0,projY(height*0.48),0,projY(height))
        riverG.addColorStop(0,'#085660'); riverG.addColorStop(0.4,'#1be0cf'); riverG.addColorStop(1,'#064a50')
        ctx.fillStyle=riverG; ctx.fill()

        // River ripples
        ctx.save()
        ctx.beginPath()
        rpts.forEach((pt,ii)=>{
          const pct=ii/(rpts.length-1); const rw=4+Math.pow(pct,2.5)*170
          if(ii===0) ctx.moveTo(projX(pt.x-rw/2),projY(pt.y)); else ctx.lineTo(projX(pt.x-rw/2),projY(pt.y))
        })
        for(let ii=rpts.length-1;ii>=0;ii--){
          const pt=rpts[ii]; const pct=ii/(rpts.length-1); const rw=4+Math.pow(pct,2.5)*170
          ctx.lineTo(projX(pt.x+rw/2),projY(pt.y))
        }
        ctx.closePath(); ctx.clip()
        ctx.strokeStyle='rgba(255,255,255,0.16)'; ctx.lineWidth=1*zoom
        for(let ro=-28;ro<=28;ro+=10){
          ctx.beginPath()
          rpts.forEach((pt,ii)=>{
            const pct=ii/(rpts.length-1); const rw=4+Math.pow(pct,2.5)*170
            const ripW=Math.sin(ii*1.6+time*0.05)*rw*0.08
            const sx=projX(pt.x+ro*zoom+ripW), sy=projY(pt.y)
            if(ii===0) ctx.moveTo(sx,sy); else ctx.lineTo(sx,sy)
          })
          ctx.stroke()
        }
        // Shimmer sparkles
        for(let ss=0;ss<16;ss++){
          const seed2=Math.sin(ss*41.3+time*0.005)
          const ptIdx=Math.min(rpts.length-1,Math.floor(((seed2+1)/2)*rpts.length))
          const pt=rpts[ptIdx]; const pct=ptIdx/(rpts.length-1); const rw=4+Math.pow(pct,2.5)*170
          const rx=pt.x+(Math.sin(ss*11.7)*0.45)*rw
          const ry=pt.y+(Math.cos(ss*8.1)*0.5)*10
          const sa=0.18+Math.sin(time*0.07+ss)*0.55
          if(sa>0.06){
            ctx.fillStyle=`rgba(255,255,255,${(sa*0.85).toFixed(2)})`
            ctx.beginPath(); ctx.arc(projX(rx),projY(ry),1.3*zoom,0,Math.PI*2); ctx.fill()
          }
        }
        ctx.restore()

        // ── Grass blades (batched path) ────────────────────────────────────
        const drawGrass = (blades: Float32Array, count: number, wy: number, freq: number, amp: number, col: string) => {
          ctx.beginPath(); ctx.strokeStyle=col; ctx.lineWidth=1.1*Math.min(2,zoom)
          for(let i=0;i<count;i++){
            const b=i*4
            const wx=blades[b]*width
            const wave=Math.sin(wx*freq+time*0.003)*amp
            const sx=projX(wx), sy=projY(wy+wave)
            const wind=Math.sin(time*0.033+wx*0.011+blades[b+3])*8+Math.cos(time*0.014-wx*0.007)*3.5
            const finalSway=wind*zoom
            const gh=blades[b+1]*zoom
            ctx.moveTo(sx,sy+2)
            ctx.quadraticCurveTo(sx+finalSway*0.55,sy-gh*0.55,sx+finalSway,sy-gh)
          }
          ctx.stroke()
        }
        drawGrass(backBlades,  BACK_BLADE_COUNT,  height*0.52, 0.0028, 25, '#0c2216')
        drawGrass(midBlades,   MID_BLADE_COUNT,   height*0.66, 0.0045, 18, '#133819')
        drawGrass(frontBlades, FRONT_BLADE_COUNT, height*0.82, 0.0065, 11, '#256640')

        // ── Giant central tree — full recursive system ─────────────────────
        const twx = width * 0.5, twy = height * 0.540
        const tpx = projX(twx), tpy = projY(twy)
        const tw = 20 * zoom, th = 85 * zoom
        const treeWind = Math.sin(time * 0.022) * 0.06 + Math.sin(time * 0.011) * 0.03

        const drawLeafCluster = (
          rxOffset: number, ryOffset: number, r: number,
          core: string, mid: string, hi: string,
          swayPhase: number
        ) => {
          const sway = Math.sin(time * 0.025 + swayPhase) * 3.5 * zoom + Math.cos(time * 0.015 + swayPhase) * 1.5 * zoom
          const cpx = tpx + rxOffset * zoom + sway
          const cpy = tpy - th + ryOffset * zoom
          const cr = r * zoom

          const lg = ctx.createRadialGradient(
            cpx - cr * 0.25, cpy - cr * 0.25, cr * 0.05,
            cpx, cpy, cr
          )
          lg.addColorStop(0, hi)
          lg.addColorStop(0.35, mid)
          lg.addColorStop(0.72, core)
          lg.addColorStop(1, '#020904')

          ctx.fillStyle = lg
          ctx.beginPath()
          ctx.arc(cpx, cpy, cr, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = 'rgba(2, 10, 4, 0.22)'
          ctx.lineWidth = 0.8 * zoom
          ctx.stroke()
        }

        // (0) Deep ground shadow pool
        const shadowG = ctx.createRadialGradient(tpx, tpy + 4 * zoom, 0, tpx, tpy + 2 * zoom, tw * 3.8)
        shadowG.addColorStop(0, 'rgba(0,10,3,0.75)'); shadowG.addColorStop(1, 'transparent')
        ctx.fillStyle = shadowG; ctx.beginPath()
        ctx.ellipse(tpx, tpy + 3 * zoom, tw * 3.8, tw * 0.95, 0, 0, Math.PI * 2); ctx.fill()

        // (1) Layer 0 Canopy (Deep shadow back)
        drawLeafCluster(0, +30, 58, '#030c06', '#06160a', '#0a2210', 0.0)
        drawLeafCluster(-32, +35, 42, '#030c06', '#06160a', '#0a2210', 0.5)
        drawLeafCluster(+32, +35, 42, '#030c06', '#06160a', '#0a2210', 1.0)
        drawLeafCluster(-55, +40, 32, '#020a05', '#051208', '#081a0c', 1.8)
        drawLeafCluster(+55, +40, 32, '#020a05', '#051208', '#081a0c', 2.2)

        // (2) Root flares — gnarled surface roots spreading outward/downward
        const drawRoot = (angle: number, length: number, startW: number) => {
          ctx.save()
          ctx.translate(tpx, tpy)
          ctx.strokeStyle = '#18100c'; ctx.lineCap = 'round'
          ctx.lineWidth = startW * zoom
          ctx.beginPath(); ctx.moveTo(0, 0)
          
          const ex = Math.cos(angle) * length * zoom
          const ey = Math.sin(angle) * length * zoom * 0.4
          
          const bendDir = Math.cos(angle) > 0 ? 1 : -1
          const cx1 = ex * 0.5 - bendDir * 8 * zoom
          const cy1 = ey * 0.3 + 12 * zoom
          
          ctx.quadraticCurveTo(cx1, cy1, ex, ey)
          ctx.stroke()
          ctx.restore()
        }
        drawRoot(0.2, 50, 4)
        drawRoot(0.5, 60, 5)
        drawRoot(0.9, 45, 3.5)
        drawRoot(Math.PI - 0.2, 50, 4)
        drawRoot(Math.PI - 0.5, 60, 5)
        drawRoot(Math.PI - 0.9, 45, 3.5)
        drawRoot(1.4, 35, 3)
        drawRoot(1.7, 35, 3)

        // (3) Trunk
        ctx.beginPath()
        ctx.moveTo(tpx - tw * 0.85, tpy + 3 * zoom)
        ctx.bezierCurveTo(tpx - tw * 0.55, tpy, tpx - tw * 0.28, tpy - th * 0.45, tpx - tw * 0.14, tpy - th)
        ctx.lineTo(tpx + tw * 0.14, tpy - th)
        ctx.bezierCurveTo(tpx + tw * 0.28, tpy - th * 0.45, tpx + tw * 0.55, tpy, tpx + tw * 0.85, tpy + 3 * zoom)
        ctx.closePath()
        const tgBase = ctx.createLinearGradient(tpx - tw, tpy, tpx + tw, tpy)
        tgBase.addColorStop(0, '#0e0a08'); tgBase.addColorStop(0.25, '#2a1a12')
        tgBase.addColorStop(0.6, '#3d2a1c'); tgBase.addColorStop(0.82, '#4e3524'); tgBase.addColorStop(1, '#160f0b')
        ctx.fillStyle = tgBase; ctx.fill()

        // Bark vertical texture lines
        ctx.lineWidth = 0.8 * zoom; ctx.lineCap = 'round'
        const barkLines = [-0.22, -0.09, 0.06, 0.18]
        barkLines.forEach((off, bi) => {
          ctx.strokeStyle = `rgba(${bi % 2 === 0 ? '6,4,3' : '18,12,8'},0.5)`
          ctx.beginPath()
          ctx.moveTo(tpx + tw * off, tpy)
          ctx.bezierCurveTo(
            tpx + tw * off * 0.85, tpy - th * 0.35,
            tpx + tw * off * 0.7,  tpy - th * 0.7,
            tpx + tw * off * 0.5,  tpy - th
          )
          ctx.stroke()
        })

        // Lit right-side highlight
        const litShaft = ctx.createLinearGradient(tpx, tpy, tpx + tw * 0.5, tpy)
        litShaft.addColorStop(0, 'transparent'); litShaft.addColorStop(1, 'rgba(80,55,35,0.3)')
        ctx.fillStyle = litShaft; ctx.beginPath()
        ctx.moveTo(tpx, tpy + 3 * zoom)
        ctx.bezierCurveTo(tpx + tw * 0.4, tpy, tpx + tw * 0.55, tpy - th * 0.5, tpx + tw * 0.12, tpy - th)
        ctx.lineTo(tpx, tpy - th); ctx.closePath(); ctx.fill()

        // Moss patches on bark
        ctx.save(); ctx.globalCompositeOperation = 'screen'
        for (let mp = 0; mp < 5; mp++) {
          const mpx = tpx + (Math.sin(mp * 5.2) * 0.4) * tw
          const mpy = tpy - th * (0.15 + mp * 0.15)
          const mr = (3 + Math.sin(mp * 3.1) * 2) * zoom
          const mg = ctx.createRadialGradient(mpx, mpy, 0, mpx, mpy, mr * 2.5)
          mg.addColorStop(0, 'rgba(40,180,80,0.25)'); mg.addColorStop(1, 'transparent')
          ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mpx, mpy, mr * 2.5, 0, Math.PI * 2); ctx.fill()
        }
        ctx.restore()

        // (4) Recursive branch system
        const drawBranch = (
          bx: number, by: number,
          angle: number, len: number, thick: number,
          depth: number
        ) => {
          if (depth <= 0 || thick < 0.4 * zoom) return
          const windEffect = treeWind * (4 - depth) * 0.4
          const ex = bx + Math.cos(angle + windEffect) * len
          const ey = by + Math.sin(angle + windEffect) * len
          const cpx1 = bx + Math.cos(angle + windEffect * 0.5) * len * 0.45 + Math.cos(angle + Math.PI/2) * len * 0.12
          const cpy1 = by + Math.sin(angle + windEffect * 0.5) * len * 0.45 + Math.sin(angle + Math.PI/2) * len * 0.12

          const bCol = depth > 2 ? '#2a1c12' : depth > 1 ? '#1e1610' : '#160f0c'
          ctx.strokeStyle = bCol
          ctx.lineWidth = thick
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(bx, by)
          ctx.quadraticCurveTo(cpx1, cpy1, ex, ey)
          ctx.stroke()

          drawBranch(ex, ey, angle - (0.38 + depth * 0.08), len * 0.68, thick * 0.62, depth - 1)
          drawBranch(ex, ey, angle + (0.32 + depth * 0.06), len * 0.72, thick * 0.60, depth - 1)
          if (depth === 3) drawBranch(ex, ey, angle + treeWind * 2, len * 0.55, thick * 0.45, depth - 2)
        }

        // Main trunk top → primary branches
        const branchBaseX = tpx, branchBaseY = tpy - th
        drawBranch(branchBaseX, branchBaseY, -Math.PI/2 - 0.35, th * 0.52, 5.5 * zoom, 4)
        drawBranch(branchBaseX, branchBaseY, -Math.PI/2 + 0.30, th * 0.56, 5.0 * zoom, 4)
        drawBranch(branchBaseX, branchBaseY - th * 0.2, -Math.PI/2 - 0.60, th * 0.45, 4.5 * zoom, 3)
        drawBranch(branchBaseX, branchBaseY - th * 0.2, -Math.PI/2 + 0.55, th * 0.48, 4.2 * zoom, 3)
        drawBranch(branchBaseX, branchBaseY + th * 0.08, -Math.PI/2 - 0.85, th * 0.38, 3.5 * zoom, 3)
        drawBranch(branchBaseX, branchBaseY + th * 0.08, -Math.PI/2 + 0.80, th * 0.40, 3.2 * zoom, 3)

        // (5) Layer 1 Canopy (Mid-green body)
        drawLeafCluster(-18, +15, 38, '#082510', '#104620', '#1c6630', 0.3)
        drawLeafCluster(+18, +15, 38, '#082510', '#104620', '#1c6630', 0.7)
        drawLeafCluster(0, +10, 44, '#0c2e15', '#165528', '#257a3b', 1.2)
        drawLeafCluster(-40, +20, 28, '#082510', '#104620', '#1c6630', 1.9)
        drawLeafCluster(+40, +20, 28, '#082510', '#104620', '#1c6630', 2.4)
        drawLeafCluster(-58, +25, 22, '#061f0c', '#0e3a18', '#185425', 2.9)
        drawLeafCluster(+58, +25, 22, '#061f0c', '#0e3a18', '#185425', 3.3)

        // (6) Layer 2 Canopy (Vivid highlight emerald)
        drawLeafCluster(-15, -10, 32, '#124520', '#257a3e', '#3cb85e', 0.6)
        drawLeafCluster(+15, -10, 32, '#124520', '#257a3e', '#3cb85e', 0.9)
        drawLeafCluster(0, -15, 34, '#185428', '#329c50', '#54ce73', 1.5)
        drawLeafCluster(-30, -5, 25, '#124520', '#257a3e', '#3cb85e', 2.1)
        drawLeafCluster(+30, -5, 25, '#124520', '#257a3e', '#3cb85e', 2.6)
        drawLeafCluster(-48, +5, 18, '#103e1c', '#206c36', '#34a052', 3.0)
        drawLeafCluster(+48, +5, 18, '#103e1c', '#206c36', '#34a052', 3.5)

        // (7) Layer 3 Canopy (Bright tips & lime highlights)
        drawLeafCluster(-8, -30, 18, '#2d7c3d', '#50b863', '#7ce07e', 1.1)
        drawLeafCluster(+8, -30, 18, '#2d7c3d', '#50b863', '#7ce07e', 1.4)
        drawLeafCluster(0, -38, 15, '#3a964f', '#64cc74', '#92ee88', 1.8)
        drawLeafCluster(-20, -25, 12, '#2d7c3d', '#50b863', '#7ce07e', 2.3)
        drawLeafCluster(+20, -25, 12, '#2d7c3d', '#50b863', '#7ce07e', 2.8)

        // (8) Bioluminescent glow blooms
        ctx.save(); ctx.globalCompositeOperation = 'screen'
        const glowNodes = [
          [0, -15, 0.22], [-12, -10, 0.16],
          [12, -10, 0.16], [0, -38, 0.28],
        ]
        glowNodes.forEach(([gx, gy, ga]) => {
          const gSway = Math.sin(time * 0.02 + gx) * 2 * zoom
          const gpx = tpx + (gx as number) * zoom + gSway
          const gpy = tpy - th + (gy as number) * zoom
          const gr = 28 * zoom
          const gg = ctx.createRadialGradient(gpx, gpy, 0, gpx, gpy, gr)
          gg.addColorStop(0, `rgba(100,255,120,${ga})`); gg.addColorStop(1, 'transparent')
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(gpx, gpy, gr, 0, Math.PI * 2); ctx.fill()
        })
        ctx.restore()

        // ── Fireflies / spores ─────────────────────────────────────────────
        for(let i=0;i<SPORE_COUNT;i++){
          const b=i*SPORE_FIELDS
          const windX=Math.sin(time*0.011+sporeData[b]*0.005)*0.25
          sporeData[b]  +=sporeData[b+2]+windX
          sporeData[b+1]+=sporeData[b+3]
          sporeData[b+2]*=0.96; sporeData[b+3]*=0.96
          sporeData[b+3]=Math.min(sporeData[b+3],-0.18)
          if(sporeData[b]<-20)  sporeData[b]=width+20
          if(sporeData[b]>width+20) sporeData[b]=-20
          if(sporeData[b+1]<height*0.38){sporeData[b+1]=height*1.1;sporeData[b]=rng()*width}
          sporeData[b+5]+=sporeData[b+6]
          if(sporeData[b+5]>0.92||sporeData[b+5]<0.12) sporeData[b+6]=-sporeData[b+6]
          const sa=sporeData[b+5]*0.72
          const psx=projX(sporeData[b]), psy=projY(sporeData[b+1])
          // Glow
          const sg=ctx.createRadialGradient(psx,psy,0,psx,psy,sporeData[b+4]*zoom*3)
          sg.addColorStop(0,`rgba(200,255,80,${sa})`)
          sg.addColorStop(1,'transparent')
          ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(psx,psy,sporeData[b+4]*zoom*3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=`rgba(230,255,120,${sa})`; ctx.beginPath(); ctx.arc(psx,psy,sporeData[b+4]*zoom,0,Math.PI*2); ctx.fill()
        }

        ctx.restore()
      }

      // ─────────────────────────────────────────────────────────────────────
      // 9. FOREGROUND PARTING CLOUDS — 5-pass volumetric nebula
      // ─────────────────────────────────────────────────────────────────────
      if (cp < 0.99) {
        const cloudShift = easeInOut(cp) * width * 0.80
        // Slow breath + secondary flutter
        const breath  = 1 + Math.sin(time * 0.009)  * 0.018 + Math.sin(time * 0.024) * 0.006
        // Visibility: fade out the last 15% of parting
        const cloudAlpha = Math.min(1, (1 - cp) * 7)

        const drawClouds = (isLeft: boolean, shift: number) => {
          const humps = isLeft ? leftHumps : rightHumps
          const dir = isLeft ? -1 : 1

          const hs = humps.map(h => ({
            x: h[0] * width + dir * shift,
            y: h[1] * height,
            r: h[2] * height * breath
          }))

          ctx.save()
          ctx.globalAlpha = cloudAlpha

          // Helper to draw soft, feathered radial puffs (smoky brush)
          const drawFeatheredPuff = (
            c: CanvasRenderingContext2D,
            px: number, py: number, radius: number,
            colStart: string, colEnd: string
          ) => {
            const g = c.createRadialGradient(px, py, radius * 0.08, px, py, radius)
            g.addColorStop(0, colStart)
            g.addColorStop(0.42, colEnd)
            g.addColorStop(1, 'transparent')
            c.fillStyle = g
            c.beginPath()
            c.arc(px, py, radius, 0, Math.PI * 2)
            c.fill()
          }

          // ── PASS 1: Solid base blockout (blocks stars with fluffy cloud boundary)
          ctx.fillStyle = '#05010c'
          hs.forEach((h, hIdx) => {
            const localRng = mulberry32(0x1111 + hIdx + (isLeft ? 0 : 40))
            for (let i = 0; i < 15; i++) {
              const angle = localRng() * Math.PI * 2
              const dist = localRng() * h.r * 0.5
              const r = h.r * (0.4 + localRng() * 0.5)
              const px = h.x + Math.cos(angle) * dist
              const py = h.y + Math.sin(angle) * dist
              
              ctx.beginPath()
              ctx.arc(px, py, r + 4, 0, Math.PI * 2)
              ctx.fill()
            }
          })

          // ── PASS 2: Soft, smoky violet/purple cloud body (feathered overlay)
          hs.forEach((h, hIdx) => {
            const localRng = mulberry32(0x2222 + hIdx + (isLeft ? 0 : 40))
            const puffCount = 35
            for (let i = 0; i < puffCount; i++) {
              const angle = localRng() * Math.PI * 2
              const dist = localRng() * h.r * 0.68
              const r = h.r * (0.35 + localRng() * 0.55)
              
              const driftX = Math.sin(time * 0.006 + i * 1.3) * 7 * zoom
              const driftY = Math.cos(time * 0.004 + i * 1.3) * 5 * zoom
              const px = h.x + Math.cos(angle) * dist + driftX
              const py = h.y + Math.sin(angle) * dist + driftY

              // Blend soft purples and deep indigo to create a rich gas nebula body
              drawFeatheredPuff(
                ctx, px, py, r,
                'rgba(76, 32, 118, 0.16)', // soft glowing violet core
                'rgba(26, 8, 48, 0.05)'   // smoky dark purple fringe
              )
            }
          })

          // ── PASS 3: Internal crevice shadows (deep folds and volumetric depth)
          hs.forEach((h, hIdx) => {
            const localRng = mulberry32(0x3333 + hIdx + (isLeft ? 0 : 40))
            const shadowCount = 10
            for (let i = 0; i < shadowCount; i++) {
              const angle = localRng() * Math.PI * 2
              const dist = localRng() * h.r * 0.45
              const r = h.r * (0.25 + localRng() * 0.35)
              
              const driftX = Math.sin(time * 0.005 + i * 2.1) * 4 * zoom
              const driftY = Math.cos(time * 0.003 + i * 2.1) * 3 * zoom
              const px = h.x + Math.cos(angle) * dist + driftX
              const py = h.y + Math.sin(angle) * dist + driftY

              // Cast deep shadows inside cloud folds
              drawFeatheredPuff(
                ctx, px, py, r,
                'rgba(6, 1, 16, 0.48)', // dark purple shadow
                'rgba(0, 0, 0, 0)'
              )
            }
          })

          // ── PASS 4: Swirling concentric wisps (textured curls matching dragon art)
          ctx.strokeStyle = 'rgba(235, 115, 255, 0.09)'
          ctx.lineWidth = 1.0 * zoom
          hs.forEach((h, hIdx) => {
            const localRng = mulberry32(0x4444 + hIdx + (isLeft ? 0 : 40))
            for (let i = 0; i < 6; i++) {
              const angle = localRng() * Math.PI * 2
              const dist = localRng() * h.r * 0.5
              const r = h.r * (0.3 + localRng() * 0.4)
              
              const driftX = Math.sin(time * 0.006 + i * 3.5) * 5 * zoom
              const driftY = Math.cos(time * 0.004 + i * 3.5) * 4 * zoom
              const px = h.x + Math.cos(angle) * dist + driftX
              const py = h.y + Math.sin(angle) * dist + driftY

              // Draw a wispy curl arc
              ctx.beginPath()
              ctx.arc(px, py, r * 0.82, angle, angle + 1.8)
              ctx.stroke()
            }
          })

          // ── PASS 5: Silver Lining Rim Glow (peach-pink highlights facing the central light source)
          hs.forEach((h, hIdx) => {
            const toCenterAngle = Math.atan2(cy - h.y, cx - h.x)
            const hlCount = 12
            
            for (let i = 0; i < hlCount; i++) {
              // Position highlight puffs along the inner rim facing the center
              const frac = (i / (hlCount - 1)) - 0.5
              const angle = toCenterAngle + frac * 1.8 // sweep arc along the inner rim
              
              const randR = h.r * (0.86 + Math.sin(i * 1.7) * 0.06)
              const px = h.x + Math.cos(angle) * randR
              const py = h.y + Math.sin(angle) * randR
              
              const r = h.r * (0.16 + Math.cos(i * 2.3) * 0.05)
              
              const driftX = Math.sin(time * 0.008 + i * 1.5) * 4 * zoom
              const driftY = Math.cos(time * 0.006 + i * 1.5) * 3 * zoom
              const finalX = px + driftX
              const finalY = py + driftY

              // Volumetric silver-lining edge glow
              drawFeatheredPuff(
                ctx, finalX, finalY, r * 1.8,
                'rgba(255, 185, 235, 0.42)', // Warm glowing peach-pink core
                'rgba(215, 95, 220, 0.16)'  // Soft magenta transition
              )
              
              // ── PASS 6: Hot-white/lilac specular spots (intense light crests)
              if (i % 3 === 0) {
                const specX = finalX + Math.cos(angle) * r * 0.2
                const specY = finalY + Math.sin(angle) * r * 0.2
                drawFeatheredPuff(
                  ctx, specX, specY, r * 0.8,
                  'rgba(255, 245, 255, 0.55)', // intense bright white-lilac center
                  'rgba(235, 160, 255, 0.18)'
                )
              }
            }
          })

          ctx.restore()
        }

        drawClouds(true,  cloudShift)
        drawClouds(false, cloudShift)
      }

      // ── Star lensing warp (drawn after clouds, before UI) ─────────────────
      // Quick warp pass: for bright stars near the BH, draw lensed copies
      if (bhRsSq > 0) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        for (let i = 0; i < STAR_COUNT; i += 3) {
          const b = i * STAR_FIELDS
          const sx = starData[b], sy = projY(starData[b+1] * 0.7)
          const dx = sx - bhx, dy = sy - bhy
          const dSq = dx*dx+dy*dy
          if (dSq < bhRsSq * 25 && dSq > bhRsSq * 0.8) {
            const dist = Math.sqrt(dSq)
            const warp = 1 + (bhRsSq) / dSq
            const lsX = bhx + dx * warp
            const lsY = bhy + dy * warp
            const a = starData[b+3] * 0.35
            ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`
            ctx.fillRect(lsX, lsY, starData[b+2] * 0.7, starData[b+2] * 0.7)
          }
        }
        ctx.globalCompositeOperation = 'source-over'
        ctx.restore()
      }
    }

    // ── Initialise ──────────────────────────────────────────────────────────
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    starCanvas.width = width; starCanvas.height = height
    nebulaCanvas.width = width; nebulaCanvas.height = height

    initStars()
    initParticles()
    initSpores()
    initAsteroids()

    mx = tmx = width / 2
    my = tmy = height / 2

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  if (theme === 'cream') return null

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-[1]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
