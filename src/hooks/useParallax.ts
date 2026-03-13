import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fast, snappy parallax scroll animations using GSAP ScrollTrigger.
 * 
 * Supported data-parallax values:
 * - "slow"        → background layer, drifts slower than scroll
 * - "fast"        → foreground accent, drifts faster than scroll
 * - "fade"        → fades + slides up into view on scroll
 * - "scale"       → scales up into view
 * - "slide-left"  → slides in from left
 * - "slide-right" → slides in from right
 * - "slide-up"    → slides up into view
 * - "rotate"      → subtle rotation on scroll
 * 
 * Optional attributes:
 * - data-parallax-speed="<number>"  (default 1)
 * - data-parallax-delay="<seconds>" (default 0)
 */
export function useParallax() {
    useEffect(() => {
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
                                duration: 0.5,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 90%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'scale':
                        gsap.fromTo(
                            el,
                            { scale: 0.92, opacity: 0 },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.45,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 90%',
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
                            { x: -60 * speed, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.5,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 90%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'slide-right':
                        gsap.fromTo(
                            el,
                            { x: 60 * speed, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.5,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 90%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break

                    case 'slide-up':
                        gsap.fromTo(
                            el,
                            { y: 50 * speed, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                delay,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: 'top 95%',
                                    toggleActions: 'play none none none',
                                },
                            }
                        )
                        break
                }
            })

            ScrollTrigger.refresh()
        }, 100)

        return () => {
            clearTimeout(timer)
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])
}
