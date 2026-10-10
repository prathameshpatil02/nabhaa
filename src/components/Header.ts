import { navLinks, site } from '../data/site'
import { renderLogo } from './shared'
import { withBase } from '../utils/base'

export function renderHeader(): string {
  return `
    <header class="site-header site-header--minimal" data-header>
      <div class="site-header__inner">
        ${renderLogo({ showWord: true })}
        <nav class="nav-desktop" aria-label="Primary">
          ${navLinks
            .map(
              (link) =>
                `<a href="${withBase(link.href)}" data-link data-nav-link data-nav-path="${link.href}">${link.label}</a>`,
            )
            .join('')}
        </nav>
        <button
          class="menu-toggle menu-toggle--always"
          type="button"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          data-menu-toggle
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
      <div class="brand-pattern mobile-menu__pattern" aria-hidden="true"></div>
      <nav class="mobile-menu__nav" aria-label="Mobile">
        ${navLinks
          .map(
            (link) =>
              `<a href="${withBase(link.href)}" data-link data-mobile-link>${link.label}</a>`,
          )
          .join('')}
      </nav>
      <div class="mobile-menu__footer">
        <img
          class="mobile-menu__mark"
          src="${site.logo.white}"
          alt=""
          width="72"
          height="72"
        />
        <p class="eyebrow" style="color: rgba(239,233,222,0.7)">${site.descriptor}</p>
        <a href="mailto:${site.email}">${site.email}</a>
      </div>
    </div>
  `
}

export function initHeader(): () => void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]')
  if (!header || !toggle || !menu) return () => undefined

  menu.hidden = false

  const onScroll = () => {
    header.classList.toggle('is-solid', window.scrollY > 24)
  }

  const closeMenu = () => {
    menu.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', 'Open menu')
    document.body.style.overflow = ''
  }

  const openMenu = () => {
    menu.classList.add('is-open')
    toggle.setAttribute('aria-expanded', 'true')
    toggle.setAttribute('aria-label', 'Close menu')
    document.body.style.overflow = 'hidden'
  }

  const onToggle = () => {
    if (menu.classList.contains('is-open')) closeMenu()
    else openMenu()
  }

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeMenu()
  }

  toggle.addEventListener('click', onToggle)
  menu.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()

  return () => {
    toggle.removeEventListener('click', onToggle)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKey)
    closeMenu()
  }
}

export function setHeaderInverse(active: boolean): void {
  const header = document.querySelector('[data-header]')
  header?.classList.toggle('is-inverse', active)
  const mark = header?.querySelector<HTMLImageElement>('.logo-mark')
  if (mark) {
    mark.src = active ? site.logo.white : site.logo.primary
    mark.classList.remove('logo-mark--on-dark')
  }
}

export function syncNavCurrent(pathname: string): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('data-nav-path') || '/'
    const current = href === pathname || (href !== '/' && pathname.startsWith(href))
    if (current) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })
}
