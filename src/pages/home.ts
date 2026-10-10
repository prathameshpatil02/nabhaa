import { site } from '../data/site'
import { getFeaturedProjects, projects } from '../data/projects'
import { processSteps } from '../data/process'
import { journalArticles } from '../data/journal'
import { renderFooter, sectionHeading } from '../components/shared'
import { setHeaderInverse } from '../components/Header'
import { initHorizontalRail } from '../components/HorizontalRail'
import { initParallax, initReveals } from '../animations/reveals'
import { gsap, ScrollTrigger } from '../utils/motion'
import { prefersReducedMotion } from '../utils/dom'
import { splitLinesHtml } from '../utils/split'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

export const homePage: PageModule = {
  title: site.seo.title,
  description: site.seo.description,
  inverseHeader: true,
  render() {
    const featured = getFeaturedProjects()
    const railProjects = projects.slice(0, 6)
    const articles = journalArticles.slice(0, 3)
    const marquee = [...site.themes, ...site.themes].join(' · ')

    return `
      <main id="main" class="page" style="padding-top:0">
        <section class="home-hero home-hero--ingenio" data-home-hero>
          <div class="home-hero__media">
            <img
              data-parallax="8"
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
              alt="Architectural courtyard bathed in warm morning light"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div class="home-hero__veil home-hero__veil--cinematic"></div>
          <div class="home-hero__gridlines" aria-hidden="true"></div>
          <div class="home-hero__stage">
            <img
              class="home-hero__mark"
              src="${site.logo.white}"
              alt=""
              width="88"
              height="88"
              decoding="async"
              data-hero-mark
              class="home-hero__mark"
            />
            <h1 class="home-hero__tagline" data-hero-title aria-label="${site.tagline}">
              <span class="home-hero__lead">${site.heroLead}</span>
              <span class="home-hero__emphasis">${site.heroEmphasis}</span>
            </h1>
            <p class="home-hero__sub eyebrow">${site.descriptor}</p>
          </div>
          <div class="home-hero__scroll" aria-hidden="true">
            <span class="home-hero__scroll-line"></span>
            <span>Scroll</span>
          </div>
        </section>

        <section class="home-manifesto" data-manifesto>
          <div class="container home-manifesto__layout">
            <p class="eyebrow reveal">Studio</p>
            <h2 class="home-manifesto__text reveal" data-split-manifesto>
              ${splitLinesHtml([
                'We shape space through',
                'light, material,',
                'proportion and atmosphere.',
              ])}
            </h2>
            <p class="lede reveal" style="margin-inline:auto;text-align:center">
              ${site.manifesto}
            </p>
          </div>
        </section>

        <section class="home-marquee" aria-label="Themes">
          <div class="home-marquee__track">
            <span>${marquee}</span>
            <span>${marquee}</span>
          </div>
        </section>

        <section class="section section-tight home-rail-section">
          <div class="container">
            ${sectionHeading({
              eyebrow: 'Selected Work',
              title: 'Projects in sequence',
              actionLabel: 'View all',
              actionHref: '/projects',
            })}
            <p class="rail-hint reveal">Drag or scroll sideways · <span data-cursor="DRAG">editorial rail</span></p>
          </div>
          <div class="h-rail" data-rail>
            <div class="h-rail__scroll" data-rail-scroll data-cursor="DRAG">
              ${railProjects
                .map(
                  (project) => `
                <a class="h-rail__card" href="${withBase(`/projects/${project.slug}`)}" data-link data-cursor="VIEW">
                  <div class="h-rail__media">
                    <img src="${project.cover.src}" alt="${project.cover.alt}" loading="lazy" decoding="async" />
                  </div>
                  <div class="h-rail__meta">
                    <span>${project.number}</span>
                    <strong>${project.title}</strong>
                    <span>${project.city} · ${project.year}</span>
                  </div>
                </a>
              `,
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="section home-features">
          <div class="container">
            ${sectionHeading({
              eyebrow: 'Featured',
              title: 'Spaces at full scale',
            })}
          </div>
          <div class="home-features__list">
            ${featured
              .map(
                (project, index) => `
              <a
                class="feature-panel reveal"
                href="${withBase(`/projects/${project.slug}`)}"
                data-link
                data-cursor="VIEW"
              >
                <div class="feature-panel__media">
                  <img
                    src="${project.cover.src}"
                    alt="${project.cover.alt}"
                    loading="${index === 0 ? 'eager' : 'lazy'}"
                    decoding="async"
                  />
                </div>
                <div class="feature-panel__veil"></div>
                <div class="feature-panel__copy">
                  <span class="feature-panel__number">${project.number}</span>
                  <h3 class="feature-panel__title">${project.title}</h3>
                  <p class="feature-panel__meta">${project.typology} · ${project.city} · ${project.year}</p>
                </div>
              </a>
            `,
              )
              .join('')}
          </div>
        </section>

        <section class="section process-section">
          <div class="container">
            ${sectionHeading({
              eyebrow: 'Method',
              title: 'How a place comes into being',
            })}
            <ol class="process-list">
              ${processSteps
                .map(
                  (step) => `
                <li class="process-item reveal">
                  <span class="process-item__id">${step.id}</span>
                  <div>
                    <h3 class="process-item__title">${step.title}</h3>
                    <p class="process-item__text">${step.text}</p>
                  </div>
                </li>
              `,
                )
                .join('')}
            </ol>
          </div>
        </section>

        <section class="home-bridge reveal" aria-hidden="true">
          <div class="home-bridge__media">
            <img
              src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=2000&q=80"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="home-bridge__veil"></div>
          <p class="home-bridge__caption">Light · Material · Place</p>
        </section>

        <section class="home-stats section-tight">
          <div class="container home-stats__grid">
            ${site.stats
              .map(
                (stat) => `
              <div class="home-stat reveal">
                <p class="home-stat__value">${stat.value}</p>
                <p class="home-stat__label">${stat.label}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <section class="home-statement">
          <img
            class="home-statement__mark reveal"
            src="${site.logo.maroon}"
            alt=""
            width="120"
            height="120"
            loading="lazy"
          />
          <p class="reveal display display-sm" style="max-width:14ch;margin-inline:auto">
            Space before spectacle. Atmosphere before ornament.
          </p>
          <a class="btn btn--maroon reveal" href="${withBase('/studio')}" data-link>Enter the studio</a>
        </section>

        <section class="section">
          <div class="container">
            ${sectionHeading({
              eyebrow: 'Journal',
              title: 'Notes on light, material and place',
              actionLabel: 'All writing',
              actionHref: '/journal',
            })}
            <div class="home-journal-grid">
              ${articles
                .map(
                  (article) => `
                <a class="journal-card reveal" href="${withBase(`/journal/${article.slug}`)}" data-link data-cursor="READ">
                  <div class="media">
                    <img src="${article.cover}" alt="${article.coverAlt}" loading="lazy" decoding="async" />
                  </div>
                  <div class="journal-card__meta">
                    <span>${article.category}</span>
                    <span>${article.date}</span>
                  </div>
                  <h3 class="journal-card__title">${article.title}</h3>
                </a>
              `,
                )
                .join('')}
            </div>
          </div>
        </section>

        <section class="cta-band">
          <div class="container cta-band__inner reveal">
            <p class="eyebrow">Begin</p>
            <h2 class="display display-md">Let's create a place worth remembering.</h2>
            <a class="btn btn--maroon" href="${withBase('/contact')}" data-link>Start a conversation</a>
          </div>
        </section>

        ${renderFooter()}
      </main>
    `
  },
  afterMount() {
    setHeaderInverse(true)
    initReveals()
    initParallax()
    const railCleanup = initHorizontalRail(document.querySelector('[data-rail]') || document.body)

    const hero = document.querySelector('[data-home-hero]')
    const onScroll = () => {
      if (!hero) return
      setHeaderInverse(hero.getBoundingClientRect().bottom > 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    if (!prefersReducedMotion() && hero) {
      const img = hero.querySelector('img[data-parallax]')
      if (img) {
        gsap.to(img, {
          scale: 1.12,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-mark]', { y: 28, opacity: 0, duration: 1.05 })
        .from(
          '[data-hero-title] .home-hero__lead, [data-hero-title] .home-hero__emphasis',
          { y: 40, opacity: 0, duration: 1, stagger: 0.12 },
          '-=0.55',
        )
        .from('.home-hero__sub, .home-hero__scroll', { opacity: 0, duration: 0.6 }, '-=0.35')

      gsap.utils.toArray<HTMLElement>('.split-line__inner').forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        })
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      railCleanup()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  },
}
