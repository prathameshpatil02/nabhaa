export function initLightbox(scope: ParentNode = document): () => void {
  const triggers = Array.from(scope.querySelectorAll<HTMLElement>('[data-lightbox]'))
  if (!triggers.length) return () => undefined

  const overlay = document.createElement('div')
  overlay.className = 'lightbox'
  overlay.setAttribute('aria-hidden', 'true')
  overlay.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Close">Close</button>
    <button class="lightbox__nav lightbox__prev" type="button" aria-label="Previous">Prev</button>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__next" type="button" aria-label="Next">Next</button>
  `
  document.body.appendChild(overlay)

  const img = overlay.querySelector<HTMLImageElement>('.lightbox__img')!
  const caption = overlay.querySelector<HTMLElement>('.lightbox__caption')!
  const closeBtn = overlay.querySelector<HTMLButtonElement>('.lightbox__close')!
  const prevBtn = overlay.querySelector<HTMLButtonElement>('.lightbox__prev')!
  const nextBtn = overlay.querySelector<HTMLButtonElement>('.lightbox__next')!

  let index = 0
  const items = triggers.map((el) => ({
    src: el.getAttribute('data-lightbox') || el.querySelector('img')?.src || '',
    alt: el.getAttribute('data-lightbox-alt') || el.querySelector('img')?.alt || '',
  }))

  const show = (i: number) => {
    index = (i + items.length) % items.length
    const item = items[index]
    img.src = item.src
    img.alt = item.alt
    caption.textContent = item.alt
  }

  const open = (i: number) => {
    show(i)
    overlay.classList.add('is-open')
    overlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    overlay.classList.remove('is-open')
    overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  const onTrigger = (event: Event) => {
    const target = event.currentTarget as HTMLElement
    const i = triggers.indexOf(target)
    if (i >= 0) open(i)
  }

  const onKey = (event: KeyboardEvent) => {
    if (!overlay.classList.contains('is-open')) return
    if (event.key === 'Escape') close()
    if (event.key === 'ArrowRight') show(index + 1)
    if (event.key === 'ArrowLeft') show(index - 1)
  }

  triggers.forEach((el) => el.addEventListener('click', onTrigger))
  closeBtn.addEventListener('click', close)
  prevBtn.addEventListener('click', () => show(index - 1))
  nextBtn.addEventListener('click', () => show(index + 1))
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close()
  })
  window.addEventListener('keydown', onKey)

  return () => {
    triggers.forEach((el) => el.removeEventListener('click', onTrigger))
    window.removeEventListener('keydown', onKey)
    overlay.remove()
    document.body.style.overflow = ''
  }
}
