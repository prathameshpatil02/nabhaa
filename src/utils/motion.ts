import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefersReducedMotion } from './dom'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenis
}

export function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.4,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function scrollToTop(immediate = false): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate, duration: immediate ? 0 : 0.9 })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}

export function refreshScroll(): void {
  ScrollTrigger.refresh()
  lenis?.resize()
}

export function killPageScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export { gsap, ScrollTrigger }
