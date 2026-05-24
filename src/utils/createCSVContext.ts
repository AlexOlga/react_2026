import type { Pokemon } from '../types/pokemon';

export function createCSVContext(data: Pokemon[]) {
  const rows = data.map((item) =>
    [
      item.name,
      `Base experience: ${item.base_experience}`,
      `img:${item.sprites?.front_default}`,
    ].join(',')
  );
  return rows.join('\n');
}
