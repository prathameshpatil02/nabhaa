import { gsap, ScrollTrigger } from '../utils/motion'
import { prefersReducedMotion } from '../utils/dom'

export function initReveals(scope: ParentNode = document): void {
  if (prefersReducedMotion()) {
    scope.querySelectorAll('.reveal, .clip-reveal, .construction-line').forEach((el) => {
      el.classList.add('is-in')
    })
    return
  }

  scope.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => el.classList.add('is-in'),
    })
  })

  scope.querySelectorAll<HTMLElement>('.clip-reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => el.classList.add('is-in'),
    })
  })

  scope.querySelectorAll<HTMLElement>('.construction-line').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () => el.classList.add('is-in'),
    })
  })
}

export function initParallax(scope: ParentNode = document): void {
  if (prefersReducedMotion()) return

  scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax || 8),
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}
