import { getArticleBySlug, journalArticles } from '../data/journal'
import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

export const journalPage: PageModule = {
  title: `Journal — ${site.name}`,
  description: 'Editorial notes on architecture, light, material, climate and atmosphere from NABHAA.',
  render() {
    return `
      <main id="main" class="page">
        <section class="container projects-hero">
          <p class="eyebrow reveal">Writing</p>
          <h1 class="display display-lg reveal">Journal</h1>
          <p class="lede reveal">
            Short essays and reflections from the studio — on light, courtyards, material memory,
            climate and the making of atmosphere.
          </p>
        </section>

        <section class="section section-tight">
          <div class="container journal-grid">
            ${journalArticles
              .map(
                (article) => `
              <a class="journal-card reveal" href="${withBase(`/journal/${article.slug}`)}" data-link data-cursor="READ">
                <div class="media">
                  <img src="${article.cover}" alt="${article.coverAlt}" loading="lazy" decoding="async" />
                </div>
                <div class="journal-card__meta">
                  <span>${article.category}</span>
                  <span>${article.date}</span>
                  <span>${article.readTime}</span>
                </div>
                <h2 class="journal-card__title">${article.title}</h2>
                <p class="lede" style="font-size:0.95rem">${article.excerpt}</p>
              </a>
            `,
              )
              .join('')}
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

export function journalDetailPage(slug: string): PageModule {
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: `Article not found — ${site.name}`,
      description: site.seo.description,
      render() {
        return `
          <main id="main" class="page not-found">
            <p class="eyebrow">404</p>
            <h1 class="display display-md">This article could not be found.</h1>
            <a class="btn btn--maroon" href="${withBase('/journal')}" data-link>Back to journal</a>
          </main>
        `
      },
    }
  }

  return {
    title: `${article.title} — ${site.name}`,
    description: article.excerpt,
    image: article.cover,
    render() {
      return `
        <main id="main" class="page">
          <article class="container" style="padding-bottom: var(--pad-y);">
            <div class="article-hero">
              <p class="eyebrow reveal">${article.category} · ${article.date}</p>
              <h1 class="display display-lg reveal">${article.title}</h1>
              <p class="lede reveal">${article.subtitle}</p>
              <div class="media clip-reveal" style="aspect-ratio: 16/9; margin-top: 1rem;">
                <img src="${article.cover}" alt="${article.coverAlt}" fetchpriority="high" decoding="async" />
              </div>
            </div>
            <div class="article-body reveal">
              ${article.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
            <div style="margin-top: 3rem;" class="reveal">
              <a class="btn btn--maroon" href="${withBase('/journal')}" data-link>All journal entries</a>
            </div>
          </article>
          ${renderFooter()}
        </main>
      `
    },
    afterMount() {
      initReveals()
    },
  }
}
