import { useNavigate, useParams, useSearchParams } from 'react-router';
import type { Pokemon } from '../types/pokemon';
import React from 'react';
import getPokemonById from '../utils/getPokemonById';
import Loading from './loading';
import { placeholderURL } from '../constants/global';

const CardDetails = () => {
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { cardId } = useParams();
  const page = searchParams.get('page');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!cardId) return;
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await getPokemonById(cardId);
        setPokemon(data);
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
  if (!pokemon) return null;
  const imgURL = pokemon.sprites?.back_default
    ? pokemon.sprites.back_default
    : placeholderURL;
  return (
    <aside className="sticky top-0 p-6 border-l border-yellow-400 bg-white h-screen overflow-auto w-80">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold capitalize text-red-400">
          {pokemon.name}
        </h2>

        <button onClick={onClose} className="px-3 py-1 border rounded">
          X
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={imgURL}
          alt={pokemon.name}
          className="w-64 h-64 object-contain"
        />
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="font-bold mb-2 text-red-400">General</h3>
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Height:</span>
              {pokemon.height}
            </p>

            <p>
              <span className="font-semibold">Weight:</span>
              {pokemon.weight}
            </p>

            <p>
              <span className="font-semibold">Base experience:</span>
              {pokemon.base_experience}
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-bold mb-2 text-red-400">Types</h3>

          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span key={type.slot} className="px-3 py-1 rounded bg-yellow-200">
                {type.type.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-bold mb-2 text-red-400">Abilities</h3>

          <ul className="list-disc pl-5">
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
