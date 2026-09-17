export type CardCategoryId =
  | 'musica-recuerdos'
  | 'confesionario'
  | 'historias-emociones'
  | 'imposibles-delirios';

export type CardCategory = {
  id: CardCategoryId;
  name: string;
  emoji: string;
  accent: string;
  glow: string;
};

export type StoryCard = {
  id: string;
  categoryId: CardCategoryId;
  title: string;
  prompt: string;
};

export const cardCategories: Record<CardCategoryId, CardCategory> = {
  'musica-recuerdos': {
    id: 'musica-recuerdos',
    name: 'Música y Recuerdos',
    emoji: '🎵',
    accent: '#c9a227',
    glow: 'rgba(201, 162, 39, 0.35)',
  },
  confesionario: {
    id: 'confesionario',
    name: 'Confesionario',
    emoji: '😂',
    accent: '#d4784a',
    glow: 'rgba(212, 120, 74, 0.35)',
  },
  'historias-emociones': {
    id: 'historias-emociones',
    name: 'Historias y Emociones',
    emoji: '❤️',
    accent: '#c45a6a',
    glow: 'rgba(196, 90, 106, 0.35)',
  },
  'imposibles-delirios': {
    id: 'imposibles-delirios',
    name: 'Imposibles y Delirios',
    emoji: '🤔',
    accent: '#7a9bc4',
    glow: 'rgba(122, 155, 196, 0.35)',
  },
};

/**
 * Cartas de conversación.
 * Para agregar nuevas, sumá objetos a este array con un categoryId existente.
 */
export const storyCards: StoryCard[] = [
  // Música y Recuerdos
  {
    id: 'maquina-del-tiempo',
    categoryId: 'musica-recuerdos',
    title: 'La máquina del tiempo',
    prompt:
      '¿Qué canción te transporta instantáneamente a un momento de tu vida? Contanos cuál y a dónde te lleva.',
  },
  {
    id: 'esa-persona',
    categoryId: 'musica-recuerdos',
    title: 'Esa persona',
    prompt:
      '¿Qué canción te hace pensar inevitablemente en alguien? No hace falta decir quién.',
  },
  {
    id: 'primer-recuerdo',
    categoryId: 'musica-recuerdos',
    title: 'Primer recuerdo musical',
    prompt: '¿Cuál es una de las primeras canciones que recordás haber amado?',
  },
  {
    id: 'soundtrack-vida',
    categoryId: 'musica-recuerdos',
    title: 'Soundtrack de tu vida',
    prompt:
      'Si tu vida fuera una película, ¿qué canción tendría que aparecer sí o sí?',
  },
  {
    id: 'ultima-cancion',
    categoryId: 'musica-recuerdos',
    title: 'Una última canción',
    prompt:
      'Si supieras que esta noche vas a escuchar una canción por última vez, ¿cuál elegirías?',
  },

  // Confesionario
  {
    id: 'gusto-culposo',
    categoryId: 'confesionario',
    title: 'Gusto culposo',
    prompt:
      '¿Qué artista o canción te encanta pero te da un poquito de vergüenza admitirlo?',
  },
  {
    id: 'tema-quemado',
    categoryId: 'confesionario',
    title: 'El tema quemado',
    prompt: '¿Qué canción ama todo el mundo y vos no soportás?',
  },
  {
    id: 'confesion-musical',
    categoryId: 'confesionario',
    title: 'Confesión musical',
    prompt:
      'Contá algo relacionado con la música que probablemente nadie de esta mesa sepa.',
  },
  {
    id: 'playback-descubierto',
    categoryId: 'confesionario',
    title: 'Playback descubierto',
    prompt:
      '¿Alguna vez fingiste saberte una canción moviendo la boca? ¿Cuál?',
  },
  {
    id: 'papelon',
    categoryId: 'confesionario',
    title: 'Papelón',
    prompt:
      'Contá tu mejor papelón relacionado con una fiesta, karaoke, recital, baile o escenario.',
  },

  // Historias y Emociones
  {
    id: 'cancion-de-amor',
    categoryId: 'historias-emociones',
    title: 'Canción de amor',
    prompt:
      '¿Cuál te parece una de las canciones de amor más lindas que existen y por qué?',
  },
  {
    id: 'corazon-roto',
    categoryId: 'historias-emociones',
    title: 'Corazón roto',
    prompt: '¿Qué canción elegirías para musicalizar una ruptura amorosa?',
  },
  {
    id: 'la-dedicatoria',
    categoryId: 'historias-emociones',
    title: 'La dedicatoria',
    prompt:
      'Elegí una canción que le dedicarías hoy a alguien. Podés decir a quién o mantener el misterio.',
  },
  {
    id: 'persona-extranas',
    categoryId: 'historias-emociones',
    title: 'Una persona que extrañás',
    prompt:
      '¿Qué canción te conecta con alguien que ya no está tanto en tu vida?',
  },
  {
    id: 'cancion-refugio',
    categoryId: 'historias-emociones',
    title: 'Canción refugio',
    prompt:
      '¿Hay una canción que hayas buscado alguna vez porque estabas triste, preocupado o necesitabas levantar el ánimo?',
  },

  // Imposibles y Delirios
  {
    id: 'cena-imposible',
    categoryId: 'imposibles-delirios',
    title: 'Cena imposible',
    prompt:
      'Podés invitar a cenar a un músico de cualquier época. ¿A quién y qué le preguntarías?',
  },
  {
    id: 'recital-imposible',
    categoryId: 'imposibles-delirios',
    title: 'El recital imposible',
    prompt:
      'Podés estar en primera fila en cualquier recital de la historia. ¿Cuál elegís?',
  },
  {
    id: 'intercambio-vidas',
    categoryId: 'imposibles-delirios',
    title: 'Intercambio de vidas',
    prompt:
      'Tenés que ser un músico famoso durante 24 horas. ¿Quién elegís?',
  },
  {
    id: 'banda-imposible',
    categoryId: 'imposibles-delirios',
    title: 'Banda imposible',
    prompt:
      'Armá una banda con tres músicos, vivos o muertos. ¿A quiénes juntás?',
  },
  {
    id: 'la-isla',
    categoryId: 'imposibles-delirios',
    title: 'La isla',
    prompt:
      'Te mandamos un año a una isla y solamente podés llevar la música de tres artistas. ¿Cuáles?',
  },
];

export function getCardCategory(card: StoryCard): CardCategory {
  return cardCategories[card.categoryId];
}
