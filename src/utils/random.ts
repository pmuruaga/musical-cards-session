export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandomExcluding<T extends { id: string }>(
  items: T[],
  excludeId: string | null,
): T {
  const pool =
    excludeId && items.length > 1
      ? items.filter((item) => item.id !== excludeId)
      : items;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function formatMinutes(minutes: number): string {
  if (minutes === 1) return '1 minuto';
  return `${minutes} minutos`;
}
