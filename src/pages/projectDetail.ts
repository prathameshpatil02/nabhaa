import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import { initHorizontalRail } from '../components/HorizontalRail'
import { initLightbox } from '../components/Lightbox'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

const materialColors: Record<string, string> = {
  stone: '#D9C6B3',
  plaster: '#EFE9DE',
  timber: '#8A3F3A',
  wood: '#8A3F3A',
  teak: '#6B3E2E',
  oak: '#A67C52',
  brass: '#B18A52',
  concrete: '#9A9590',
  marble: '#E8E4DC',
  steel: '#4A4744',
  brick: '#8A3F3A',
  earth: '#B7A993',
  linen: '#E7DFD2',
  cane: '#C4A574',
}

function swatchFor(material: string): string {
  const key = Object.keys(materialColors).find((k) => material.toLowerCase().includes(k))
  return materialColors[key || ''] || '#B7A993'
}

export function projectDetailPage(slug: string): PageModule {
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: `Project not found — ${site.name}`,
      description: site.seo.description,
      render() {
        return `
          <main id="main" class="page not-found">
            <p class="eyebrow">404</p>
            <h1 class="display display-md">This project could not be found.</h1>
            <a class="btn btn--maroon" href="${withBase('/projects')}" data-link>Back to projects</a>
          </main>
        `
      },
    }
  }

  const related = getRelatedProjects(project.slug)
  const gallery = [project.cover, ...project.gallery]

  return {
    title: `${project.title} — ${site.name}`,
    description: project.statement,
    image: project.cover.src,
    render() {
      return `
        <main id="main" class="page">
          <section class="project-detail-hero-bleed">
            <div class="media project-detail-hero-bleed__media">
              <img src="${project.cover.src}" alt="${project.cover.alt}" fetchpriority="high" decoding="async" />
            </div>
            <div class="project-detail-hero-bleed__veil"></div>
            <div class="container project-detail-hero-bleed__copy">
              <p class="eyebrow">Project ${project.number}</p>
              <h1 class="display display-lg">${project.title}</h1>
              <p class="project-detail-hero-bleed__meta">
                ${project.location} · ${project.year} · ${project.typology}
              </p>
            </div>
          </section>

          <section class="section section-tight">
            <div class="container project-facts reveal">
              <div class="meta-item"><span>Location</span><strong>${project.location}</strong></div>
              <div class="meta-item"><span>Year</span><strong>${project.year}</strong></div>
              <div class="meta-item"><span>Typology</span><strong>${project.typology}</strong></div>
              <div class="meta-item"><span>Area</span><strong>${project.area}</strong></div>
              <div class="meta-item"><span>Services</span><strong>${project.services.join(' · ')}</strong></div>
              <div class="meta-item"><span>Status</span><strong>${project.status}</strong></div>
            </div>
          </section>

          <section class="section section-tight">
            <div class="container">
              <p class="project-statement reveal">${project.statement}</p>
            </div>
          </section>

          <section class="section section-tight">
            <div class="container">
              <div class="section-heading reveal">
                <p class="eyebrow">Gallery</p>
                <h2 class="display display-sm">Spatial sequence</h2>
              </div>
              <p class="rail-hint reveal">Drag sideways · click to expand</p>
            </div>
            <div class="h-rail" data-rail>
              <div class="h-rail__scroll" data-rail-scroll data-cursor="DRAG">
                ${gallery
                  .map(
                    (image, i) => `
                  <button
                    type="button"
                    class="h-rail__card h-rail__card--button"
                    data-lightbox="${image.src}"
                    data-lightbox-alt="${image.alt}"
                    data-cursor="EXPLORE"
                  >
                    <div class="h-rail__media">
                      <img src="${image.src}" alt="${image.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" />
                    </div>
                    <div class="h-rail__meta">
                      <span>${String(i + 1).padStart(2, '0')}</span>
                      <strong>${image.alt}</strong>
                    </div>
                  </button>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </section>

          <section class="section">
            <div class="container project-deep">
              <div class="reveal">
                <p class="eyebrow" style="margin-bottom:1rem">Design Philosophy</p>
                <p class="lede" style="max-width:40rem">${project.philosophy}</p>
              </div>
              <div class="reveal">
                <p class="eyebrow" style="margin-bottom:1rem">Spatial Sequence</p>
                <ol class="sequence-list">
                  ${project.sequence
                    .map(
                      (step, i) => `
                    <li>
                      <span>${String(i + 1).padStart(2, '0')}</span>
                      <div>${step}</div>
                    </li>
                  `,
                    )
                    .join('')}
                </ol>
              </div>
            </div>
          </section>

          <section class="section section-tight">
            <div class="container">
              <p class="eyebrow reveal" style="margin-bottom:1.25rem">Material Palette</p>
              <ul class="material-swatches reveal">
                ${project.materials
                  .map(
                    (material) => `
                  <li>
                    <span class="material-swatches__chip" style="background:${swatchFor(material)}"></span>
                    <span>${material}</span>
                  </li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          </section>

          <section class="section drawing-board">
            <div class="container drawing-board__grid">
              <div class="reveal">
                <p class="eyebrow">Drawings</p>
                <h2 class="display display-sm" style="margin:1rem 0 1.25rem">Plans · Sections · Elevations</h2>
                <p class="lede">
                  Drop construction drawings into <code>public/assets/images/projects/</code>
                  and reference them from project data. Until then, this board holds the structure.
                </p>
              </div>
              <div class="drawing-board__sheets reveal" aria-hidden="true">
                <div class="drawing-sheet">
                  <span>01 · Ground Floor</span>
                  <div class="drawing-sheet__lines"></div>
                </div>
                <div class="drawing-sheet">
                  <span>02 · Section AA</span>
                  <div class="drawing-sheet__lines drawing-sheet__lines--section"></div>
                </div>
                <div class="drawing-sheet">
                  <span>03 · South Elevation</span>
                  <div class="drawing-sheet__lines drawing-sheet__lines--elev"></div>
                </div>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="container reveal" style="display:grid;gap:1rem;max-width:40rem;">
              <p class="eyebrow">Closing</p>
              <p class="display display-sm">
                A place measured by light, held by material, and remembered through daily use.
              </p>
            </div>
          </section>

          <section class="section section-tight">
            <div class="container">
              <div class="section-heading reveal">
                <p class="eyebrow">Continue</p>
                <h2 class="display display-sm">Related projects</h2>
              </div>
              <div class="related-grid">
                ${related
                  .map(
                    (item) => `
                  <a class="journal-card reveal" href="${withBase(`/projects/${item.slug}`)}" data-link data-cursor="VIEW">
                    <div class="media">
                      <img src="${item.cover.src}" alt="${item.cover.alt}" loading="lazy" decoding="async" />
                    </div>
                    <div class="journal-card__meta">
                      <span>${item.number}</span>
                      <span>${item.city}</span>
                    </div>
                    <h3 class="journal-card__title">${item.title}</h3>
                  </a>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </section>

          ${renderFooter()}
        </main>
      `
    },
    afterMount() {
      initReveals()
      const railCleanup = initHorizontalRail(document.querySelector('[data-rail]') || document.body)
      const lightboxCleanup = initLightbox()
      return () => {
        railCleanup()
        lightboxCleanup()
      }
    },
  }
}
