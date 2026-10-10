import { site } from '../data/site'
import { gsap } from '../utils/motion'
import { prefersReducedMotion } from '../utils/dom'

export function renderLoader(): void {
  const root = document.querySelector('#loader')
  if (!root) return
  root.innerHTML = `
    <div class="loader-inner">
      <img
        class="loader-logo"
        src="${site.logo.maroon}"
        alt=""
        width="110"
        height="110"
        data-loader-mark
      />
      <div class="loader-word">${site.name}</div>
      <div class="loader-desc">${site.descriptor}</div>
    </div>
  `
}

export async function playLoader(): Promise<void> {
  const root = document.querySelector('#loader')
  if (!root) return

  if (prefersReducedMotion() || sessionStorage.getItem('nabhaa-loaded') === '1') {
    root.classList.add('is-done')
    return
  }

  const logo = root.querySelector('.loader-logo')
  const word = root.querySelector('.loader-word')
  const desc = root.querySelector('.loader-desc')

  await gsap
    .timeline()
    .to(logo, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' })
    .to(word, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.28')
    .to(desc, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.18')
    .to({}, { duration: 0.28 })
    .to(root, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        root.classList.add('is-done')
        sessionStorage.setItem('nabhaa-loaded', '1')
      },
    })
}
