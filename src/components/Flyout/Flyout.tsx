import { buttonStyles } from '../../shared/styles/button';
import { useFavorites } from '../../store/storeFavorites';

const Flyout = () => {
  const allFavorites = useFavorites((state) => state.totalFavorite());
  const removeAllFavorite = useFavorites((state) => state.removeAllFavorite);
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
          onClick={() => {}}
        >
          Download
        </button>
      </div>
    </div>
  );
};
export default Flyout;
