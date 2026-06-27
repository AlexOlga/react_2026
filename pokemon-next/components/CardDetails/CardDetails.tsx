import { placeholderURL } from '../../constants/global';
import { cardDetailsStyles } from './cardDetails.styles';
import Image from 'next/image';
import getPokemonById from '@/utils/api/getPokemonById';
import { CloseButton } from './ButtonClose';
import { getTranslations } from 'next-intl/server';
type CardDetailsProps = {
  cardId: string;
};
const CardDetails = async ({ cardId }: CardDetailsProps) => {
  const t = await getTranslations('card details');
  const pokemon = await getPokemonById(cardId);
  if (!pokemon) return null;
  const imgURL = pokemon.sprites?.front_default
    ? pokemon.sprites.front_default
    : placeholderURL;
  return (
    <aside className={cardDetailsStyles.aside}>
      <div className={cardDetailsStyles.header}>
        <h2 className={cardDetailsStyles.title}>{pokemon.name}</h2>
        <CloseButton />
      </div>

      <div className="flex justify-center mb-6">
        <Image
          src={imgURL}
          alt={pokemon.name}
          className={cardDetailsStyles.image}
          width={80}
          height={80}
        />
      </div>
      <div className="space-y-6 ">
        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>{t('general')}</h3>
          <div className="space-y-1">
            <p>
              <span className={cardDetailsStyles.textBold}>{t('height')}</span>
              {pokemon.height}
            </p>

            <p>
              <span className={cardDetailsStyles.textBold}>{t('weight')}</span>
              {pokemon.weight}
            </p>
            <p>
              <span className={cardDetailsStyles.textBold}>
                {t('baseExperience')}
              </span>
              {pokemon.base_experience}
            </p>
          </div>
        </section>

        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>{t('types')}</h3>
          <div className={cardDetailsStyles.typeContainer}>
            {pokemon.types.map((type) => (
              <span key={type.slot} className={cardDetailsStyles.typeBadge}>
                {type.type.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>{t('abilities')}</h3>

          <ul className={cardDetailsStyles.list}>
            {pokemon.abilities.map((ability) => (
              <li key={ability.slot}>{ability.ability.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
};

export default CardDetails;
