export type WheelChallenge = {
  id: string;
  text: string;
  maxTimeMinutes: number;
};

export type WheelCategory = {
  id: string;
  name: string;
  /** Label corto o en 2 líneas solo para la cara de la ruleta (el resultado usa `name`). */
  wheelLabel?: string | [string, string];
  emoji: string;
  color: string;
  accent: string;
  challenges: WheelChallenge[];
};

/**
 * Categorías de la Ruleta Musical.
 * Para agregar más consignas a una categoría, sumá objetos en `challenges`.
 */
export const wheelCategories: WheelCategory[] = [
  {
    id: 'karaoke',
    name: 'Karaoke',
    emoji: '🎤',
    color: '#c45c3e',
    accent: '#e8a07a',
    challenges: [
      {
        id: 'karaoke-libre',
        text: 'Elegí una canción y cantá el primer minuto. Como salga. Sin ensayo.',
        maxTimeMinutes: 1,
      },
    ],
  },
  {
    id: 'acapella',
    name: 'A capella',
    emoji: '🎶',
    color: '#8b5a3c',
    accent: '#d4a574',
    challenges: [
      {
        id: 'acapella-fragmento',
        text: 'Elegí una canción y cantá un fragmento sin instrumentos ni pista.',
        maxTimeMinutes: 1,
      },
    ],
  },
  {
    id: 'esa-cancion',
    name: 'Esa canción',
    emoji: '💭',
    color: '#6b4c7a',
    accent: '#b894c9',
    challenges: [
      {
        id: 'esa-cancion-recuerdo',
        text: 'Pensá en una canción que te recuerde a alguien, un lugar o un momento. Contanos brevemente por qué y cantá, tarareá o silbá un pedacito.',
        maxTimeMinutes: 3,
      },
    ],
  },
  {
    id: 'instrument-swapper',
    name: 'Instrument Swapper',
    wheelLabel: ['Cambio de', 'instrumento'],
    emoji: '🎸',
    color: '#3d6b5a',
    accent: '#7eb89a',
    challenges: [
      {
        id: 'swap-instrumento',
        text: 'Elegí un instrumento que no sea el más natural para vos e intentá tocar un tema.',
        maxTimeMinutes: 1,
      },
    ],
  },
  {
    id: 'dueto-karaoke',
    name: 'Dueto Karaoke',
    wheelLabel: ['Dueto', 'Karaoke'],
    emoji: '👥',
    color: '#a05a4a',
    accent: '#e0a090',
    challenges: [
      {
        id: 'dueto-juntos',
        text: 'Elegí a alguien de la mesa. Busquen un karaoke y canten juntos.',
        maxTimeMinutes: 2,
      },
    ],
  },
  {
    id: 'anecdota-express',
    name: 'Anécdota Express',
    wheelLabel: ['Anécdota', 'Express'],
    emoji: '💬',
    color: '#5a6b7a',
    accent: '#9ab0c0',
    challenges: [
      {
        id: 'anecdota-musical',
        text: 'Contá una anécdota graciosa, insólita o vergonzosa relacionada con música, fiestas, escenarios o canto.',
        maxTimeMinutes: 2,
      },
    ],
  },
  {
    id: 'segui-el-tema',
    name: 'Seguí el tema',
    wheelLabel: ['Seguí', 'el tema'],
    emoji: '🔄',
    color: '#7a5a3c',
    accent: '#c4a070',
    challenges: [
      {
        id: 'segui-continuar',
        text: 'Alguien empieza cantando una canción. Reconocela y continuá desde donde la dejó.',
        maxTimeMinutes: 1,
      },
    ],
  },
  {
    id: 'fuera-de-tu-estilo',
    name: 'Fuera de tu estilo',
    wheelLabel: ['Fuera de', 'tu estilo'],
    emoji: '🎭',
    color: '#5a4a6b',
    accent: '#a090b8',
    challenges: [
      {
        id: 'fuera-genero',
        text: 'El grupo elige un género que no sea el tuyo. Intentá cantar un fragmento de una canción de ese género.',
        maxTimeMinutes: 1,
      },
    ],
  },
  {
    id: 'te-acompanamos',
    name: 'Te acompañamos',
    wheelLabel: ['Te', 'acompañamos'],
    emoji: '🎹',
    color: '#4a6b5a',
    accent: '#8ab89a',
    challenges: [
      {
        id: 'acompanamiento',
        text: 'Elegí una canción y elegí quién de la mesa tiene que acompañarte con algún instrumento.',
        maxTimeMinutes: 2,
      },
    ],
  },
  {
    id: 'el-grupo-decide',
    name: 'El grupo decide',
    wheelLabel: ['El grupo', 'decide'],
    emoji: '🎲',
    color: '#8a4a5a',
    accent: '#d090a0',
    challenges: [
      {
        id: 'grupo-desafio',
        text: 'El grupo tiene 30 segundos para elegirte un desafío musical.',
        maxTimeMinutes: 2,
      },
    ],
  },
];

export type WheelResult = {
  category: WheelCategory;
  challenge: WheelChallenge;
  categoryIndex: number;
};

export function pickChallengeFromCategory(
  category: WheelCategory,
): WheelChallenge {
  const index = Math.floor(Math.random() * category.challenges.length);
  return category.challenges[index];
}
