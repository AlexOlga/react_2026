'use client';
import { buttonStyles } from '@/shared/styles/button';
import { useFavorites } from '@/store/storeFavorites';
import { downloadData } from '@/utils/downloadData';
import { useTranslations } from 'next-intl';

const Flyout = () => {
  const allFavorites = useFavorites((state) => state.totalFavorite());
  const removeAllFavorite = useFavorites((state) => state.removeAllFavorite);
  const favorites = useFavorites((state) => state.favorites);
 const t = useTranslations('flyout');
  const download = async () => {
    
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: favorites,
      }),
    });

    const blob = await response.blob();

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
         {t('unselect')}
        </button>
        <button
          className={`${buttonStyles.base} ${buttonStyles.yellow}`}
          onClick={download}
        >
          {t('download')}
        </button>
      </div>
    </div>
  );
};
export default Flyout;
