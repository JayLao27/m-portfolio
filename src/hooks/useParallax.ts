import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fast, snappy parallax and high-fidelity scroll animations using GSAP ScrollTrigger.
 * 
 * Supported data-parallax values:
 * - "slow"            → background layer, drifts slower than scroll
 * - "fast"            → foreground accent, drifts faster than scroll
 * - "fade"            → fades + slides up into view on scroll
 * - "scale"           → scales up into view
 * - "slide-left"      → slides in from left
 * - "slide-right"     → slides in from right
 * - "slide-up"        → slides up into view
 * - "rotate"          → subtle rotation on scroll
 * - "skew-in"         → beautiful 3D entry with translation, skew, and rotation
 * - "skew-in-left"    → 3D entry skewing in from the left
 * - "skew-in-right"   → 3D entry skewing in from the right
 * - "reveal-text"     → luxury clip-path slide-up text reveal
 * - "stagger-fade"    → fade + slide up child elements sequentially
 * - "stagger-skew"    → 3D skew-in child elements sequentially
 * - "stagger-slide-up"→ slide up child elements sequentially
 * 
 * Optional attributes:
 * - data-parallax-speed="<number>"  (default 1)
 * - data-parallax-delay="<seconds>" (default 0)
 */
export function useParallax() {
    useEffect(() => {
        let images: NodeListOf<HTMLImageElement> | null = null
        const handleImageLoad = () => {
            ScrollTrigger.refresh()
        }

        const timer = setTimeout(() => {
            const elements = document.querySelectorAll<HTMLElement>('[data-parallax]')

            elements.forEach((el) => {
                const type = el.getAttribute('data-parallax')
                const speed = parseFloat(el.getAttribute('data-parallax-speed') || '1')
                const delay = parseFloat(el.getAttribute('data-parallax-delay') || '0')

                switch (type) {
                    case 'slow':
                        gsap.to(el, {
                            y: () => -50 * speed,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                            },
                        })
                        break

                    case 'fast':
                        gsap.to(el, {
                            y: () => 80 * speed,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.4,
                            },
                        })
                        break

                    case 'fade':
                        gsap.fromTo(
                            el,
                            { opacity: 0, y: 40 * speed },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.65,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'scale':
                        gsap.fromTo(
                            el,
                            { scale: 0.90, opacity: 0 },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.6,
                                delay,
                                ease: 'back.out(1.2)',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'rotate':
                        gsap.to(el, {
                            rotation: 5 * speed,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            },
                        })
                        break

                    case 'slide-left':
                        gsap.fromTo(
                            el,
                            { x: -70 * speed, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.65,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'slide-right':
                        gsap.fromTo(
                            el,
                            { x: 70 * speed, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.65,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'slide-up':
                        gsap.fromTo(
                            el,
                            { y: 60 * speed, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.65,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 95%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'skew-in':
                        gsap.fromTo(
                            el,
                            { 
                                opacity: 0, 
                                y: 80 * speed, 
                                skewY: 4, 
                                rotationX: -12,
                                transformOrigin: 'top center'
                            },
                            {
                                opacity: 1,
                                y: 0,
                                skewY: 0,
                                rotationX: 0,
                                duration: 0.85,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'skew-in-left':
                        gsap.fromTo(
                            el,
                            { 
                                opacity: 0, 
                                x: -80 * speed, 
                                skewX: 8, 
                                rotationY: -15,
                                transformOrigin: 'left center'
                            },
                            {
                                opacity: 1,
                                x: 0,
                                skewX: 0,
                                rotationY: 0,
                                duration: 0.85,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'skew-in-right':
                        gsap.fromTo(
                            el,
                            { 
                                opacity: 0, 
                                x: 80 * speed, 
                                skewX: -8, 
                                rotationY: 15,
                                transformOrigin: 'right center'
                            },
                            {
                                opacity: 1,
                                x: 0,
                                skewX: 0,
                                rotationY: 0,
                                duration: 0.85,
                                delay,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'reveal-text':
                        gsap.fromTo(
                            el,
                            { 
                                y: '100%', 
                                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' 
                            },
                            {
                                y: '0%',
                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                duration: 0.9,
                                delay,
                                ease: 'power4.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 92%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'stagger-fade': {
                        const childSelector = el.getAttribute('data-parallax-selector') || ':scope > *'
                        const targets = el.querySelectorAll(childSelector)
                        if (targets.length > 0) {
                            gsap.fromTo(
                                targets,
                                { opacity: 0, y: 35 * speed },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.7,
                                    stagger: 0.1,
                                    delay,
                                    ease: 'power2.out',
                                    scrollTrigger: {
                                        trigger: el,
                                        start: 'top 90%',
                                        toggleActions: 'play none none none',
                                    },
                                }
                            )
                        }
                        break
                    }

                    case 'stagger-skew': {
                        const childSelector = el.getAttribute('data-parallax-selector') || ':scope > *'
                        const targets = el.querySelectorAll(childSelector)
                        if (targets.length > 0) {
                            gsap.fromTo(
                                targets,
                                { 
                                    opacity: 0, 
                                    y: 60 * speed, 
                                    skewY: 3, 
                                    rotationX: -6,
                                    transformOrigin: 'top center'
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    skewY: 0,
                                    rotationX: 0,
                                    duration: 0.8,
                                    stagger: 0.08,
                                    delay,
                                    ease: 'power3.out',
                                    scrollTrigger: {
                                        trigger: el,
                                        start: 'top 90%',
                                        toggleActions: 'play none none none',
                                    },
                                }
                            )
                        }
                        break
                    }

                    case 'stagger-slide-up': {
                        const childSelector = el.getAttribute('data-parallax-selector') || ':scope > *'
                        const targets = el.querySelectorAll(childSelector)
                        if (targets.length > 0) {
                            gsap.fromTo(
                                targets,
                                { opacity: 0, y: 50 * speed },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.75,
                                    stagger: 0.12,
                                    delay,
                                    ease: 'power3.out',
                                    scrollTrigger: {
                                        trigger: el,
                                        start: 'top 90%',
                                        toggleActions: 'play none none none',
                                    },
                                }
                            )
                        }
                        break
                    }
                }
            })

            // Global Scroll Velocity Skew Effect (kinetic skew) for card/bento elements
            const skewElements = document.querySelectorAll<HTMLElement>('[data-scroll-skew], .project-card, .certification-card, .bento-card, .social-card')
            if (skewElements.length > 0) {
                const proxy = { skew: 0 }
                const skewSetters = Array.from(skewElements).map(el => gsap.quickSetter(el, 'skewY', 'deg'))
                const clamp = gsap.utils.clamp(-5, 5) // Subtle skew limits to prevent motion sickness

                ScrollTrigger.create({
                    onUpdate: (self) => {
                        const skew = clamp(self.getVelocity() / -450)
                        if (Math.abs(skew) > Math.abs(proxy.skew)) {
                            proxy.skew = skew
                            gsap.to(proxy, {
                                skew: 0,
                                duration: 0.55,
                                ease: 'power3.out',
                                overwrite: 'auto',
                                onUpdate: () => {
                                    skewSetters.forEach(setter => setter(proxy.skew))
                                }
                            })
                        }
                    }
                })
            }

            ScrollTrigger.refresh()

            // Monitor image loads to refresh triggers when dimensions change
            images = document.querySelectorAll('img')
            images.forEach((img) => {
                if (img.complete) {
                    ScrollTrigger.refresh()
                } else {
                    img.addEventListener('load', handleImageLoad)
                }
            })
        }, 100)

        // Setup multiple delayed refreshes for loading fonts, layout shifts, etc.
        const refreshTimers = [500, 1000, 2000, 5000].map((delayTime) =>
            setTimeout(() => {
                ScrollTrigger.refresh()
            }, delayTime)
        )

        window.addEventListener('load', handleImageLoad)

        return () => {
            clearTimeout(timer)
            refreshTimers.forEach((t) => clearTimeout(t))
            window.removeEventListener('load', handleImageLoad)
            if (images) {
                images.forEach((img) => img.removeEventListener('load', handleImageLoad))
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])
}

