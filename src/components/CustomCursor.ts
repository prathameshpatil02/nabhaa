import { isTouchDevice, prefersReducedMotion } from '../utils/dom'

export function initCustomCursor(): () => void {
  const cursor = document.querySelector<HTMLElement>('#cursor')
  if (!cursor || isTouchDevice() || prefersReducedMotion()) {
    document.body.classList.remove('has-custom-cursor')
    return () => undefined
  }

  document.body.classList.add('has-custom-cursor')
  let visible = false

  const move = (event: PointerEvent) => {
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    if (!visible) {
      cursor.classList.add('is-active')
      visible = true
    }
  }

  const onOver = (event: Event) => {
    const target = (event.target as HTMLElement | null)?.closest?.('[data-cursor]') as
      | HTMLElement
      | null
    if (!target) return
    const label = target.getAttribute('data-cursor') || ''
    cursor.dataset.label = label
    cursor.classList.add('is-label')
  }

  const onOut = (event: Event) => {
    const target = (event.target as HTMLElement | null)?.closest?.('[data-cursor]')
    if (!target) return
    cursor.classList.remove('is-label')
    cursor.removeAttribute('data-label')
  }

  window.addEventListener('pointermove', move)
  document.addEventListener('pointerover', onOver)
  document.addEventListener('pointerout', onOut)

  return () => {
    window.removeEventListener('pointermove', move)
    document.removeEventListener('pointerover', onOver)
    document.removeEventListener('pointerout', onOut)
    document.body.classList.remove('has-custom-cursor')
    cursor.classList.remove('is-active', 'is-label')
  }
}
