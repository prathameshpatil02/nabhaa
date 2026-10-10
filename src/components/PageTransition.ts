import { site } from '../data/site'
import { gsap } from '../utils/motion'
import { prefersReducedMotion } from '../utils/dom'

export function renderPageTransition(): void {
  const root = document.querySelector('#page-transition')
  if (!root) return
  root.innerHTML = `
    <div class="transition-panel"></div>
    <div class="transition-panel"></div>
    <div class="transition-mark">
      <img src="${site.logo.white}" alt="" width="72" height="72" />
    </div>
  `
}

export async function playPageTransition(onCovered: () => void): Promise<void> {
  const root = document.querySelector('#page-transition')
  if (!root) {
    onCovered()
    return
  }

  if (prefersReducedMotion()) {
    onCovered()
    return
  }

  const panels = root.querySelectorAll('.transition-panel')
  const mark = root.querySelector('.transition-mark')

  await gsap
    .timeline()
    .set(root, { pointerEvents: 'auto' })
    .to(panels, {
      scaleY: 1,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power3.inOut',
    })
    .to(mark, { opacity: 1, duration: 0.2 }, '-=0.15')
    .add(() => onCovered())
    .to(mark, { opacity: 0, duration: 0.2, delay: 0.08 })
    .to(panels, {
      scaleY: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power3.inOut',
    })
    .set(root, { pointerEvents: 'none' })
}
