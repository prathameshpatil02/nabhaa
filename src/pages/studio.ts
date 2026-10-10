import { studio } from '../data/studio'
import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

export const studioPage: PageModule = {
  title: `Studio — ${site.name}`,
  description:
    'NABHAA shapes space through light, material, proportion and atmosphere — an architecture and interiors studio based in Pune.',
  render() {
    return `
      <main id="main" class="page">
        <section class="container studio-hero">
          <p class="eyebrow reveal">${site.name}</p>
          <p class="eyebrow reveal" style="letter-spacing:0.22em">${site.descriptor}</p>
          <h1 class="studio-opening reveal">${studio.opening}</h1>
          <p class="lede reveal">${studio.intro}</p>
        </section>

        <section class="container studio-sections">
          ${studio.sections
            .map(
              (section) => `
            <article class="studio-section" id="${section.id}">
              <div class="reveal">
                <p class="studio-section__title">${section.title}</p>
                <p class="studio-section__text">${section.text}</p>
              </div>
              <div class="media clip-reveal">
                <img src="${section.image}" alt="${section.imageAlt}" loading="lazy" decoding="async" />
              </div>
            </article>
          `,
            )
            .join('')}
        </section>

        <section class="section process-section">
          <div class="container">
            <div class="section-heading reveal">
              <p class="eyebrow">Method</p>
              <h2 class="display display-sm">From listening to inhabiting</h2>
            </div>
            <p class="lede reveal" style="margin-bottom:2rem">
              Every commission moves through a calm sequence — listen, compose, materialise, detail, inhabit —
              so the finished place feels inevitable rather than imposed.
            </p>
            <a class="btn btn--maroon reveal" href="${withBase('/projects')}" data-link>See the work</a>
          </div>
        </section>

        <section class="cta-band">
          <div class="container cta-band__inner reveal">
            <p class="eyebrow">Contact</p>
            <h2 class="display display-md">A studio for meaningful spaces.</h2>
            <a class="btn btn--maroon" href="${withBase('/contact')}" data-link>Work with NABHAA</a>
          </div>
        </section>

        ${renderFooter()}
      </main>
    `
  },
  afterMount() {
    initReveals()
  },
}
