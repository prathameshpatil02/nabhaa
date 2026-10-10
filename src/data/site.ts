/**
 * ============================================================
 * NABHAA — Site Content (EDIT HERE)
 * ============================================================
 * Brand assets: NABHAA_COMPLETE_BRAND_ASSET_PACKAGE
 * + Desktop/nba/nabhaa_logo_vector.pdf (rasterized master)
 */

export const site = {
  name: 'NABHAA',
  descriptor: 'ARCHITECTURE · INTERIORS · SPATIAL DESIGN',
  tagline: 'Spaces for a brighter tomorrow.',
  /** Ingenio-style weight pairing for hero */
  heroLead: 'SPACES FOR A',
  heroEmphasis: 'BRIGHTER TOMORROW.',
  statement: 'Timeless spaces. Rooted in place. Guided by light.',
  manifesto:
    'NABHAA is an architecture, interiors and spatial design studio dedicated to enriching life through light, material, proportion and place.',
  themes: ['LIGHT', 'MATERIAL', 'FORM', 'PLACE', 'CRAFT', 'TIME', 'ATMOSPHERE'],
  stats: [
    { label: 'Selected works', value: '06' },
    { label: 'Cities', value: '04' },
    { label: 'Focus', value: 'Space · Light · Material' },
  ],
  url: 'https://nabhaa.studio',
  email: 'studio@nabhaa.studio',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  location: 'Pune, Maharashtra, India',
  instagram: 'https://instagram.com/nabhaa.studio',
  linkedin: 'https://www.linkedin.com/company/nabhaa',
  logo: {
    /** Clean transparent COLOR mark for ivory / light UI */
    primary: '/assets/logo/nabhaa-butterfly.png',
    /** Hi-res color on paper (reference only) */
    vector: '/assets/logo/nabhaa-logo-from-vector.png',
    pdf: '/assets/logo/nabhaa-logo-vector.pdf',
    svg: '/assets/logo/nabhaa-butterfly.svg',
    stackedDescriptor: '/assets/logo/nabhaa-lockup-stacked-descriptor.png',
    stacked: '/assets/logo/nabhaa-lockup-stacked.png',
    horizontal: '/assets/logo/nabhaa-lockup-horizontal.png',
    horizontalReversed: '/assets/logo/nabhaa-lockup-horizontal-reversed.png',
    symbolOnly: '/assets/logo/nabhaa-symbol-only.png',
    /** True transparent solid mono marks for web */
    maroon: '/assets/logo/nabhaa-butterfly-maroon.png',
    white: '/assets/logo/nabhaa-butterfly-white.png',
    charcoal: '/assets/logo/nabhaa-butterfly-charcoal.png',
    socialIvory: '/assets/brand/og-ivory.png',
    socialMaroon: '/assets/brand/og-maroon.png',
    favicon: '/favicon.ico',
    appleTouch: '/assets/logo/favicon-180.png',
    alt: 'NABHAA — stylized architectural butterfly mark',
  },
  typography: {
    display: 'Noto Serif',
    sans: 'Manrope',
    note: 'Exploration candidates included FreeSerif, DejaVu Serif, Liberation Serif, DejaVu Sans.',
  },
  seo: {
    title: 'NABHAA — Architecture · Interiors · Spatial Design',
    description:
      'NABHAA is an architecture, interiors and spatial design studio creating thoughtful spaces shaped by light, material, proportion and place.',
  },
} as const

export const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Studio', href: '/studio' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const

export type NavLink = (typeof navLinks)[number]
