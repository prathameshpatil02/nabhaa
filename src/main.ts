import './styles/main.css'
import { renderHeader, initHeader } from './components/Header'
import { initCustomCursor } from './components/CustomCursor'
import { renderLoader, playLoader } from './components/LoadingScreen'
import { renderPageTransition } from './components/PageTransition'
import { initScrollProgress } from './components/ScrollProgress'
import { initSmoothScroll } from './utils/motion'
import { initRouter, navigate } from './router'

async function bootstrap(): Promise<void> {
  const app = document.querySelector('#app')
  if (!app) return

  renderLoader()
  renderPageTransition()

  // Shell chrome lives outside routed page content
  const shell = document.createElement('div')
  shell.id = 'shell'
  shell.innerHTML = renderHeader()
  document.body.insertBefore(shell, app)

  initRouter()
  initSmoothScroll()
  initHeader()
  initCustomCursor()
  initScrollProgress()

  await playLoader()
  await navigate(window.location.pathname, { initial: true, replace: true })
}

void bootstrap()
