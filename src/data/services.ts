/**
 * ============================================================
 * NABHAA — Services Data (EDIT HERE)
 * ============================================================
 */

export interface Service {
  id: string
  title: string
  short: string
  description: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    short: 'Buildings shaped by climate, craft and proportion.',
    description:
      'From residences to adaptive workplaces, we design buildings as calibrated sequences of space — attentive to light, structure, and the character of place.',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Architectural concrete facade with precise openings',
  },
  {
    id: 'interior-architecture',
    title: 'Interior Architecture',
    short: 'Rooms composed as spatial experiences.',
    description:
      'Interiors are not applied finishes. We design thresholds, volumes, joinery and material junctions so everyday life feels considered and calm.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Refined interior with warm materials and soft daylight',
  },
  {
    id: 'spatial-design',
    title: 'Spatial Design',
    short: 'Atmospheres for brands, culture and gathering.',
    description:
      'We shape experiential environments — galleries, hospitality rooms, brand spaces — where movement, material and narrative align.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Spatial sequence with textured walls and filtered light',
  },
  {
    id: 'residential',
    title: 'Residential Design',
    short: 'Homes that hold memory and quiet luxury.',
    description:
      'Houses and apartments designed around family rituals, climatic comfort, and a lasting relationship with landscape and light.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Residential courtyard with stone and planting',
  },
  {
    id: 'commercial',
    title: 'Commercial Design',
    short: 'Workplaces and retail with lasting presence.',
    description:
      'Commercial environments designed for clarity, dignity and craft — places people want to return to, not merely pass through.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Commercial interior with architectural presence',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    short: 'Spaces of welcome, pause and delight.',
    description:
      'Hotels, dining rooms and retreats where material honesty and atmospheric lighting create memorable stays.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Hospitality pavilion opening to landscape',
  },
  {
    id: 'workplace',
    title: 'Workplace',
    short: 'Studios and offices as landscapes of work.',
    description:
      'We design workplaces as varied spatial ecologies — focus, collaboration, solitude — grounded in acoustic comfort and daylight.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Daylit workplace with collaborative tables',
  },
  {
    id: 'renovation',
    title: 'Renovation / Adaptive Reuse',
    short: 'New life for existing fabric.',
    description:
      'We read existing buildings carefully — retaining what holds character, and transforming what no longer serves — with restraint and precision.',
    image:
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Renovated architectural interior with layered materials',
  },
  {
    id: 'bim',
    title: 'BIM / Design Development',
    short: 'Rigour from concept to construction.',
    description:
      'Detailed design development and BIM coordination that protect architectural intent through fabrication and site execution.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Architectural drawings and models on a worktable',
  },
]
