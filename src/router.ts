import { updateDocumentMeta } from './utils/dom'
import { killPageScrollTriggers, refreshScroll, scrollToTop } from './utils/motion'
import { playPageTransition } from './components/PageTransition'
import { syncNavCurrent, setHeaderInverse } from './components/Header'
import { stripBase, withBase } from './utils/base'
import { homePage } from './pages/home'
import { projectsPage } from './pages/projects'
import { projectDetailPage } from './pages/projectDetail'
import { studioPage } from './pages/studio'
import { servicesPage } from './pages/services'
import { journalPage, journalDetailPage } from './pages/journal'
import { contactPage } from './pages/contact'
import { notFoundPage } from './pages/notFound'

export interface PageModule {
  title: string
  description: string
  image?: string
  inverseHeader?: boolean
  render: () => string
  afterMount?: () => void | (() => void)
}

type Cleanup = void | (() => void)

let currentCleanup: Cleanup
let navigating = false

function matchRoute(pathname: string): PageModule {
  if (pathname === '/' || pathname === '') return homePage
  if (pathname === '/projects') return projectsPage
  if (pathname === '/studio') return studioPage
  if (pathname === '/services') return servicesPage
  if (pathname === '/journal') return journalPage
  if (pathname === '/contact') return contactPage

  const projectMatch = pathname.match(/^\/projects\/([^/]+)\/?$/)
  if (projectMatch) return projectDetailPage(projectMatch[1])

  const journalMatch = pathname.match(/^\/journal\/([^/]+)\/?$/)
  if (journalMatch) return journalDetailPage(journalMatch[1])

  return notFoundPage
}

function runCleanup(): void {
  if (typeof currentCleanup === 'function') currentCleanup()
  currentCleanup = undefined
  killPageScrollTriggers()
}

function mountPage(page: PageModule, pathname: string): void {
  const app = document.querySelector('#app')
  if (!app) return

  runCleanup()
  app.innerHTML = page.render()

  updateDocumentMeta({
    title: page.title,
    description: page.description,
    path: pathname,
    image: page.image,
  })

  syncNavCurrent(pathname)
  setHeaderInverse(Boolean(page.inverseHeader))
  currentCleanup = page.afterMount?.()
  refreshScroll()
  scrollToTop(true)
}

export async function navigate(
  pathname: string,
  options?: { replace?: boolean; initial?: boolean },
): Promise<void> {
  const path = stripBase(pathname.split('?')[0].split('#')[0] || '/')
  if (navigating) return
  navigating = true

  try {
    const page = matchRoute(path)
    const fullPath = withBase(path)

    if (options?.initial) {
      history.replaceState({}, '', fullPath)
      mountPage(page, path)
      return
    }

    await playPageTransition(() => {
      if (options?.replace) history.replaceState({}, '', fullPath)
      else history.pushState({}, '', fullPath)
      mountPage(page, path)
    })
  } finally {
    navigating = false
  }
}

export function initRouter(): void {
  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement | null)?.closest('a[data-link]') as
      | HTMLAnchorElement
      | null
    if (!target) return

    const url = new URL(target.href, window.location.origin)
    if (url.origin !== window.location.origin) return

    event.preventDefault()
    const next = stripBase(url.pathname)
    const current = stripBase(window.location.pathname)
    if (next === current) {
      scrollToTop()
      return
    }
    void navigate(next)
  })

  window.addEventListener('popstate', () => {
    void navigate(window.location.pathname, { replace: true, initial: true })
  })
}
