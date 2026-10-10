/**
 * ============================================================
 * NABHAA — Journal Data (EDIT HERE)
 * ============================================================
 */

export interface JournalArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  date: string
  readTime: string
  cover: string
  coverAlt: string
  excerpt: string
  body: string[]
}

export const journalArticles: JournalArticle[] = [
  {
    id: '01',
    slug: 'architecture-of-light',
    title: 'The Architecture of Light',
    subtitle: 'On designing with shadow as carefully as with form.',
    category: 'Light',
    date: 'March 2026',
    readTime: '6 min',
    cover:
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Sunlight casting long shadows across a stone floor',
    excerpt:
      'Light is not an afterthought in our work. It is a primary material — shaping rooms, revealing texture, and measuring the hours of a day.',
    body: [
      'In tropical and subtropical climates, light arrives with intensity. The task is rarely to invite more of it; it is to choreograph its arrival.',
      'Deep reveals, courtyards, perforated screens and soft interior finishes become instruments. They turn harsh noon into a layered atmosphere.',
      'At NABHAA, we begin many projects by drawing the path of the sun across a site — before drawing the walls that will hold it.',
    ],
  },
  {
    id: '02',
    slug: 'why-courtyards-still-matter',
    title: 'Why Courtyards Still Matter',
    subtitle: 'An old Indian type, newly relevant.',
    category: 'Place',
    date: 'January 2026',
    readTime: '5 min',
    cover:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Courtyard house with planting and stone paving',
    excerpt:
      'The courtyard remains one of the most intelligent spatial devices for Indian climates — offering privacy, ventilation, and a shared centre.',
    body: [
      'A courtyard is not nostalgia. It is climate strategy, social infrastructure, and a way of giving a house an interior landscape.',
      'In dense cities, the courtyard becomes a private sky — a place where children play, rain is heard, and evenings collect.',
      'Our residential work often returns to this type, not as a stylistic quote, but as a living system.',
    ],
  },
  {
    id: '03',
    slug: 'material-as-memory',
    title: 'Material as Memory',
    subtitle: 'How surfaces hold time.',
    category: 'Material',
    date: 'November 2025',
    readTime: '7 min',
    cover:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Close-up of textured plaster and timber materials',
    excerpt:
      'Materials age. The ones we choose carefully become richer with use — carrying the marks of hands, weather and habitation.',
    body: [
      'We prefer materials that can accept time: lime plaster, local stone, solid timber, metals that patinate rather than peel.',
      'Polished perfection is less interesting to us than surfaces that remain honest under daily life.',
      'Material selection is therefore both a technical and an emotional decision — how a place should feel years from now.',
    ],
  },
  {
    id: '04',
    slug: 'designing-for-silence',
    title: 'Designing for Silence',
    subtitle: 'Acoustic calm as an architectural luxury.',
    category: 'Atmosphere',
    date: 'September 2025',
    readTime: '4 min',
    cover:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Quiet interior with soft textiles and muted tones',
    excerpt:
      'Silence is rare in contemporary cities. Architecture can still offer rooms that absorb noise and restore attention.',
    body: [
      'Soft finishes, generous thresholds, and carefully placed mass can transform how a room is inhabited.',
      'We treat acoustic comfort as part of spatial dignity — especially in homes and workplaces.',
    ],
  },
  {
    id: '05',
    slug: 'architecture-and-indian-climate',
    title: 'Architecture and the Indian Climate',
    subtitle: 'Designing with heat, monsoon and monsoon light.',
    category: 'Climate',
    date: 'July 2025',
    readTime: '8 min',
    cover:
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Building with deep eaves and tropical planting',
    excerpt:
      'Good architecture in India begins with climate literacy — orientation, shade, cross-ventilation, and monsoon resilience.',
    body: [
      'Imported glass boxes fail quickly here. Local intelligence — verandahs, jalis, thick walls, and planted courts — still outperforms spectacle.',
      'Our work seeks a contemporary expression of these principles without becoming a pastiche of heritage forms.',
    ],
  },
  {
    id: '06',
    slug: 'between-form-and-atmosphere',
    title: 'Between Form and Atmosphere',
    subtitle: 'When geometry becomes feeling.',
    category: 'Form',
    date: 'May 2025',
    readTime: '5 min',
    cover:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Architectural form with dramatic light and shadow',
    excerpt:
      'Form alone is incomplete. Atmosphere — light, sound, temperature, material — is what people remember.',
    body: [
      'We draw plans with precision, but we judge projects by how a room feels at 4pm in summer, or during a monsoon evening.',
      'This is the measure that matters: not photographs alone, but lived experience over seasons.',
    ],
  },
]

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug || article.id === slug)
}
