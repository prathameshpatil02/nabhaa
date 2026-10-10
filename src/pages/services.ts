import { services } from '../data/services'
import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

export const servicesPage: PageModule = {
  title: `Services — ${site.name}`,
  description:
    'Architecture, interior architecture, spatial design and related services by NABHAA.',
  render() {
    return `
      <main id="main" class="page">
        <section class="container projects-hero">
          <p class="eyebrow reveal">Capabilities</p>
          <h1 class="display display-lg reveal">Services</h1>
          <p class="lede reveal">
            Each engagement is led by a clear spatial idea — then developed through material,
            detail and construction with calm precision.
          </p>
        </section>

        <section class="section section-tight">
          <div class="container services-layout">
            <div class="services-media reveal" data-services-media aria-hidden="true">
              ${services
                .map(
                  (service, index) => `
                <img
                  src="${service.image}"
                  alt=""
                  data-service-image="${service.id}"
                  class="${index === 0 ? 'is-active' : ''}"
                  loading="${index === 0 ? 'eager' : 'lazy'}"
                  decoding="async"
                />
              `,
                )
                .join('')}
            </div>
            <div class="services-list" role="list">
              ${services
                .map(
                  (service, index) => `
                <button
                  class="service-item ${index === 0 ? 'is-active' : ''} reveal"
                  type="button"
                  role="listitem"
                  data-service="${service.id}"
                  aria-expanded="${index === 0 ? 'true' : 'false'}"
                >
                  <span class="eyebrow">${service.short}</span>
                  <span class="service-item__title">${service.title}</span>
                  <span class="service-item__line" aria-hidden="true"></span>
                  <span class="service-item__desc">${service.description}</span>
                </button>
              `,
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section">
          <div class="container reveal" style="display:grid;gap:1.25rem;max-width:40rem;">
            <p class="eyebrow">Next</p>
            <h2 class="display display-sm">Tell us about the place you want to create.</h2>
            <a class="btn btn--maroon" href="${withBase('/contact')}" data-link>Begin a project</a>
          </div>
        </section>

        ${renderFooter()}
      </main>
    `
  },
  afterMount() {
    initReveals()

    const items = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-service]'))
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('[data-service-image]'))

    const activate = (id: string) => {
      items.forEach((item) => {
        const active = item.dataset.service === id
        item.classList.toggle('is-active', active)
        item.setAttribute('aria-expanded', active ? 'true' : 'false')
      })
      images.forEach((image) => {
        image.classList.toggle('is-active', image.dataset.serviceImage === id)
      })
    }

    const onEnter = (event: Event) => {
      const id = (event.currentTarget as HTMLElement).dataset.service
      if (id) activate(id)
    }

    items.forEach((item) => {
      item.addEventListener('mouseenter', onEnter)
      item.addEventListener('focus', onEnter)
      item.addEventListener('click', onEnter)
    })

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', onEnter)
        item.removeEventListener('focus', onEnter)
        item.removeEventListener('click', onEnter)
      })
    }
  },
}
