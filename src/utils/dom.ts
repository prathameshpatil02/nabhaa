export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTouchDevice(): boolean {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

export function qs<T extends Element>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector(selector)
  if (!el) throw new Error(`Missing element: ${selector}`)
  return el as T
}

export function qsa<T extends Element>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll(selector)) as T[]
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function formatYear(): number {
  return new Date().getFullYear()
}

export function updateDocumentMeta(options: {
  title: string
  description: string
  path: string
  image?: string
}): void {
  document.title = options.title

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('meta[name="description"]', 'content', options.description)
  setMeta('meta[property="og:title"]', 'content', options.title)
  setMeta('meta[property="og:description"]', 'content', options.description)
  setMeta('meta[property="og:url"]', 'content', `https://nabhaa.studio${options.path}`)
  setMeta('meta[name="twitter:title"]', 'content', options.title)
  setMeta('meta[name="twitter:description"]', 'content', options.description)
  setMeta('link[rel="canonical"]', 'href', `https://nabhaa.studio${options.path}`)

  if (options.image) {
    setMeta('meta[property="og:image"]', 'content', options.image)
    setMeta('meta[name="twitter:image"]', 'content', options.image)
  }
}
