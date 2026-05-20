import { useNavigate, useParams, useSearchParams } from 'react-router';
import type { Pokemon } from '../../types/pokemon';
import { useEffect, useState } from 'react';
import getPokemonById from '../../utils/getPokemonById';
import Loading from '../Loading/Loading';
import { placeholderURL } from '../../constants/global';
import { cardDetailsText, errorMessages } from '../../shared/text';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { buttonStyles } from '../../shared/styles/button';
import { cardDetailsStyles } from './cardDetails.styles';

const CardDetails = () => {
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { cardId } = useParams();
  const page = searchParams.get('page');
  const navigate = useNavigate();
  useEffect(() => {
    if (!cardId) return;
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await getPokemonById(cardId);
        setPokemon(data);
      } catch (error) {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : errorMessages.other
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemon();
  }, [cardId]);

  const onClose = () => {
    navigate(`/?page=${page}`);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loading />
      </div>
    );
  }
  if (isError || !pokemon) return <ErrorAlert message={errorMessage} />;
  const imgURL = pokemon.sprites?.back_default
    ? pokemon.sprites.back_default
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
        <img
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
