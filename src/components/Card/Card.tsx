import type { Pokemon } from '../../types/pokemon';
import { cardStyles } from './card.styles';
import { placeholderURL } from '../../constants/global';
import { HeartIcon } from './HeartIcon';
import { useFavorites } from '../../store/storeFavorites';

const Card = (data: Pokemon) => {
  const imgURL = data.sprites?.front_default
    ? data.sprites.front_default
    : placeholderURL;
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);
  const isFavorite = useFavorites((state) => state.isFavorite(data.id));
  const handelHeart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggleFavorite(data.id);
  };
  return (
    <div className={cardStyles.card}>
      <div>
        {' '}
        <button onClick={handelHeart} type="button">
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <img className={cardStyles.img} src={imgURL} alt={data.name} />
      <h3 className={cardStyles.title}>{data.name}</h3>
      <p className={cardStyles.text}>
        <span>Base experience: </span>
        {data.base_experience}
      </p>
    </div>
  );
};

export default Card;
