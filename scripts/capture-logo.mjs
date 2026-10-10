import puppeteer from 'puppeteer-core'
import fs from 'fs'

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1800, height: 1500, deviceScaleFactor: 1 })
await page.goto('http://127.0.0.1:5177/logo-render.html', {
  waitUntil: 'networkidle0',
  timeout: 60000,
})
await page.waitForFunction(() => document.title === 'READY', { timeout: 60000 })

const dataUrl = await page.$eval('#c', (c) => c.toDataURL('image/png'))
const b64 = dataUrl.replace(/^data:image\/png;base64,/, '')
const out = 'public/assets/logo/nabhaa-logo-from-vector.png'
fs.writeFileSync(out, Buffer.from(b64, 'base64'))
console.log('saved', out, fs.statSync(out).size)
await browser.close()
