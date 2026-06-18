import queryClient from '../../../src/client';
import { pokemonDetailsOptions } from '../../../src/hooks/usePokemonDetails';
import { buttonStyles } from '../../shared/styles/button';
import { useFavorites } from '../../../src/store/storeFavorites';
import { createCSVContext } from '../../../src/utils/createCSVContext';
import { downloadData } from '../../../src/utils/downloadData';

const Flyout = () => {
  const allFavorites = useFavorites((state) => state.totalFavorite());
  const removeAllFavorite = useFavorites((state) => state.removeAllFavorite);
  const favorites = useFavorites((state) => state.favorites);

  const download = async () => {
    const data = await Promise.all(
      favorites.map((id) =>
        queryClient.fetchQuery(pokemonDetailsOptions(String(id)))
      )
    );
    const csvContent = createCSVContext(data);
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    downloadData(blob, `${allFavorites}_items.csv`);
  };
  if (allFavorites === 0) return;
  return (
    <div className="flex justify-between p-4 items-center mb-6 bg-red-400 sticky bottom-0 ">
      <p className="text-white text-xl font-bold">
        {allFavorites} selected items
      </p>
      <div className="flex gap-x-4 p-4 ">
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
          onClick={removeAllFavorite}
        >
          Unselect all
        </button>
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
          onClick={download}
        >
          Download
        </button>
      </div>
    </div>
  );
};
export default Flyout;
