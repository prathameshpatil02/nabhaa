import { site } from '../data/site'
import { formatYear } from '../utils/dom'
import { withBase } from '../utils/base'

export function renderLogo(options?: {
  showWord?: boolean
  className?: string
  mark?: 'primary' | 'white' | 'maroon'
}): string {
  const showWord = options?.showWord ?? true
  const className = options?.className ?? ''
  const mark =
    options?.mark === 'white'
      ? site.logo.white
      : options?.mark === 'maroon'
        ? site.logo.maroon
        : site.logo.primary

  return `
    <a href="${withBase('/')}" class="logo-link ${className}" data-link aria-label="NABHAA home">
      <img
        class="logo-mark"
        src="${mark}"
        alt="${site.logo.alt}"
        width="72"
        height="72"
        decoding="async"
      />
      ${showWord ? `<span class="logo-word">${site.name}</span>` : ''}
    </a>
  `
}

export function renderBrandPattern(extraClass = ''): string {
  return `<div class="brand-pattern ${extraClass}" aria-hidden="true"></div>`
}

export function renderFooter(): string {
  return `
    <footer class="site-footer">
      ${renderBrandPattern('site-footer__pattern')}
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <img
            class="site-footer__butterfly"
            src="${site.logo.white}"
            alt=""
            width="72"
            height="72"
            loading="lazy"
            decoding="async"
          />
          <div class="site-footer__name">${site.name}</div>
          <p class="eyebrow" style="color: rgba(239,233,222,0.72)">${site.descriptor}</p>
          <p class="display-sm" style="font-family: var(--font-serif); max-width: 16ch;">
            ${site.tagline}
          </p>
        </div>
        <div class="site-footer__grid">
          <nav class="site-footer__links" aria-label="Footer">
            <a href="${withBase('/projects')}" data-link>Projects</a>
            <a href="${withBase('/studio')}" data-link>Studio</a>
            <a href="${withBase('/services')}" data-link>Services</a>
            <a href="${withBase('/journal')}" data-link>Journal</a>
            <a href="${withBase('/contact')}" data-link>Contact</a>
          </nav>
          <div class="site-footer__social">
            <a href="mailto:${site.email}">${site.email}</a><br />
            <a href="${site.phoneHref}">${site.phone}</a>
          </div>
          <div class="site-footer__social">
            <a href="${site.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a><br />
            <a href="${site.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><br />
            <span>${site.location}</span>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span>© ${formatYear()} ${site.name}</span>
          <span>Architecture · Interiors · Spatial Design</span>
        </div>
      </div>
    </footer>
  `
}

export function sectionHeading(options: {
  eyebrow?: string
  title: string
  actionLabel?: string
  actionHref?: string
}): string {
  return `
    <div class="section-heading reveal">
      <div class="section-heading__top">
        ${options.eyebrow ? `<p class="eyebrow">${options.eyebrow}</p>` : '<span></span>'}
        ${
          options.actionHref && options.actionLabel
            ? `<a class="btn btn--maroon" href="${withBase(options.actionHref)}" data-link>${options.actionLabel}</a>`
            : ''
        }
      </div>
      <h2 class="display display-md">${options.title}</h2>
    </div>
  `
}

export function renderProjectBlock(
  project: {
    slug: string
    number: string
    title: string
    location: string
    city: string
    year: string
    typology: string
    area?: string
    layout: string
    cover: { src: string; alt: string }
    secondary?: { src: string; alt: string }
  },
  options?: { forceLayout?: string },
): string {
  const layout = options?.forceLayout || project.layout
  const isSplit = layout === 'split' && project.secondary

  return `
    <a
      class="project-block reveal"
      href="${withBase(`/projects/${project.slug}`)}"
      data-link
      data-cursor="VIEW"
      data-layout="${layout}"
    >
      <div class="project-block__meta">
        <span class="project-block__number">PROJECT ${project.number}</span>
        <div class="project-block__details">
          <span>${project.location}</span>
          <span>${project.year}</span>
        </div>
      </div>
      <h3 class="project-block__title">${project.title}</h3>
      ${
        isSplit
          ? `
        <div class="project-block__split">
          <div class="media clip-reveal project-block__split-main">
            <img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />
          </div>
          <div class="media clip-reveal project-block__split-side">
            <img src="${project.secondary!.src}" alt="${project.secondary!.alt}" loading="lazy" decoding="async" />
          </div>
        </div>
      `
          : `
        <div class="media clip-reveal">
          <img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />
        </div>
      `
      }
      <div class="project-block__details">
        <span>${project.typology}</span>
        ${project.area ? `<span>${project.area}</span>` : `<span>${project.city}</span>`}
      </div>
    </a>
  `
}
