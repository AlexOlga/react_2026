import type { Pokemon } from '../types/pokemon';
import { cardStyles } from '../shared/styles/card-pokemon';
import { placeholderURL } from '../constants/global';

const Card = (data: Pokemon) => {
  const imgURL = data.sprites?.back_default
    ? data.sprites.back_default
    : placeholderURL;

  return (
    <div className={cardStyles.card}>
      <img className={cardStyles.img} src={imgURL} alt={data.name} />
      <h3 className={cardStyles.title}>{data.name}</h3>
      <p className={cardStyles.text}>{data.types[0].type.name || ''}</p>
    </div>
  );
};

export default Card;
