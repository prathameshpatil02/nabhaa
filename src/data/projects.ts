/**
 * ============================================================
 * NABHAA — Projects Data (EDIT / REPLACE IMAGES HERE)
 * ============================================================
 * Swap image paths under /public/assets/images/projects/
 * Slugs drive URLs: /projects/courtyard-residence
 */

export type ProjectLayout = 'wide' | 'medium' | 'full' | 'narrow' | 'split'

export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  id: string
  slug: string
  number: string
  title: string
  typology: string
  location: string
  city: string
  year: string
  area: string
  services: string[]
  status: string
  cover: ProjectImage
  secondary?: ProjectImage
  gallery: ProjectImage[]
  materials: string[]
  statement: string
  philosophy: string
  sequence: string[]
  layout: ProjectLayout
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'courtyard-residence',
    number: '01',
    title: 'Courtyard Residence',
    typology: 'Private Residence',
    location: 'Pune, India',
    city: 'Pune',
    year: '2026',
    area: '620 sq.m',
    services: ['Architecture', 'Interior Architecture', 'Landscape'],
    status: 'In Progress',
    layout: 'wide',
    featured: true,
    cover: {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
      alt: 'Sunlit courtyard residence with stone walls and deep shadows',
    },
    secondary: {
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Courtyard planting against textured plaster',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Courtyard with tree and warm plaster walls',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        alt: 'Interior living space with timber and stone',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        alt: 'Architectural opening framing landscape',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=80',
        alt: 'Material detail of stone and wood junction',
      },
    ],
    materials: ['Local basalt', 'Lime plaster', 'Teak', 'Brass fittings', 'Kadappa stone'],
    statement:
      'Courtyard Residence explores the relationship between mass, light and landscape through a sequence of sheltered courtyards.',
    philosophy:
      'Rather than placing rooms around a garden, the house is composed as a series of thresholds — shaded, open, and enclosed — that modulate climate and intimacy throughout the day.',
    sequence: [
      'Arrival court under a filtered canopy',
      'Central courtyard as the climatic heart',
      'Living rooms opening to morning light',
      'Private wing oriented toward evening shade',
    ],
  },
  {
    id: '02',
    slug: 'house-of-light',
    number: '02',
    title: 'House of Light',
    typology: 'Private Residence',
    location: 'Mumbai, India',
    city: 'Mumbai',
    year: '2025',
    area: '480 sq.m',
    services: ['Architecture', 'Interior Architecture'],
    status: 'Completed',
    layout: 'split',
    featured: true,
    cover: {
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80',
      alt: 'Contemporary residence with luminous double-height living space',
    },
    secondary: {
      src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80',
      alt: 'Light pouring across a stair void',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80',
        alt: 'Light pouring across a stair void',
      },
      {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
        alt: 'Minimal interior with warm materials',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
        alt: 'Facade detail with deep reveals',
      },
    ],
    materials: ['Fair-faced concrete', 'Italian marble', 'Walnut', 'Brushed brass'],
    statement:
      'House of Light is calibrated around a vertical void that draws monsoon-soft daylight deep into the plan.',
    philosophy:
      'In a dense urban plot, light becomes the primary site condition. Every room leans toward a shared luminous core rather than competing for street frontage.',
    sequence: [
      'Compressed entrance passage',
      'Double-height light well',
      'Gallery overlooking the void',
      'Roof terrace open to sky',
    ],
  },
  {
    id: '03',
    slug: 'material-office',
    number: '03',
    title: 'The Material Office',
    typology: 'Workplace',
    location: 'Pune, India',
    city: 'Pune',
    year: '2025',
    area: '1,200 sq.m',
    services: ['Interior Architecture', 'Spatial Design', 'Workplace'],
    status: 'Completed',
    layout: 'full',
    featured: true,
    cover: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80',
      alt: 'Material-rich workplace interior with timber and soft light',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
        alt: 'Collaborative workspace with natural light',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
        alt: 'Meeting room with tactile surfaces',
      },
      {
        src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
        alt: 'Quiet focus booth with warm finishes',
      },
    ],
    materials: ['Oak panelling', 'Microcement', 'Linen acoustics', 'Blackened steel'],
    statement:
      'The Material Office treats the workplace as a calibrated landscape of focus, gathering and pause.',
    philosophy:
      'Instead of open-plan uniformity, the interior is composed like a city — streets, rooms, courtyards — so people can choose how they work.',
    sequence: [
      'Arrival gallery of material samples',
      'Central agora for gathering',
      'Quiet studios for deep work',
      'Terrace rooms for informal exchange',
    ],
  },
  {
    id: '04',
    slug: 'terra-villa',
    number: '04',
    title: 'Terra Villa',
    typology: 'Holiday Residence',
    location: 'Lonavala, India',
    city: 'Lonavala',
    year: '2024',
    area: '740 sq.m',
    services: ['Architecture', 'Interiors', 'Landscape'],
    status: 'Completed',
    layout: 'wide',
    featured: true,
    cover: {
      src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80',
      alt: 'Hill villa nestled among trees with warm stone facade',
    },
    secondary: {
      src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80',
      alt: 'Pool terrace overlooking the valley',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80',
        alt: 'Pool terrace overlooking the valley',
      },
      {
        src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
        alt: 'Indoor outdoor living pavilion',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80',
        alt: 'Bedroom opening to landscape',
      },
    ],
    materials: ['Laterite', 'Rammed earth accents', 'Reclaimed timber', 'Cane'],
    statement:
      'Terra Villa settles into the hillside as a series of stepped platforms rather than a singular object.',
    philosophy:
      'The architecture borrows the language of the land — retained earth, long eaves, and rooms that open to monsoon winds.',
    sequence: [
      'Forest path arrival',
      'Lower living pavilion',
      'Mid-level sleeping courts',
      'Upper lookout deck',
    ],
  },
  {
    id: '05',
    slug: 'urban-retreat',
    number: '05',
    title: 'Urban Retreat',
    typology: 'Apartment Interior',
    location: 'Mumbai, India',
    city: 'Mumbai',
    year: '2024',
    area: '210 sq.m',
    services: ['Interior Architecture', 'Spatial Design'],
    status: 'Completed',
    layout: 'narrow',
    featured: false,
    cover: {
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80',
      alt: 'Calm urban apartment with soft neutrals and crafted joinery',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80',
        alt: 'Living room with curated furniture and soft light',
      },
      {
        src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
        alt: 'Kitchen with stone counter and quiet detailing',
      },
    ],
    materials: ['Travertine', 'Ash veneer', 'Linen', 'Brass hardware'],
    statement:
      'Urban Retreat turns a dense apartment into a sequence of quiet rooms calibrated for rest and gathering.',
    philosophy:
      'Storage, light and thresholds do the architectural work — so the home can feel spacious without theatrical gestures.',
    sequence: [
      'Muted entry foyer',
      'Open living with filtered light',
      'Private suite as a quiet chamber',
    ],
  },
  {
    id: '06',
    slug: 'studio-27',
    number: '06',
    title: 'Studio 27',
    typology: 'Creative Studio',
    location: 'Pune, India',
    city: 'Pune',
    year: '2023',
    area: '340 sq.m',
    services: ['Architecture', 'Interior Architecture'],
    status: 'Completed',
    layout: 'medium',
    featured: false,
    cover: {
      src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80',
      alt: 'Creative studio with high ceilings and crafted worktables',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1600&q=80',
        alt: 'Workshop bay with north light',
      },
      {
        src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80',
        alt: 'Library corner with timber shelving',
      },
    ],
    materials: ['Exposed brick', 'Polished concrete', 'Pine plywood', 'Industrial brass'],
    statement:
      'Studio 27 is a working atelier where making, meeting and thinking share the same generous volume.',
    philosophy:
      'The project resists the corporate office type. Daylight, workbenches and a long communal table define the culture of the place.',
    sequence: [
      'Street-facing gallery',
      'Central making hall',
      'Mezzanine for quiet work',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(
    (project) => project.slug === slug || project.id === slug || project.number === slug,
  )
}

export function getRelatedProjects(slug: string, count = 3): Project[] {
  return projects.filter((project) => project.slug !== slug && project.id !== slug).slice(0, count)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}
