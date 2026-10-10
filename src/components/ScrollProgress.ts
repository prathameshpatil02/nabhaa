export function initScrollProgress(): () => void {
  const bar = document.querySelector<HTMLElement>('#scroll-progress')
  if (!bar) return () => undefined

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0
    bar.style.width = `${progress}%`
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  return () => window.removeEventListener('scroll', onScroll)
}
