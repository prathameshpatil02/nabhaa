import { site } from '../data/site'
import { renderFooter } from '../components/shared'
import { initReveals } from '../animations/reveals'
import type { PageModule } from '../router'

export const contactPage: PageModule = {
  title: `Contact — ${site.name}`,
  description: 'Start a conversation with NABHAA about architecture, interiors or spatial design.',
  render() {
    return `
      <main id="main" class="page">
        <section class="container projects-hero">
          <p class="eyebrow reveal">Contact</p>
          <h1 class="display display-lg reveal">Let's create a place worth remembering.</h1>
          <p class="lede reveal">
            Share a few details about your project. The studio reviews enquiries carefully and responds
            with intention — not automation.
          </p>
        </section>

        <section class="section section-tight">
          <div class="container contact-layout">
            <form class="contact-form reveal" data-contact-form novalidate>
              <div class="form-row two">
                <div class="field">
                  <label for="name">Name</label>
                  <input id="name" name="name" autocomplete="name" required />
                  <div class="error" data-error="name"></div>
                </div>
                <div class="field">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="email" autocomplete="email" required />
                  <div class="error" data-error="email"></div>
                </div>
              </div>
              <div class="form-row two">
                <div class="field">
                  <label for="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" autocomplete="tel" />
                  <div class="error" data-error="phone"></div>
                </div>
                <div class="field">
                  <label for="projectType">Project Type</label>
                  <select id="projectType" name="projectType" required>
                    <option value="">Select</option>
                    <option>Residence</option>
                    <option>Apartment Interior</option>
                    <option>Workplace</option>
                    <option>Hospitality</option>
                    <option>Commercial</option>
                    <option>Renovation</option>
                    <option>Other</option>
                  </select>
                  <div class="error" data-error="projectType"></div>
                </div>
              </div>
              <div class="form-row two">
                <div class="field">
                  <label for="location">Location</label>
                  <input id="location" name="location" required />
                  <div class="error" data-error="location"></div>
                </div>
                <div class="field">
                  <label for="area">Approximate Area</label>
                  <input id="area" name="area" placeholder="e.g. 350 sq.m" />
                  <div class="error" data-error="area"></div>
                </div>
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea id="message" name="message" required placeholder="Tell us about the site, programme and ambitions."></textarea>
                <div class="error" data-error="message"></div>
              </div>
              <button class="btn btn--maroon" type="submit">Send enquiry</button>
              <div class="form-success" data-form-success>
                <p class="eyebrow">Received</p>
                <p class="display display-sm">Thank you. Your enquiry has been noted.</p>
                <p class="lede">
                  This demo form validates on the client and stores nothing yet.
                  Connect your preferred endpoint in <code>src/pages/contact.ts</code> when ready.
                </p>
              </div>
            </form>

            <aside class="contact-aside reveal">
              <div>
                <p class="display display-sm">${site.name}</p>
                <p class="eyebrow" style="margin-top:0.75rem">${site.descriptor}</p>
              </div>
              <div>
                <p class="eyebrow">Email</p>
                <a href="mailto:${site.email}">${site.email}</a>
              </div>
              <div>
                <p class="eyebrow">Phone</p>
                <a href="${site.phoneHref}">${site.phone}</a>
              </div>
              <div>
                <p class="eyebrow">Studio</p>
                <p>${site.location}</p>
              </div>
              <div>
                <p class="eyebrow">Social</p>
                <p>
                  <a href="${site.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
                  &nbsp;·&nbsp;
                  <a href="${site.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
              </div>
            </aside>
          </div>
        </section>

        ${renderFooter()}
      </main>
    `
  },
  afterMount() {
    initReveals()

    const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
    const success = document.querySelector<HTMLElement>('[data-form-success]')
    if (!form || !success) return

    const clearErrors = () => {
      form.querySelectorAll<HTMLElement>('[data-error]').forEach((el) => {
        el.textContent = ''
      })
    }

    const setError = (name: string, message: string) => {
      const el = form.querySelector<HTMLElement>(`[data-error="${name}"]`)
      if (el) el.textContent = message
    }

    const onSubmit = (event: Event) => {
      event.preventDefault()
      clearErrors()

      const data = new FormData(form)
      const name = String(data.get('name') || '').trim()
      const email = String(data.get('email') || '').trim()
      const projectType = String(data.get('projectType') || '').trim()
      const location = String(data.get('location') || '').trim()
      const message = String(data.get('message') || '').trim()

      let valid = true
      if (!name) {
        setError('name', 'Please enter your name.')
        valid = false
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Please enter a valid email.')
        valid = false
      }
      if (!projectType) {
        setError('projectType', 'Please select a project type.')
        valid = false
      }
      if (!location) {
        setError('location', 'Please share the project location.')
        valid = false
      }
      if (!message || message.length < 12) {
        setError('message', 'Please add a short project note.')
        valid = false
      }

      if (!valid) return

      // Future integration point: POST to form endpoint / email service.
      success.classList.add('is-visible')
      form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach((el) => {
        ;(el as HTMLInputElement).disabled = true
      })
    }

    form.addEventListener('submit', onSubmit)
    return () => form.removeEventListener('submit', onSubmit)
  },
}
