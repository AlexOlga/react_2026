'use client';

import { placeholderURL } from '@/constants/global';
import { useFavorites } from '@/store/storeFavorites';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image' ;
import { cardStyles } from './card.styles';
import { HeartIcon } from './HeartIcon';
import { useTranslations } from 'next-intl';
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
   const t = useTranslations("card details");
  return (
    <div className={cardStyles.card}>
      <div>
        <button onClick={handelHeart} type="button">
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <Image src={imgURL} alt={data.name} width={140} height={140} className={cardStyles.img}/>    
      <h3 className={cardStyles.title}>{data.name}</h3>
      <p className={cardStyles.text}>
        <span>{t('baseExperience')}</span>
        {data.base_experience}
      </p>
    </div>
  );
};

export default Card;
