import queryClient from '../../../src/client';
import { buttonStyles } from '../../shared/styles/button';

const RefreshButton = () => {
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['pokemon'],
    });
    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    });
  };
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`${buttonStyles.base} ${buttonStyles.red}`}
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </div>
  );
};
export default RefreshButton;
