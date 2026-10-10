/**
 * Build clean transparent logo variants for web UI.
 * Source: hi-res vector raster (ivory/white bg) + symbol lockup.
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logoDir = path.resolve(__dirname, '../public/assets/logo')

async function knockOutLightBackground(inputPath, outputPath, options = {}) {
  const { threshold = 245, trim = true } = options
  const image = sharp(inputPath).ensureAlpha()
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // Knock out near-white / ivory paper backgrounds
    const isPaper = r >= threshold && g >= threshold - 8 && b >= threshold - 20
    const isIvory = r > 230 && g > 220 && b > 200 && Math.abs(r - g) < 25 && g >= b
    if (isPaper || isIvory) {
      data[i + 3] = 0
    }
  }

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).png()

  if (trim) {
    pipeline = pipeline.trim({ threshold: 10 })
  }

  await pipeline.toFile(outputPath)
  console.log('wrote', path.basename(outputPath))
}

async function toSolidSilhouette(inputPath, outputPath, rgb) {
  const image = sharp(inputPath).ensureAlpha()
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })
  const [nr, ng, nb] = rgb

  for (let i = 0; i < data.length; i += info.channels) {
    const a = data[i + 3]
    if (a < 12) {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
      data[i + 3] = 0
      continue
    }
    data[i] = nr
    data[i + 1] = ng
    data[i + 2] = nb
    // Keep soft edge alpha from source for anti-aliasing
    data[i + 3] = a
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toFile(outputPath)

  console.log('wrote', path.basename(outputPath))
}

async function resizeSquare(inputPath, outputPath, size) {
  await sharp(inputPath)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath)
  console.log('wrote', path.basename(outputPath))
}

async function main() {
  const sourceColor = path.join(logoDir, 'nabhaa-logo-from-vector.png')
  const sourceSymbol = path.join(logoDir, 'nabhaa-symbol-only.png')

  const colorTransparent = path.join(logoDir, 'nabhaa-butterfly.png')
  const colorTransparentUi = path.join(logoDir, 'nabhaa-butterfly-ui.png')
  const whiteTransparent = path.join(logoDir, 'nabhaa-butterfly-white.png')
  const maroonTransparent = path.join(logoDir, 'nabhaa-butterfly-maroon.png')
  const charcoalTransparent = path.join(logoDir, 'nabhaa-butterfly-charcoal.png')

  // Prefer symbol-only lockup for cleaner UI mark; fallback to vector render
  await knockOutLightBackground(sourceSymbol, colorTransparent, { threshold: 242 })
  await knockOutLightBackground(sourceColor, colorTransparentUi, { threshold: 248 })

  await toSolidSilhouette(colorTransparent, whiteTransparent, [255, 255, 255])
  await toSolidSilhouette(colorTransparent, maroonTransparent, [104, 15, 26]) // #680F1A
  await toSolidSilhouette(colorTransparent, charcoalTransparent, [42, 39, 36]) // #2A2724

  await resizeSquare(colorTransparent, path.join(logoDir, 'favicon-192.png'), 192)
  await resizeSquare(colorTransparent, path.join(logoDir, 'favicon-512.png'), 512)
  await resizeSquare(colorTransparent, path.join(logoDir, 'favicon-180.png'), 180)

  // Desktop delivery copies
  const desktop = path.resolve('C:/Users/prath/OneDrive/Desktop/nabhaa-logos-for-fix')
  await sharp(colorTransparent).png().toFile(path.join(desktop, 'FIXED-color-transparent.png'))
  await sharp(whiteTransparent).png().toFile(path.join(desktop, 'FIXED-white-transparent.png'))
  await sharp(maroonTransparent).png().toFile(path.join(desktop, 'FIXED-maroon-transparent.png'))
  console.log('desktop copies updated')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
