import { site } from '../data/site'
import type { PageModule } from '../router'
import { withBase } from '../utils/base'

export const notFoundPage: PageModule = {
  title: `Page not found — ${site.name}`,
  description: site.seo.description,
      render() {
        return `
          <main id="main" class="page not-found">
            <img src="${site.logo.maroon}" alt="" width="64" height="64" style="margin-inline:auto" />
            <p class="eyebrow">404</p>
            <h1 class="display display-md">This room does not exist.</h1>
            <p class="lede" style="margin-inline:auto">
              The page you are looking for has moved, or was never drawn into the plan.
            </p>
            <a class="btn btn--maroon" href="${withBase('/')}" data-link>Return home</a>
          </main>
        `
      },
}
