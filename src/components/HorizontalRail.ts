import { prefersReducedMotion } from '../utils/dom'

/** Native horizontal drag + wheel translation for editorial rails */
export function initHorizontalRail(root: HTMLElement): () => void {
  const scroller = root.querySelector<HTMLElement>('[data-rail-scroll]')
  if (!scroller) return () => undefined

  let isDown = false
  let startX = 0
  let startScroll = 0
  let moved = false

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    isDown = true
    moved = false
    startX = event.clientX
    startScroll = scroller.scrollLeft
    scroller.classList.add('is-dragging')
    scroller.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDown) return
    const dx = event.clientX - startX
    if (Math.abs(dx) > 4) moved = true
    scroller.scrollLeft = startScroll - dx
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!isDown) return
    isDown = false
    scroller.classList.remove('is-dragging')
    try {
      scroller.releasePointerCapture(event.pointerId)
    } catch {
      /* ignore */
    }
  }

  const onClickCapture = (event: MouseEvent) => {
    if (moved) {
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }
  }

  const onWheel = (event: WheelEvent) => {
    if (prefersReducedMotion()) return
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    if (scroller.scrollWidth <= scroller.clientWidth + 8) return
    event.preventDefault()
    scroller.scrollLeft += event.deltaY
  }

  scroller.addEventListener('pointerdown', onPointerDown)
  scroller.addEventListener('pointermove', onPointerMove)
  scroller.addEventListener('pointerup', onPointerUp)
  scroller.addEventListener('pointercancel', onPointerUp)
  scroller.addEventListener('click', onClickCapture, true)
  scroller.addEventListener('wheel', onWheel, { passive: false })

  return () => {
    scroller.removeEventListener('pointerdown', onPointerDown)
    scroller.removeEventListener('pointermove', onPointerMove)
    scroller.removeEventListener('pointerup', onPointerUp)
    scroller.removeEventListener('pointercancel', onPointerUp)
    scroller.removeEventListener('click', onClickCapture, true)
    scroller.removeEventListener('wheel', onWheel)
  }
}
