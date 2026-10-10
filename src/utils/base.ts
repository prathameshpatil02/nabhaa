/** Vite base path helper for GitHub Pages project sites */
export const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')

export function withBase(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return BASE_URL
  return `${BASE_URL}${normalized.slice(1)}`
}

export function stripBase(pathname: string): string {
  const base = BASE_URL.replace(/\/$/, '')
  if (!base) return pathname || '/'
  if (pathname === base || pathname === `${base}/`) return '/'
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/'
  return pathname || '/'
}
