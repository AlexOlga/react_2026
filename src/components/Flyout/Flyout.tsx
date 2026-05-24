import { URL_API } from '../../constants/global';
import { buttonStyles } from '../../shared/styles/button';
import { useFavorites } from '../../store/storeFavorites';
import { createCSVContext } from '../../utils/createCSVContext';
import { downloadData } from '../../utils/downloadData';
import { getPokemonsData } from '../../utils/getPokemons';

const Flyout = () => {
  const allFavorites = useFavorites((state) => state.totalFavorite());
  const removeAllFavorite = useFavorites((state) => state.removeAllFavorite);
  const favorites = useFavorites((state) => state.favorites);

  const download = async () => {
    const pokemons = favorites.map((id) => ({ url: `${URL_API}${id}` }));
    const data = await getPokemonsData(pokemons);
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
