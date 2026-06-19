//import { useNavigate, useParams, useSearchParams } from 'react-router';
import Loading from '../Loading/Loading';
import { placeholderURL } from '../../constants/global';
import { cardDetailsText } from '../../shared/text';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { buttonStyles } from '../../shared/styles/button';
import { cardDetailsStyles } from './cardDetails.styles';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
type CardDetailsProps = {
  cardId: string;
};
const CardDetails = ({ cardId }: CardDetailsProps) => {
  //const [searchParams] = useSearchParams();
  // const { cardId } = useParams();
  // const navigate = useNavigate();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pokemonDetails = usePokemonDetails(cardId);
  if (pokemonDetails.isLoading)
    return (
      <div className="flex justify-center p-8">
        <Loading />
      </div>
    );
  if (pokemonDetails.error)
    return <ErrorAlert message={pokemonDetails.error.message} />;
  if (!pokemonDetails.data) return null;

  const page = searchParams.get('page');
  const pokemon = pokemonDetails.data;

  const onClose = () => {
    router.push(`/?page=${page}`);
  };

  const imgURL = pokemon.sprites?.front_default
    ? pokemon.sprites.front_default
    : placeholderURL;
  return (
    <aside className={cardDetailsStyles.aside}>
      <div className={cardDetailsStyles.header}>
        <h2 className={cardDetailsStyles.title}>{pokemon.name}</h2>
        <button onClick={onClose} className={buttonStyles.red}>
          X
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <Image
          src={imgURL}
          alt={pokemon.name}
          className={cardDetailsStyles.image}
        />   
      </div>

      <div className="space-y-6">
        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>
            {cardDetailsText.general}
          </h3>
          <div className="space-y-1">
            <p>
              <span className={cardDetailsStyles.textBold}>
                {cardDetailsText.height}
              </span>
              {pokemon.height}
            </p>

            <p>
              <span className={cardDetailsStyles.textBold}>
                {cardDetailsText.weight}
              </span>
              {pokemon.weight}
            </p>
            <p>
              <span className={cardDetailsStyles.textBold}>
                {cardDetailsText.baseExperience}
              </span>
              {pokemon.base_experience}
            </p>
          </div>
        </section>

        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>
            {cardDetailsText.types}
          </h3>
          <div className={cardDetailsStyles.typeContainer}>
            {pokemon.types.map((type) => (
              <span key={type.slot} className={cardDetailsStyles.typeBadge}>
                {type.type.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className={cardDetailsStyles.sectionTitle}>
            {cardDetailsText.abilities}
          </h3>

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
