import { projects } from '../data/projects'
import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

const typologies = ['All', ...Array.from(new Set(projects.map((p) => p.typology)))]

export const projectsPage: PageModule = {
  title: `Projects — ${site.name}`,
  description: 'Selected architecture, interiors and spatial design projects by NABHAA.',
  render() {
    return `
      <main id="main" class="page">
        <section class="container projects-hero">
          <p class="eyebrow reveal">Index</p>
          <h1 class="display display-lg reveal">Projects</h1>
          <p class="lede reveal">
            Explore the work as a drawing set, a list, or an editorial field —
            three ways of reading the same body of architecture.
          </p>
        </section>

        <section class="container projects-toolbar reveal">
          <div class="projects-filters" role="group" aria-label="Filter by typology">
            ${typologies
              .map(
                (type, i) => `
              <button
                type="button"
                class="chip ${i === 0 ? 'is-active' : ''}"
                data-filter="${type}"
              >${type}</button>
            `,
              )
              .join('')}
          </div>
          <div class="projects-modes" role="group" aria-label="View mode">
            <button type="button" class="chip is-active" data-mode="editorial">Editorial</button>
            <button type="button" class="chip" data-mode="grid">Grid</button>
            <button type="button" class="chip" data-mode="list">List</button>
          </div>
        </section>

        <section class="container projects-index" data-projects-index data-mode="editorial">
          ${projects
            .map(
              (project) => `
            <a
              class="project-entry"
              href="${withBase(`/projects/${project.slug}`)}"
              data-link
              data-cursor="VIEW"
              data-typology="${project.typology}"
              data-layout="${project.layout}"
            >
              <div class="project-entry__media">
                <img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />
              </div>
              <div class="project-entry__copy">
                <span class="project-entry__number">${project.number}</span>
                <h2 class="project-entry__title">${project.title}</h2>
                <p class="project-entry__meta">
                  <span>${project.typology}</span>
                  <span>${project.location}</span>
                  <span>${project.year}</span>
                </p>
                <p class="project-entry__excerpt">${project.statement}</p>
              </div>
            </a>
          `,
            )
            .join('')}
        </section>
        ${renderFooter()}
      </main>
    `
  },
  afterMount() {
    initReveals()
    const index = document.querySelector<HTMLElement>('[data-projects-index]')
    const filterBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'))
    const modeBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-mode]'))
    const entries = Array.from(document.querySelectorAll<HTMLElement>('.project-entry'))
    if (!index) return

    let activeFilter = 'All'
    let activeMode = 'editorial'

    const apply = () => {
      index.dataset.mode = activeMode
      entries.forEach((entry) => {
        const typology = entry.dataset.typology || ''
        const show = activeFilter === 'All' || typology === activeFilter
        entry.hidden = !show
        entry.classList.toggle('is-dimmed', false)
      })
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter || 'All'
        filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn))
        apply()
      })
    })

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeMode = btn.dataset.mode || 'editorial'
        modeBtns.forEach((b) => b.classList.toggle('is-active', b === btn))
        apply()
      })
    })

    entries.forEach((entry) => {
      entry.addEventListener('mouseenter', () => {
        if (activeMode !== 'editorial') return
        entries.forEach((other) => {
          if (other === entry || other.hidden) return
          other.classList.add('is-dimmed')
        })
      })
      entry.addEventListener('mouseleave', () => {
        entries.forEach((other) => other.classList.remove('is-dimmed'))
      })
    })

    apply()
  },
}
