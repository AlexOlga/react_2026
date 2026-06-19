import type { Pokemon } from '../types/pokemon';

export function createCSVContext(data: Pokemon[]) {
  const header = 'id, Name, Base experience,  imgURL';
  const rows = data.map((item) =>
    [
      item.id,
      item.name,
      item.base_experience,
      item.sprites?.front_default,
    ].join(',')
  );
  const result = header + '\n' + rows.join('\n');
  return result;
}
